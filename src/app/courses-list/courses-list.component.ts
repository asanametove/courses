import { Component } from '@angular/core';
import { Course } from '@shared/course';

@Component({
  selector: 'courses-list',
  templateUrl: './courses-list.component.html',
})
export class CoursesListComponent {
  itemsCount: number;
  rawData: Course[];

  constructor() {
    this.itemsCount = 3;
    this.rawData = [
      new Course('Title 1', 3, 'description1'),
      new Course('Title 2', 3, 'description2'),
      new Course('Title 3', 3, 'description3'),
      new Course('Title 4', 3, 'description4'),
    ];
  }

  get courses(): Course[] {
    return this.rawData.slice(0, this.itemsCount);
  }

  loadMore(): void {
    if (this.isMoreAvailable()) {
      this.itemsCount += 3;
    }
  }

  isMoreAvailable(): boolean {
    return this.rawData.length > this.itemsCount;
  }

  onDelete(id): void {
    this.rawData = this.rawData.filter((course) => course.id !== id);
  }
}
