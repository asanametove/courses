import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  let pipe;

  beforeEach(() => {
    pipe = new DurationPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('#transform', () => {
    it('should return transformed string', () => {
      expect(pipe.transform(0)).toBe('');
      expect(pipe.transform(1)).toBe('1min');
      expect(pipe.transform(60)).toBe('1h');
      expect(pipe.transform(61)).toBe('1h 1min');
    });
  });
});
