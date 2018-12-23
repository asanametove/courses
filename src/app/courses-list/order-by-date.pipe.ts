import { Pipe, PipeTransform } from '@angular/core';
import { WithCreationDate } from '@shared/common.interfaces';

@Pipe({
  name: 'orderByDate',
})
export class OrderByDatePipe implements PipeTransform {
  private descCompareFn(a: WithCreationDate, b: WithCreationDate): number {
    return b.creationDate.getTime() - a.creationDate.getTime();
  }

  private ascCompareFn(a: WithCreationDate, b: WithCreationDate): number {
    return a.creationDate.getTime() - b.creationDate.getTime();
  }

  transform(list: WithCreationDate[], descending = false): WithCreationDate[] {
    return [...list].sort(descending
      ? this.descCompareFn
      : this.ascCompareFn);
  }
}
