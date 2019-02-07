import { Component, OnInit } from '@angular/core';
import { Observer } from 'rxjs';
import { Course } from '@shared/course';
import { FilterPipe } from './pipes/filter.pipe';
import { CoursesService } from '../core/courses/courses.service';

@Component({
  selector: 'courses-list',
  templateUrl: './courses-list.component.html',
})
export class CoursesListComponent implements OnInit {
  query: string;
  isLoadAvailable = false;

  private chunkSize = 10;
  private lastIndex = 0;
  private rawData: Course[] = [];
  private courseSaver: Observer<Course[]> = {
    next: chunk => {
      this.rawData = [...this.rawData, ...chunk];
      this.isLoadAvailable = chunk.length === this.chunkSize;
    },
    error: () => {},
    complete: () => {},
  };

  constructor(
    private coursesService: CoursesService,
    private filterPipe: FilterPipe<Course>,
  ) {}

  loadCourses(): void {
    this.coursesService.getCourses(this.lastIndex, this.chunkSize)
      .subscribe(this.courseSaver);
    this.lastIndex += this.chunkSize;
  }

  ngOnInit() {
    this.loadCourses();
  }

  get courses(): Course[] {
    return this.filterPipe.transform(this.rawData, this.query, 'title');
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
