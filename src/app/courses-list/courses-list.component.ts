import { Component, OnInit } from '@angular/core';
import { Course } from '@shared/course';
import { FilterPipe } from './pipes/filter.pipe';
import { CoursesService } from '../core/courses/courses.service';

@Component({
  selector: 'courses-list',
  templateUrl: './courses-list.component.html',
})
export class CoursesListComponent implements OnInit {
  query: string;

  itemsCount = 3;

  private rawData: Course[] = [];

  constructor(
    private coursesService: CoursesService,
    private filterPipe: FilterPipe<Course>,
  ) {}

  private loadCourses(): void {
    this.rawData = this.coursesService.getCourses();
  }

  ngOnInit() {
    this.loadCourses();
  }

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
    if (confirm('Do you really want to delete this course?')) {
      this.coursesService.removeCourse(id);
      this.loadCourses();
    }
  }

  onSearch(query: string): void {
    this.query = query;
  }
}
