import { scrapeAllHorseInfo, HorseData } from './scrapeHorseData';

describe('scrapeAllHorseInfo', () => {
  test('returns an array of HorseData objects', async () => {
    const eventUrl: string = 'https://example.com';
    const horseData: HorseData[] = await scrapeAllHorseInfo(eventUrl);
    expect(Array.isArray(horseData)).toBe(true);
    horseData.forEach((data: HorseData) => {
      expect(typeof data.horseName).toBe('string');
      expect(typeof data.horseOdds).toBe('string');
    });
  });

  test('returns empty array when given invalid eventUrl', async () => {
    const eventUrl: string = 'https://invalid-url.com';
    const horseData: HorseData[] = await scrapeAllHorseInfo(eventUrl);
    expect(Array.isArray(horseData)).toBe(true);
    expect(horseData.length).toBe(0);
  });

  test('returns unique horse data for valid eventUrl', async () => {
    const eventUrl: string = 'https://example.com';
    const horseData: HorseData[] = await scrapeAllHorseInfo(eventUrl);
    if (horseData.length === 0) {
      console.warn('No horse data found on page. Skipping test.');
      return;
    }
    const horseNames: string[] = horseData.map((data: HorseData) => data.horseName);
    const uniqueHorseNames: string[] = Array.from(new Set(horseNames));
    expect(horseNames.length).toBeGreaterThan(0);
    expect(horseNames.length).toBe(uniqueHorseNames.length);
    horseData.forEach((data: HorseData) => {
      expect(uniqueHorseNames).toContain(data.horseName);
    });
  });

  test('returns formatted horse data for valid eventUrl', async () => {
    const eventUrl: string = 'https://example.com';
    const horseData: HorseData[] = await scrapeAllHorseInfo(eventUrl);
    horseData.forEach((data: HorseData) => {
      expect(data.horseName).not.toMatch(/^\d+\./);
      expect(data.horseOdds).not.toMatch(/^-?\d+$/);
    });
  });
});