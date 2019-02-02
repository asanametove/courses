import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteName } from '@shared/route-name';
import { CreateCourseComponent } from './create-course/create-course.component';
import { CoursesListComponent } from './courses-list.component';

const routes: Routes = [
  { path: RouteName.Courses, component: CoursesListComponent },
  { path: RouteName.NewCourse, component: CreateCourseComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule { }
