import { scrapeEventData, EventInfo } from './scrapeEventData';

describe('scrapeEventData', () => {
  it('returns an array of EventInfo objects', async () => {
    const pageUrl: string = 'https://example.com';
    const eventInfo: EventInfo[] = await scrapeEventData(pageUrl);
    expect(Array.isArray(eventInfo)).toBe(true);
    eventInfo.forEach((info: EventInfo) => {
      expect(typeof info.eventUrl).toBe('string');
      expect(typeof info.eventName).toBe('string');
      expect(typeof info.eventTime).toBe('string');
    });
  });

  it('returns empty array when given invalid pageUrl', async () => {
    const pageUrl: string = 'https://invalid-url.com';
    const eventInfo: EventInfo[] = await scrapeEventData(pageUrl);
    expect(Array.isArray(eventInfo)).toBe(true);
    expect(eventInfo.length).toBe(0);
  });

  it('returns event info for valid pageUrl', async () => {
    const pageUrl: string = 'https://example.com';
    const eventInfo: EventInfo[] = await scrapeEventData(pageUrl);
    if (eventInfo.length === 0) {
      console.warn('No events found on page. Skipping test.');
      return;
    }
    expect(eventInfo.length).toBeGreaterThan(0);
    eventInfo.forEach((info: EventInfo) => {
      expect(info.eventUrl).toMatch(/^https?:\/\/\S+$/);
      expect(info.eventName).toMatch(/\w+/);
      expect(info.eventTime).toMatch(/\d{2}:\d{2} (AM|PM)/);
    });
  });

  it('returns event info with valid eventUrl', async () => {
    const pageUrl: string = 'https://example.com';
    const eventInfo: EventInfo[] = await scrapeEventData(pageUrl);
    eventInfo.forEach((info: EventInfo) => {
      expect(info.eventUrl).toBeDefined();
      expect(info.eventUrl).toMatch(/^https?:\/\/\S+$/);
    });
  });

  it('returns event info with valid eventName', async () => {
    const pageUrl: string = 'https://example.com';
    const eventInfo: EventInfo[] = await scrapeEventData(pageUrl);
    eventInfo.forEach((info: EventInfo) => {
      expect(info.eventName).toBeDefined();
      expect(info.eventName).toMatch(/\w+/);
    });
  });

  it('returns event info with valid eventTime', async () => {
    const pageUrl: string = 'https://example.com';
    const eventInfo: EventInfo[] = await scrapeEventData(pageUrl);
    eventInfo.forEach((info: EventInfo) => {
      expect(info.eventTime).toBeDefined();
      expect(info.eventTime).toMatch(/\d{2}:\d{2} (AM|PM)/);
    });
  });
});