const { scrapeEvents, scrapeOddsByEvent } = require('./scraperController');
const { scrapeEventData } = require('../scrapers/scrapeEventData');
const { scrapeAllHorseData } = require('../scrapers/scrapeHorseData');

// Mocks for scraping functions
jest.mock('../scrapers/scrapeEventData', () => ({
  scrapeEventData: jest.fn(),
}));

jest.mock('../scrapers/scrapeHorseData', () => ({
  scrapeAllHorseData: jest.fn(),
}));

// SCRAPE EVENTS FUNCTION TESTS

describe('scrapeEvents', () => {
  // Clear all mocks hook
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const req = {
    body: {
      pageURL: 'http://example.com',
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    send: jest.fn(),
  };

  // FAIL AND 500 STATUS

  // Mock the scrapeEventData function to throw an error

  it('should return 500 status code on error', async () => {
    (scrapeEventData as jest.MockedFunction<typeof scrapeEventData>).mockRejectedValueOnce(
      new Error('mock error')
    );

    await scrapeEvents(req, res);

    // Assert correct call of response status, json and send functions

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'mock error' });
    expect(res.json).toHaveBeenCalledTimes(1);
  });

  // SUCCESS AND 201 STATUS

  // Mock the scrapeEventData function to return an array of event data

  it('should return 201 status code and event data on success', async () => {
    (scrapeEventData as jest.MockedFunction<typeof scrapeEventData>).mockResolvedValueOnce([
      { eventUrl: 'http://example.com/event1', eventName: 'Event 1', eventTime: '10:00 AM' },
      { eventUrl: 'http://example.com/event2', eventName: 'Event 2', eventTime: '11:00 AM' },
    ]);

    await scrapeEvents(req, res);

    // Assert correct call of response status, json and send functions

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith([
      { eventUrl: 'http://example.com/event1', eventName: 'Event 1', eventTime: '10:00 AM' },
      { eventUrl: 'http://example.com/event2', eventName: 'Event 2', eventTime: '11:00 AM' },
    ]);
    expect(res.json).toHaveBeenCalledTimes(1);
  });
});

// SCRAPE ODDS BY EVENT FUNCTION TESTS

describe('scrapeOddsByEvent', () => {
  const req = { body: { eventUrl: 'http://example.com/event' } };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    send: jest.fn(),
  };

  // Clear all mocks hook

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // MISSING URL AND 400 STATUS

  // Set up a new request object with an empty body

  it('should return 400 if no eventUrl is provided', async () => {
    const req = { body: {} };
    await scrapeOddsByEvent(req, res);

    // Assert correct call of response status, json and send functions
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('Please provide valid URL');
  });

  // SUCCESS AND 201 STATUS

  // Set up mock data that will be returned by the scrapeAllHorseData function

  it('should call scrapeAllHorseData with the provided eventUrl', async () => {
    const mockData = [
      { horse: 'Horse 1', odds: 5 },
      { horse: 'Horse 2', odds: 3 },
    ];
    scrapeAllHorseData.mockResolvedValue(mockData);

    await scrapeOddsByEvent(req, res);

    // assert correct calls of status and functions
    expect(scrapeAllHorseData).toHaveBeenCalledWith('http://example.com/event');
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  // FAIL AND 500 STATUS

  // Set up error message that will be thrown by the scrapeAllHorseData function

  it('should return 500 if an error occurs during scraping', async () => {
    const errorMessage = 'Error scraping data';
    scrapeAllHorseData.mockRejectedValue(new Error(errorMessage));

    await scrapeOddsByEvent(req, res);

   // Assert correct calls  
    expect(scrapeAllHorseData).toHaveBeenCalledWith('http://example.com/event');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});
