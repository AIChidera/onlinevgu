import { chromium } from 'playwright'
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const OUT = 'C:\\Users\\nwang\\Desktop\\modal-tests'

const errors = []
const logs = []

async function snap(page, label) {
  await page.screenshot({ path: `${OUT}\\dbg-${label}.png` })
  const state = await page.evaluate(() => ({
    bodyPosition: document.body.style.position,
    bodyTop: document.body.style.top,
    bodyWidth: document.body.style.width,
    scrollY: window.scrollY,
    bodyOffsetTop: document.body.getBoundingClientRect().top,
    htmlOverflow: document.documentElement.style.overflow,
    bodyOverflow: document.body.style.overflow,
  }))
  console.log(`[${label}] body state:`, JSON.stringify(state))
}

const b = await chromium.launch({ executablePath: CHROME, headless: false, slowMo: 200 })
const ctx = await b.newContext({ viewport: { width: 430, height: 932 }, isMobile: true, hasTouch: true })
const page = await ctx.newPage()

page.on('console', m => { if (m.type() === 'error') { logs.push(m.text()); console.log('Console ERR:', m.text()) } })
page.on('pageerror', e => { errors.push(e.message); console.log('PAGE ERROR:', e.message) })

await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' })
await page.waitForTimeout(1000)

// Scroll down a bit so scrollY > 0
await page.evaluate(() => window.scrollTo(0, 400))
await page.waitForTimeout(500)

await snap(page, '1-before-open')

// Open the Apply modal
const triggers = page.locator('[data-apply-trigger]')
let clicked = false
const count = await triggers.count()
for (let i = 0; i < count; i++) {
  if (await triggers.nth(i).isVisible()) {
    await triggers.nth(i).click()
    clicked = true
    break
  }
}
console.log('Modal clicked:', clicked)

await page.waitForTimeout(800)
await snap(page, '2-modal-open')

// Close the modal
const closeBtn = page.locator('[aria-label="Close"]').first()
console.log('Close button visible:', await closeBtn.isVisible())
await closeBtn.click()
await page.waitForTimeout(200)
await snap(page, '3-just-closed')

// Wait 1 second
await page.waitForTimeout(1000)
await snap(page, '4-after-1s')

// Wait another 1 second (total 2s)
await page.waitForTimeout(1000)
await snap(page, '5-after-2s')

// Wait another 1 second (total 3s)
await page.waitForTimeout(1000)
await snap(page, '6-after-3s')

console.log('\n--- Errors collected:', errors)
console.log('--- Console logs:', logs)
await b.close()
