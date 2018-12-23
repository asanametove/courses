import { OrderByDatePipe } from './order-by-date.pipe';
import { WithCreationDate } from '@shared/common.interfaces';

describe('OrderByDatePipe', () => {
  let pipe: OrderByDatePipe;
  let earlier: WithCreationDate;
  let later: WithCreationDate;

  beforeEach(() => {
    pipe = new OrderByDatePipe();
    earlier = { creationDate: new Date(2000, 0) };
    later = { creationDate: new Date(2000, 1) };
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('#transform', () => {
    it('should sort list in ascending order', () => {
      const list = [ later, earlier ];
      expect(pipe.transform(list)[0]).toBe(earlier);
    });

    it('should sort list in descending order', () => {
      const list = [ earlier, later ];
      expect(pipe.transform(list, true)[0]).toBe(later);
    });

    it('should not modify original list', () => {
      const list = [ later, earlier ];
      expect(pipe.transform(list)).not.toBe(list);
    });
  });
});
