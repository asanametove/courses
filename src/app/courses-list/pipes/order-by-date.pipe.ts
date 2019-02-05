import { Pipe, PipeTransform } from '@angular/core';
import { WithCreationDate } from '@shared/common.interfaces';

@Pipe({
  name: 'orderByDate',
})
export class OrderByDatePipe implements PipeTransform {
  private descCompareFn(itemA: WithCreationDate, itemB: WithCreationDate): number {
    return itemB.creationDate.getTime() - itemA.creationDate.getTime();
  }

  private ascCompareFn(itemA: WithCreationDate, itemB: WithCreationDate): number {
    return itemA.creationDate.getTime() - itemB.creationDate.getTime();
  }

  transform(list: WithCreationDate[], descending = false): WithCreationDate[] {
    return [...list].sort(descending
      ? this.descCompareFn
      : this.ascCompareFn);
  }
}
