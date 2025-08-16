// Mobile screenshots for key routes using Playwright
import { chromium, devices } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const BASE_URL = process.env.BASE_URL || 'http://localhost:8081';
const OUT_DIR = path.resolve('.screenshots/mobile');

const routes = [
  { path: '/', name: 'home' },
  { path: '/services', name: 'services' },
  { path: '/about', name: 'about' },
  { path: '/contact', name: 'contact' },
  { path: '/help', name: 'help' },
  { path: '/privacy', name: 'privacy' },
  // Order flow
  { path: '/order/start', name: 'order-start' },
  { path: '/order/services', name: 'order-services' },
  { path: '/order/items/eazzy-bag', name: 'items-eazzy-bag' },
  { path: '/order/items/dry-cleaning', name: 'items-dry-cleaning' },
  { path: '/order/items/wash-iron', name: 'items-wash-iron' },
  { path: '/order/items/repairs', name: 'items-repairs' },
  { path: '/order/scheduling', name: 'order-scheduling' },
  { path: '/order/address', name: 'order-address' },
  { path: '/order/payment', name: 'order-payment' },
  { path: '/order/confirmation', name: 'order-confirmation' },
  // Quotes & discrepancies
  { path: '/order/custom-quote', name: 'custom-quote' },
  { path: '/quote/confirmation', name: 'quote-confirmation' },
  { path: '/quote-approval/123', name: 'quote-approval' },
  { path: '/discrepancy/123', name: 'discrepancy' },
  // User
  { path: '/notifications', name: 'notifications' },
  { path: '/orders', name: 'orders' },
  { path: '/order/123', name: 'order-details' },
  { path: '/cart', name: 'cart' },
  { path: '/login', name: 'login' },
  { path: '/messages', name: 'messages' },
  // Legacy pages
  { path: '/personal', name: 'personal' },
  { path: '/business', name: 'business' },
  { path: '/company', name: 'company' },
  { path: '/complaints', name: 'complaints' },
  { path: '/cookie-policy', name: 'cookie-policy' },
  { path: '/website-terms', name: 'website-terms' },
  { path: '/legal-agreements', name: 'legal-agreements' },
  { path: '/modern-slavery-policy', name: 'modern-slavery-policy' },
  { path: '/terms', name: 'terms' },
  // Not found
  { path: '/definitely-not-found', name: 'not-found' },
];

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const iPhone = devices['iPhone 12'];
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ ...iPhone });
  const page = await context.newPage();

  for (const r of routes) {
    const url = `${BASE_URL}${r.path}`;
    try {
      console.log('→', url);
      await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
      // small wait for fonts/animations
      await page.waitForTimeout(500);
      const filePath = path.join(OUT_DIR, `${r.name}.png`);
      await page.screenshot({ path: filePath, fullPage: true });
    } catch (e) {
      console.warn('! Failed', url, e?.message || e);
    }
  }

  await context.close();
  await browser.close();

  console.log(`Saved screenshots to ${OUT_DIR}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


