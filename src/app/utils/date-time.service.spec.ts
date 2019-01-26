import { DateTimeService } from './date-time-service';

describe('DateTimeService', () => {
  const currentDateString = '2000-06-15T06:06:06';

  let service: DateTimeService;

  beforeEach(() => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(currentDateString));

    service = new DateTimeService();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  describe('#isFutureDate', () => {
    const testDataSet: [string, boolean][] = [
      ['2000-06-16', true],
      [currentDateString, false],
      ['2000-06-15T03:24:00', false],
      ['2000-06-14', false],
    ];

    testDataSet.forEach(([dateString, expected]) => {
      it(`${dateString} should be ${expected}`, () => {
        expect(service.isFutureDate(new Date(dateString))).toBe(expected);
      });
    });
  });

  describe('isDateInRange', () => {
    const testDataSet: [string, boolean][] = [
      ['2000-06-12T12:12:12', false],
      ['2000-06-13T12:12:12', false],
      ['2000-06-14T12:12:12', true],
      ['2000-06-15T12:12:12', true],
      ['2000-06-16T12:12:12', true],
      ['2000-06-17T12:12:12', true],
      ['2000-06-18T12:12:12', false],
      ['2000-06-19T12:12:12', false],
    ];

    testDataSet.forEach(([dateString, expected]) => {
      it(`date ${dateString} should be ${expected}`, () => {
        const result = service.isDateInRange(new Date(dateString), 2, 3);
        expect(result).toBe(expected);
      });
    });
  });

  describe('#getDateOnly', () => {
    it('should reset time', () => {
      const actualDate = new Date('2000-06-12T12:12:12');
      const expectedDate = new Date('2000-06-12T00:00:00');
      expect(service.getDateOnly(actualDate)).toEqual(expectedDate);
    });
  });
});
