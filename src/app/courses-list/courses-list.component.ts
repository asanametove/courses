import { Component, OnInit } from '@angular/core';
import { Observer } from 'rxjs';
import { Course } from '@shared/course';
import { CoursesService } from '../core/courses/courses.service';
import { CourseLoadConfig } from '@shared/common.interfaces';

@Component({
  selector: 'courses-list',
  templateUrl: './courses-list.component.html',
})
export class CoursesListComponent implements OnInit {
  isLoadAvailable = false;
  courses: Course[] = [];

  private query: string;
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

  loadCourses(anew?: boolean): void {
    if (anew) {
      this.courses = [];
      this.lastIndex = 0;
    }

    this.coursesService.getCourses(this.coursesLoadParams)
      .subscribe(this.courseSaver);

    this.lastIndex += this.chunkSize;
  }

  ngOnInit() {
    this.loadCourses();
  }

  onDelete(id: string): void {
    if (confirm('Do you really want to delete this course?')) {
      this.coursesService.removeCourse(id)
        .subscribe(() => this.loadCourses(true));
    }
  }

  onSearch(query: string): void {
    this.query = query;
    this.loadCourses(true);
  }
}
