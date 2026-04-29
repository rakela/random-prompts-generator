#!/usr/bin/env node
/**
 * One-time OAuth2 setup for Google Search Console API access.
 *
 * Run once:
 *   npm run gsc:auth
 *
 * What it does:
 *   1. Opens a browser URL — sign in with the Google account that owns GSC
 *   2. Listens on localhost for the redirect code
 *   3. Exchanges the code for a refresh token
 *   4. Writes GOOGLE_OAUTH_REFRESH_TOKEN to .env.local automatically
 *
 * After this runs successfully, `npm run gsc` works forever.
 */

import { google } from 'googleapis';
import { createServer } from 'http';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ENV_PATH   = resolve(__dirname, '../.env.local');
const PORT       = 4242;
const REDIRECT   = `http://localhost:${PORT}`;

// ── load .env.local ──────────────────────────────────────────────────────────
function loadEnv() {
  try {
    const lines = readFileSync(ENV_PATH, 'utf-8').split('\n');
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
  } catch { /* rely on process.env */ }
}

// ── write refresh token back into .env.local ─────────────────────────────────
function saveRefreshToken(token) {
  let content = readFileSync(ENV_PATH, 'utf-8');
  const line  = `GOOGLE_OAUTH_REFRESH_TOKEN=${token}`;

  if (content.includes('GOOGLE_OAUTH_REFRESH_TOKEN=')) {
    content = content.replace(/^GOOGLE_OAUTH_REFRESH_TOKEN=.*$/m, line);
  } else {
    // append after the client secret line
    content = content.replace(
      /^(GOOGLE_OAUTH_CLIENT_SECRET=.*)$/m,
      `$1\n${line}`
    );
  }
  writeFileSync(ENV_PATH, content, 'utf-8');
}

loadEnv();

const CLIENT_ID     = process.env.GOOGLE_OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('Missing GOOGLE_OAUTH_CLIENT_ID or GOOGLE_OAUTH_CLIENT_SECRET in .env.local');
  process.exit(1);
}

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://www.googleapis.com/auth/webmasters.readonly'],
  prompt: 'consent', // force refresh_token to be returned
});

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('  GSC OAuth2 Setup');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log('1. Open this URL in your browser:\n');
console.log(`   ${authUrl}\n`);
console.log('2. Sign in with the Google account that owns randomprompts.org in GSC.');
console.log('3. Click Allow.\n');
console.log('Waiting for redirect on http://localhost:' + PORT + ' ...\n');

// ── local server to catch the OAuth redirect ─────────────────────────────────
const server = createServer(async (req, res) => {
  const url   = new URL(req.url, `http://localhost:${PORT}`);
  const code  = url.searchParams.get('code');
  const error = url.searchParams.get('error');

  if (error) {
    res.writeHead(400, { 'Content-Type': 'text/html' });
    res.end('<h2>Authorization denied.</h2><p>You can close this tab.</p>');
    console.error('❌  Authorization denied:', error);
    server.close();
    process.exit(1);
  }

  if (!code) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Waiting...');
    return;
  }

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<h2>✅ Authorized!</h2><p>You can close this tab and return to the terminal.</p>');

  server.close();

  try {
    const { tokens } = await oauth2Client.getToken(code);
    if (!tokens.refresh_token) {
      console.error('❌  No refresh_token returned.');
      console.error('   Fix: Go to myaccount.google.com/permissions, revoke access for this app, then re-run gsc:auth.');
      process.exit(1);
    }

    saveRefreshToken(tokens.refresh_token);

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅  Refresh token saved to .env.local');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\nYou can now run:  npm run gsc\n');
  } catch (err) {
    console.error('❌  Token exchange failed:', err.message);
    process.exit(1);
  }
});

server.listen(PORT, '127.0.0.1', () => {});
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌  Port ${PORT} is in use. Kill the process using it and re-run.`);
  } else {
    console.error('❌  Server error:', err.message);
  }
  process.exit(1);
});
