import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { CoursesListComponent } from './courses-list.component';
import { CoursesListItemComponent } from './courses-list-item/courses-list-item.component';
import { ToolboxComponent } from '../toolbox/toolbox.component';
import { CoursesHighlightDirective } from './directives/courses-highlight.directive';
import { FilterPipe } from './pipes/filter.pipe';
import { OrderByDatePipe } from './pipes/order-by-date.pipe';
import { DurationPipe } from './pipes/duration.pipe';
import { CoursesRoutingModule } from './courses-routing.module';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { EditCourseFormComponent } from './edit-course-form/edit-course-form.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { EffectsModule } from '@ngrx/effects';
import { CoursesEffects } from '@store/effects/courses.effect';
import { CoreModule } from '@core/core.module';
import { AuthorsService } from '@core/authors.service';

library.add(faStar);

@NgModule({
  declarations: [
    CoursesListComponent,
    CoursesListItemComponent,
    CreateCourseComponent,
    ToolboxComponent,
    CoursesHighlightDirective,
    OrderByDatePipe,
    DurationPipe,
    FilterPipe,
    EditCourseComponent,
    EditCourseFormComponent,
  ],
  exports: [
    CoursesListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    FontAwesomeModule,
    CoursesRoutingModule,
    EffectsModule.forFeature([CoursesEffects]),
  ],
  providers: [
    FilterPipe,
    AuthorsService,
  ],
})
export class CoursesListModule { }
