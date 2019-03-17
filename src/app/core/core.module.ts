import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationService } from './navigation/navigation.service';
import { CoursesService } from './courses/courses.service';
import { UtilsModule } from '../utils/utils.module';
import { LoginGuard } from './login/login.guard';
import { LoadingComponent } from './loading/loading.component';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoadingService } from './loading/loading.service';
import { InputErrorsComponent } from './validation/input-errors/input-errors.component';
import { InputHighlightDirective } from './validation/input-highlight/input-highlight.directive';
import { DateInputComponent } from './custom-controls/date-input/date-input.component';
import { NumberInputComponent } from './custom-controls/number-input/number-input.component';
import { CloudTagsInputComponent } from './custom-controls/cloud-tags-input/cloud-tags-input.component';
import { TranslateModule } from '@ngx-translate/core';

library.add(faSpinner);

@NgModule({
  declarations: [
    HeaderComponent,
    BreadcrumbsComponent,
    FooterComponent,
    PageNotFoundComponent,
    LoginComponent,
    LoadingComponent,
    InputErrorsComponent,
    InputHighlightDirective,
    DateInputComponent,
    NumberInputComponent,
    CloudTagsInputComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    UtilsModule,
    FontAwesomeModule,
    NgbTypeaheadModule,
    TranslateModule,
  ],
  exports: [
    HeaderComponent,
    BreadcrumbsComponent,
    FooterComponent,
    LoadingComponent,
    InputErrorsComponent,
    InputHighlightDirective,
    DateInputComponent,
    NumberInputComponent,
    CloudTagsInputComponent,
  ],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        LoginService,
        NavigationService,
        CoursesService,
        LoginGuard,
        LoadingService,
      ],
    };
  }
}
