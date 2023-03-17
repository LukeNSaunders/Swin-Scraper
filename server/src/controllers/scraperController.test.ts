const { scrapeEvents } = require('./scraperController');
const {scrapeEventData} = require('../scrapers/scrapeEventData')

jest.mock('../scrapers/scrapeEventData', () => ({
  scrapeEventData: jest.fn(),
}));

describe('scrapeEvents', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 500 status code on error', async () => {
    const req = {
      body: {
        pageURL: 'http://example.com',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    (scrapeEventData as jest.MockedFunction<typeof scrapeEventData>)
      .mockRejectedValueOnce(new Error('mock error'));

    await scrapeEvents(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'mock error' });
    expect(res.json).toHaveBeenCalledTimes(1);
  });

  it('should return 201 status code and event data on success', async () => {
    const req = {
      body: {
        pageURL: 'http://example.com',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    (scrapeEventData as jest.MockedFunction<typeof scrapeEventData>)
      .mockResolvedValueOnce([
        { eventUrl: 'http://example.com/event1', eventName: 'Event 1', eventTime: '10:00 AM' },
        { eventUrl: 'http://example.com/event2', eventName: 'Event 2', eventTime: '11:00 AM' },
      ]);

    await scrapeEvents(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith([
      { eventUrl: 'http://example.com/event1', eventName: 'Event 1', eventTime: '10:00 AM' },
      { eventUrl: 'http://example.com/event2', eventName: 'Event 2', eventTime: '11:00 AM' },
    ]);
    expect(res.json).toHaveBeenCalledTimes(1);
  });
});
