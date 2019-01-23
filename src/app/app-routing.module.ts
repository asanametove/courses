import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { LoginComponent } from './core/login/login.component';

const routes: Routes = [
  { path: 'courses', component: CoursesListComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
