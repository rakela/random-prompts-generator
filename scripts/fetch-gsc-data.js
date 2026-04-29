#!/usr/bin/env node
/**
 * Fetches Google Search Console ranking data and prints a prioritised SEO task list.
 *
 * Usage:
 *   node scripts/fetch-gsc-data.js
 *   node scripts/fetch-gsc-data.js --days 28   (default: 90)
 *   node scripts/fetch-gsc-data.js --json       (output raw JSON)
 *
 * Requires in .env.local:
 *   GOOGLE_GSC_CLIENT_EMAIL
 *   GOOGLE_GSC_PRIVATE_KEY
 *   GOOGLE_GSC_SITE_URL
 *
 * The service account must be added as a user in Google Search Console:
 *   search.google.com/search-console → Settings → Users & permissions → Add user
 */

import { google } from 'googleapis';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env.local manually (no dotenv dependency needed)
function loadEnv() {
  const envPath = resolve(__dirname, '../.env.local');
  try {
    const lines = readFileSync(envPath, 'utf-8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      let value = trimmed.slice(eqIdx + 1).trim();
      // Strip surrounding quotes
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      // Unescape \n sequences in private key
      process.env[key] = value.replace(/\\n/g, '\n');
    }
  } catch {
    // .env.local not found — rely on process.env already set (Vercel / CI)
  }
}

loadEnv();

const CLIENT_EMAIL = process.env.GOOGLE_GSC_CLIENT_EMAIL;
const PRIVATE_KEY  = process.env.GOOGLE_GSC_PRIVATE_KEY;
const SITE_URL     = process.env.GOOGLE_GSC_SITE_URL || 'https://randomprompts.org';

if (!CLIENT_EMAIL || !PRIVATE_KEY) {
  console.error('Missing GOOGLE_GSC_CLIENT_EMAIL or GOOGLE_GSC_PRIVATE_KEY in .env.local');
  process.exit(1);
}

// Parse CLI args
const args = process.argv.slice(2);
const daysFlag = args.indexOf('--days');
const DAYS = daysFlag !== -1 ? parseInt(args[daysFlag + 1], 10) : 90;
const JSON_MODE = args.includes('--json');

function dateStr(daysAgo) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
}

async function fetchGSC() {
  const auth = new google.auth.JWT({
    email: CLIENT_EMAIL,
    key: PRIVATE_KEY,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });

  const webmasters = google.webmasters({ version: 'v3', auth });

  const response = await webmasters.searchanalytics.query({
    siteUrl: SITE_URL,
    requestBody: {
      startDate: dateStr(DAYS),
      endDate: dateStr(3), // exclude last 3 days (GSC lag)
      dimensions: ['page'],
      rowLimit: 500,
      dataState: 'final',
    },
  });

  return response.data.rows || [];
}

function classify(row) {
  const path = row.keys[0].replace(SITE_URL, '').replace(/\/$/, '') || '/';
  const { clicks, impressions, ctr, position } = row;

  // P0: can only be determined by checking for new AI models (not from GSC data)
  // P1: high impressions, low CTR
  if (impressions >= 5000 && ctr < 0.03) return { path, clicks, impressions, ctr, position, priority: 'P1 — CTR fix' };
  // P2: mid-position with decent impressions
  if (position >= 15 && position <= 25 && impressions >= 500) return { path, clicks, impressions, ctr, position, priority: 'P2 — Content improvement' };
  // Quick-win: high position but low CTR (title/description fix)
  if (position <= 10 && ctr < 0.03 && impressions >= 300) return { path, clicks, impressions, ctr, position, priority: 'P1 — CTR fix (top-10 page)' };
  return { path, clicks, impressions, ctr, position, priority: null };
}

function fmt(n, decimals = 0) {
  return Number(n).toLocaleString('en-US', { maximumFractionDigits: decimals });
}

async function main() {
  console.log(`Fetching GSC data for ${SITE_URL} (last ${DAYS} days)...\n`);

  let rows;
  try {
    rows = await fetchGSC();
  } catch (err) {
    if (err.message?.includes('403') || err.message?.includes('permission')) {
      console.error('❌  Permission denied. Make sure the service account is added as a user in GSC:');
      console.error('   search.google.com/search-console → Settings → Users & permissions → Add user');
      console.error(`   Email to add: ${CLIENT_EMAIL}`);
    } else {
      console.error('❌  GSC API error:', err.message);
    }
    process.exit(1);
  }

  if (JSON_MODE) {
    console.log(JSON.stringify(rows, null, 2));
    return;
  }

  // Sort by impressions
  rows.sort((a, b) => b.impressions - a.impressions);

  const tasks = rows.map(classify).filter(r => r.priority);
  const p1 = tasks.filter(r => r.priority.startsWith('P1'));
  const p2 = tasks.filter(r => r.priority.startsWith('P2'));

  console.log('━'.repeat(80));
  console.log(`GSC RANKING REPORT — ${new Date().toDateString()} — last ${DAYS} days`);
  console.log('━'.repeat(80));

  if (p1.length) {
    console.log('\n🔴  P1 — CTR FIXES (title + description rewrites in seo.ts)\n');
    for (const r of p1) {
      console.log(`  ${r.path}`);
      console.log(`    Impressions: ${fmt(r.impressions)}  |  Position: ${fmt(r.position, 1)}  |  CTR: ${(r.ctr * 100).toFixed(1)}%  |  Clicks: ${fmt(r.clicks)}`);
      console.log();
    }
  }

  if (p2.length) {
    console.log('\n🟡  P2 — CONTENT IMPROVEMENTS (add content, prompts, FAQ)\n');
    for (const r of p2) {
      console.log(`  ${r.path}`);
      console.log(`    Impressions: ${fmt(r.impressions)}  |  Position: ${fmt(r.position, 1)}  |  CTR: ${(r.ctr * 100).toFixed(1)}%  |  Clicks: ${fmt(r.clicks)}`);
      console.log();
    }
  }

  if (!p1.length && !p2.length) {
    console.log('\n✅  No P1 or P2 issues found — work from the P3/P4 backlog in CLAUDE.md\n');
  }

  console.log('━'.repeat(80));
  console.log('\n📊  TOP 20 PAGES BY IMPRESSIONS\n');
  console.log('  Page'.padEnd(55) + 'Impr.'.padStart(8) + 'Pos.'.padStart(7) + 'CTR'.padStart(7) + 'Clicks'.padStart(8));
  console.log('  ' + '─'.repeat(78));
  for (const row of rows.slice(0, 20)) {
    const path = row.keys[0].replace(SITE_URL, '') || '/';
    const label = path.length > 52 ? path.slice(0, 49) + '...' : path;
    console.log(
      `  ${label.padEnd(54)}` +
      `${fmt(row.impressions).padStart(7)} ` +
      `${fmt(row.position, 1).padStart(6)} ` +
      `${(row.ctr * 100).toFixed(1).padStart(6)}%` +
      `${fmt(row.clicks).padStart(7)}`
    );
  }
  console.log();
}

main();
