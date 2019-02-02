import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteName } from '@shared/route-name';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { LoginComponent } from './core/login/login.component';
import { CreateCourseComponent } from './create-course/create-course.component';

const routes: Routes = [
  { path: RouteName.Courses, component: CoursesListComponent },
  { path: RouteName.Login, component: LoginComponent },
  { path: RouteName.CreateCourse, component: CreateCourseComponent },
  { path: RouteName.Root, redirectTo: RouteName.Courses, pathMatch: 'full' },
  { path: RouteName.NotDefined, component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
