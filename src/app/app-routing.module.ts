import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteName } from '@shared/route-name';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { LoginComponent } from './core/login/login.component';

const routes: Routes = [
  { path: RouteName.Login, component: LoginComponent },
  { path: RouteName.Root, redirectTo: RouteName.Courses, pathMatch: 'full' },
  { path: RouteName.NotDefined, component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
