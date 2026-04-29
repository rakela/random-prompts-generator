#!/usr/bin/env node
/**
 * Fetches Google Search Console ranking data and prints a prioritised SEO task list.
 *
 * Setup (one time):
 *   npm run gsc:auth
 *
 * Usage:
 *   npm run gsc             (last 90 days)
 *   npm run gsc:28          (last 28 days)
 *   node scripts/fetch-gsc-data.js --json   (raw JSON output)
 */

import { google } from 'googleapis';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadEnv() {
  try {
    const lines = readFileSync(resolve(__dirname, '../.env.local'), 'utf-8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      let val = trimmed.slice(eqIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) ||
          (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1, -1);
      process.env[key] = val.replace(/\\n/g, '\n');
    }
  } catch { /* rely on process.env already set */ }
}

loadEnv();

const SITE_URL      = process.env.GOOGLE_GSC_SITE_URL || 'https://randomprompts.org';
const CLIENT_ID     = process.env.GOOGLE_OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.GOOGLE_OAUTH_REFRESH_TOKEN;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('Missing GOOGLE_OAUTH_CLIENT_ID / GOOGLE_OAUTH_CLIENT_SECRET in .env.local');
  process.exit(1);
}
if (!REFRESH_TOKEN) {
  console.error('No refresh token found. Run:  npm run gsc:auth');
  process.exit(1);
}

const args      = process.argv.slice(2);
const daysFlag  = args.indexOf('--days');
const DAYS      = daysFlag !== -1 ? parseInt(args[daysFlag + 1], 10) : 90;
const JSON_MODE = args.includes('--json');

function dateStr(daysAgo) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
}

function buildAuth() {
  const client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);
  client.setCredentials({ refresh_token: REFRESH_TOKEN });
  return client;
}

async function fetchGSC() {
  const webmasters = google.webmasters({ version: 'v3', auth: buildAuth() });
  const res = await webmasters.searchanalytics.query({
    siteUrl: SITE_URL,
    requestBody: {
      startDate: dateStr(DAYS),
      endDate:   dateStr(3),
      dimensions: ['page'],
      rowLimit: 500,
      dataState: 'final',
    },
  });
  return res.data.rows || [];
}

function classify(row) {
  const path = row.keys[0].replace(SITE_URL, '').replace(/\/$/, '') || '/';
  const { clicks, impressions, ctr, position } = row;
  if (impressions >= 5000 && ctr < 0.03)
    return { path, clicks, impressions, ctr, position, priority: 'P1 — CTR fix' };
  if (position >= 15 && position <= 25 && impressions >= 500)
    return { path, clicks, impressions, ctr, position, priority: 'P2 — Content improvement' };
  if (position <= 10 && ctr < 0.03 && impressions >= 300)
    return { path, clicks, impressions, ctr, position, priority: 'P1 — CTR fix (top-10 page)' };
  return { path, clicks, impressions, ctr, position, priority: null };
}

function fmt(n, dec = 0) {
  return Number(n).toLocaleString('en-US', { maximumFractionDigits: dec });
}

async function main() {
  console.log(`Fetching GSC data for ${SITE_URL} (last ${DAYS} days)…\n`);

  let rows;
  try {
    rows = await fetchGSC();
  } catch (err) {
    if (err.message?.includes('invalid_grant')) {
      console.error('❌  Refresh token expired or revoked. Re-run:  npm run gsc:auth');
    } else {
      console.error('❌  GSC API error:', err.message);
    }
    process.exit(1);
  }

  if (JSON_MODE) { console.log(JSON.stringify(rows, null, 2)); return; }

  rows.sort((a, b) => b.impressions - a.impressions);

  const tasks = rows.map(classify).filter(r => r.priority);
  const p1    = tasks.filter(r => r.priority.startsWith('P1'));
  const p2    = tasks.filter(r => r.priority.startsWith('P2'));

  console.log('━'.repeat(80));
  console.log(`GSC REPORT  ·  ${new Date().toDateString()}  ·  last ${DAYS} days  ·  ${rows.length} pages`);
  console.log('━'.repeat(80));

  if (p1.length) {
    console.log('\n🔴  P1 — CTR FIXES  (rewrite title + description in seo.ts)\n');
    for (const r of p1) {
      console.log(`  ${r.path}`);
      console.log(`    ${fmt(r.impressions)} impr  ·  pos ${fmt(r.position, 1)}  ·  CTR ${(r.ctr*100).toFixed(1)}%  ·  ${fmt(r.clicks)} clicks\n`);
    }
  }

  if (p2.length) {
    console.log('\n🟡  P2 — CONTENT IMPROVEMENTS  (add prompts, FAQ, usage guide)\n');
    for (const r of p2) {
      console.log(`  ${r.path}`);
      console.log(`    ${fmt(r.impressions)} impr  ·  pos ${fmt(r.position, 1)}  ·  CTR ${(r.ctr*100).toFixed(1)}%  ·  ${fmt(r.clicks)} clicks\n`);
    }
  }

  if (!p1.length && !p2.length) {
    console.log('\n✅  No P1/P2 issues found — pull from the P3/P4 backlog in CLAUDE.md\n');
  }

  console.log('━'.repeat(80));
  console.log('\n📊  TOP 20 PAGES BY IMPRESSIONS\n');
  const header = '  Page'.padEnd(55) + 'Impr'.padStart(7) + 'Pos'.padStart(6) + 'CTR'.padStart(7) + 'Clicks'.padStart(8);
  console.log(header);
  console.log('  ' + '─'.repeat(75));
  for (const row of rows.slice(0, 20)) {
    const p = row.keys[0].replace(SITE_URL, '') || '/';
    const label = p.length > 52 ? p.slice(0, 49) + '…' : p;
    console.log(
      `  ${label.padEnd(54)}` +
      `${fmt(row.impressions).padStart(6)} ` +
      `${fmt(row.position, 1).padStart(5)} ` +
      `${(row.ctr*100).toFixed(1).padStart(5)}%` +
      `${fmt(row.clicks).padStart(7)}`
    );
  }
  console.log();
}

main();
