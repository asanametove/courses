import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteName } from '@shared/route-name';
import { CreateCourseComponent } from './create-course/create-course.component';
import { CoursesListComponent } from './courses-list.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { LoginGuard } from '@core/login/login.guard';

const routes: Routes = [
  {
    path: RouteName.Courses,
    component: CoursesListComponent,
    canActivate: [ LoginGuard],
    data: { label: 'Courses' },
  },
  {
    path: RouteName.NewCourse,
    component: CreateCourseComponent,
    canActivate: [ LoginGuard],
    data: { label: 'New course' },
  },
  {
    path: RouteName.EditCourse,
    component: EditCourseComponent,
    canActivate: [ LoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule { }
