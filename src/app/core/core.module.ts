import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    HeaderComponent,
    BreadcrumbsComponent,
    FooterComponent,
    LoginComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    HeaderComponent,
    BreadcrumbsComponent,
    FooterComponent,
  ],
})
export class CoreModule { }
