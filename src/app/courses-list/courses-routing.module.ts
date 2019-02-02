import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteName } from '@shared/route-name';
import { CreateCourseComponent } from './create-course/create-course.component';
import { CoursesListComponent } from './courses-list.component';
import { EditCourseComponent } from './edit-course/edit-course.component';

const routes: Routes = [
  { path: RouteName.Courses, component: CoursesListComponent },
  { path: RouteName.NewCourse, component: CreateCourseComponent },
  { path: RouteName.EditCourse, component: EditCourseComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule { }
