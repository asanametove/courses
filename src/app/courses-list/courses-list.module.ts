import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { CoursesListComponent } from './courses-list.component';
import { CoursesListItemComponent } from './courses-list-item/courses-list-item.component';
import { ToolboxComponent } from '../toolbox/toolbox.component';
import { CoursesHighlightDirective } from './courses-highlight.directive';

library.add(faStar);

@NgModule({
  declarations: [
    CoursesListComponent,
    CoursesListItemComponent,
    ToolboxComponent,
    CoursesHighlightDirective,
  ],
  exports: [
    CoursesListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
  ],
})
export class CoursesListModule { }
