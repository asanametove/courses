import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe<T> implements PipeTransform {
  transform(list: T[], query: string, propName: string): T[] {
    return query
      ? list.filter((item) => item[propName]
          && String(item[propName]).toLowerCase().includes(query))
      : list;
  }
}
