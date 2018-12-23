import { Component } from '@angular/core';
import { Course } from '@shared/course';
import { FilterPipe } from './filter.pipe';

@Component({
  selector: 'courses-list',
  templateUrl: './courses-list.component.html',
})
export class CoursesListComponent {
  query: string;

  itemsCount = 3;

  rawData = [
    new Course('Title 1', 123, 'description1', new Date(2018, 11, 22)),
    new Course('Title 2', 3, 'description2', undefined, undefined, true),
    new Course('Title 3', 3, 'description3', new Date(2018, 11, 11)),
    new Course('Title 4', 3, 'description4'),
  ];

  constructor(
    public filterPipe: FilterPipe<Course>,
  ) {}

  get courses(): Course[] {
    return this.filterPipe.transform(this.rawData, this.query, 'title')
      .slice(0, this.itemsCount);
  }

  loadMore(): void {
    this.itemsCount += 3;
  }

  isMoreAvailable(): boolean {
    return this.rawData.length > this.itemsCount;
  }

  onDelete(id: string): void {
    this.rawData = this.rawData.filter((course) => course.id !== id);
  }

  onSearch(query: string): void {
    this.query = query;
  }
}
