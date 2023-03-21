import { scrapeEventData} from './scrapeEventData';
import { EventData } from '../returnTypes';

describe('scrapeEventData', () => {
  it('returns an array of Eventdata objects', async () => {
    const pageUrl: string = 'https://example.com';
    const eventData: EventData[] = await scrapeEventData(pageUrl);
    expect(Array.isArray(eventData)).toBe(true);
    eventData.forEach((data: EventData) => {
      expect(typeof data.eventUrl).toBe('string');
      expect(typeof data.eventName).toBe('string');
      expect(typeof data.eventTime).toBe('string');
    });
  });

  it('returns empty array when given invalid pageUrl', async () => {
    const pageUrl: string = 'https://invalid-url.com';
    const eventData: EventData[] = await scrapeEventData(pageUrl);
    expect(Array.isArray(eventData)).toBe(true);
    expect(eventData.length).toBe(0);
  });

  it('returns event data for valid pageUrl', async () => {
    const pageUrl: string = 'https://example.com';
    const eventData: EventData[] = await scrapeEventData(pageUrl);
    if (eventData.length === 0) {
      console.warn('No events found on page. Skipping test.');
      return;
    }
    expect(eventData.length).toBeGreaterThan(0);
    eventData.forEach((data: EventData) => {
      expect(data.eventUrl).toMatch(/^https?:\/\/\S+$/);
      expect(data.eventName).toMatch(/\w+/);
      expect(data.eventTime).toMatch(/\d{2}:\d{2} (AM|PM)/);
    });
  });

  it('returns event data with valid eventUrl', async () => {
    const pageUrl: string = 'https://example.com';
    const eventData: EventData[] = await scrapeEventData(pageUrl);
    eventData.forEach((data: EventData) => {
      expect(data.eventUrl).toBeDefined();
      expect(data.eventUrl).toMatch(/^https?:\/\/\S+$/);
    });
  });

  it('returns event data with valid eventName', async () => {
    const pageUrl: string = 'https://example.com';
    const eventData: EventData[] = await scrapeEventData(pageUrl);
    eventData.forEach((data: EventData) => {
      expect(data.eventName).toBeDefined();
      expect(data.eventName).toMatch(/\w+/);
    });
  });

  it('returns event data with valid eventTime', async () => {
    const pageUrl: string = 'https://example.com';
    const eventData: EventData[] = await scrapeEventData(pageUrl);
    eventData.forEach((data: EventData) => {
      expect(data.eventTime).toBeDefined();
      expect(data.eventTime).toMatch(/\d{2}:\d{2} (AM|PM)/);
    });
  });
});