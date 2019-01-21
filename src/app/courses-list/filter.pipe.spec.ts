import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  let pipe: FilterPipe<{}>;

  beforeEach(() => {
    pipe = new FilterPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('#transform', () => {
    let list;
    const query = 'ab';

    beforeEach(() => {
      list = [
        {prop: 'abc'},
        {prop: 'def'},
      ];
    });

    it('should not modify list if query is not provided', () => {
      const result = pipe.transform(list, '', 'prop');
      expect(result).toEqual(list);
      expect(result).toBe(list);
    });

    it('should filter list by query', () => {
      const result = pipe.transform(list, query, 'prop');
      expect(result).toEqual([list[0]]);
    });

    it('should be case insensitive', () => {
      list[0].prop = 'ABc';
      const result = pipe.transform(list, query, 'prop');
      expect(result).toEqual([list[0]]);
    });

    it('should exclude element if it has falsy property', () => {
      list[0].prop = null;
      const result = pipe.transform(list, 'null', 'prop');
      expect(result).toEqual([]);
    });
  });
});
