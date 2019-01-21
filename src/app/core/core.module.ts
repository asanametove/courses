import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    BreadcrumbsComponent,
    FooterComponent,
    PageNotFoundComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  exports: [
    HeaderComponent,
    BreadcrumbsComponent,
    FooterComponent,
  ],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [LoginService],
    };
  }
}
