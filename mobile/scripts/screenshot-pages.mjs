import { chromium, devices } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const baseURL = process.env.BASE_URL || 'http://localhost:8084';
const outDir = path.resolve(process.cwd(), 'screenshots');

const routes = [
  '/',
  '/services',
  '/services/eazzy-bag',
  '/items/eazzy-bag',
  '/cart',
  '/order-start',
  '/order-address',
  '/order-scheduling',
  '/order-payment',
  '/order-confirmation',
  '/order-tracking?orderId=EZ-2024-003',
  '/order-history',
  '/order-rating?orderId=EZ-2024-003',
  '/messages',
  '/notifications',
  '/profile',
  '/settings',
  '/help',
  '/about',
  '/contact',
  '/addresses',
  '/payment-methods',
  '/welcome',
  '/onboarding',
];

function filenameFor(route) {
  const safe = route.replace(/[\/:?&=]+/g, '_').replace(/^_+|_+$/g, '');
  return (safe || 'home') + '.png';
}

async function waitForServer(url, retries = 50) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, { method: 'GET' });
      if (res.ok) return true;
    } catch {}
    await new Promise((r) => setTimeout(r, 300));
  }
  return false;
}

async function main() {
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const iPhone = devices['iPhone 14 Pro'];
  const browser = await chromium.launch();
  const context = await browser.newContext({
    ...iPhone,
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  // Ensure server is up
  const ok = await waitForServer(baseURL);
  if (!ok) {
    console.error('Server not reachable at', baseURL);
    process.exit(1);
  }

  for (const route of routes) {
    const url = baseURL + route;
    console.log('Capturing', url);
    try {
      // Load app shell first to ensure SPA mounts
      await page.goto(baseURL, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await page.waitForSelector('#root, body');
      // client-side navigation
      await page.evaluate((path) => {
        window.history.pushState({}, '', path);
        window.dispatchEvent(new Event('popstate'));
      }, route);
      // Allow route to render
      await page.waitForTimeout(900);
      const outPath = path.join(outDir, filenameFor(route));
      await page.screenshot({ path: outPath, fullPage: true });
    } catch (e) {
      console.warn('Failed to capture', url, e?.message);
    }
  }

  await browser.close();
  console.log('Screenshots saved to', outDir);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


