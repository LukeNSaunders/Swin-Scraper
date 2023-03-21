import puppeteer, { Browser, Page } from 'puppeteer';
import { createPage, closeBrowser } from './puppeteerUtils';

describe('browser', () => {
  let browser: Browser | undefined;
  let page: Page | undefined;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
  });

  afterAll(async () => {
    if (browser) {
      await closeBrowser();
    }
  });

  afterEach(async () => {
    if (page) {
      await page.close();
    }
    page = undefined;
  });

  describe('createPage', () => {
    it('returns a Page object', async () => {
      page = await createPage();
      expect(page instanceof Page).toBe(true);
    });

    it('uses the same browser instance', async () => {
      const prevBrowser = browser;
      page = await createPage();
      expect(browser).toBe(prevBrowser);
    });
  });
});

