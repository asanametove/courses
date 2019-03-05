import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Course } from '@shared/course';
import { CoursesService } from '../core/courses/courses.service';
import { filter, debounceTime } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState, selectCourses } from '@store/reducers';
import { LoadCourses } from '@store/actions/courses-page.actions';

@Component({
  selector: 'courses-list',
  templateUrl: './courses-list.component.html',
})
export class CoursesListComponent implements OnInit {
  private query: string;
  private query$ = new Subject<string>();
  public courses$ = this.store.select(selectCourses);

  constructor(
    private coursesService: CoursesService,
    private store: Store<AppState>,
  ) {}

  private resetCourses(): void {
    this.coursesService.resetCourses();
  }

  get isLoadAvailable(): boolean {
    return this.coursesService.isLoadAvailable;
  }

  loadCourses(): void {
    this.store.dispatch(new LoadCourses(this.query));
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
