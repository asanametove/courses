import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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

library.add(faStar);

@NgModule({
  declarations: [
    CoursesListComponent,
    CoursesListItemComponent,
    ToolboxComponent,
    CoursesHighlightDirective,
    OrderByDatePipe,
    DurationPipe,
    FilterPipe,
    EditCourseComponent,
  ],
  exports: [
    CoursesListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    CoursesRoutingModule,
  ],
  providers: [
    FilterPipe,
  ],
})
export class CoursesListModule { }
