import { Component, OnInit } from '@angular/core';
import { CourseUpdateInfo, Course } from '@shared/course';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '@core/navigation/navigation.service';
import { RouteName } from '@shared/route-name';
import { Store } from '@ngrx/store';
import { AppState, selectCourseDetails } from '@store/reducers';
import { LoadCourseDetails, UpdateCourseDetails } from '@store/actions/course-details-page.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'courses-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss'],
})
export class EditCourseComponent implements OnInit {

  course$ =  this.store.select(selectCourseDetails);

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private navigationService: NavigationService,
  ) { }

  private get id(): string {
    return this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadCourseDetails(this.id));
  }

  // TODO Create Interceptor for errors
  onSave(course: Course): void {
    this.store.dispatch(new UpdateCourseDetails(course));
  }

  onCancel(): void {
    this.navigationService.navigateByUrl(RouteName.Courses);
  }

}
