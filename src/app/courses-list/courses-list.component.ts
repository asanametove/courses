import { Component, OnInit } from '@angular/core';
import { Observer, Subject } from 'rxjs';
import { Course } from '@shared/course';
import { CoursesService } from '../core/courses/courses.service';
import { CourseLoadConfig } from '@shared/common.interfaces';
import { filter, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'courses-list',
  templateUrl: './courses-list.component.html',
})
export class CoursesListComponent implements OnInit {
  isLoadAvailable = false;
  courses: Course[] = [];

  private query: string;
  private query$ = new Subject<string>();
  private chunkSize = 5;
  private lastIndex = 0;
  private courseSaver: Observer<Course[]> = {
    next: chunk => {
      this.courses = [...this.courses, ...chunk];
      this.isLoadAvailable = chunk.length === this.chunkSize;
    },
    error: (error) => { throw error; },
    complete: () => {},
  };

  constructor(
    private coursesService: CoursesService,
  ) {}

  private get coursesLoadParams(): CourseLoadConfig {
    const config: CourseLoadConfig = {
      start: this.lastIndex,
      count: this.chunkSize,
    };

    return this.query
      ? { ...config, textFragment: this.query }
      : config;
  }

  private resetCourses(): void {
    this.courses = [];
    this.lastIndex = 0;
  }

  loadCourses(): void {
    this.coursesService.getCourses(this.coursesLoadParams)
      .subscribe(this.courseSaver);

    this.lastIndex += this.chunkSize;
  }

  ngOnInit() {
    this.loadCourses();
    this.query$.pipe(
      filter(({ length }) => !length || length > 2),
      debounceTime(1000),
    )
      .subscribe((query) => {
        this.query = query;
        this.resetCourses();
        this.loadCourses();
      });
  }

  onDelete(id: string): void {
    if (confirm('Do you really want to delete this course?')) {
      this.coursesService.removeCourse(id)
        .subscribe(() => {
          this.resetCourses();
          this.loadCourses();
        });
    }
  }

  onSearch(query: string): void {
    this.query$.next(query);
  }
}
