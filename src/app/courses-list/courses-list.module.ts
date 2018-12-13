import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoursesListComponent } from './courses-list.component';
import { CoursesListItemComponent } from './courses-list-item/courses-list-item.component';
import { ToolboxComponent } from '../toolbox/toolbox.component';

@NgModule({
  declarations: [
    CoursesListComponent,
    CoursesListItemComponent,
    ToolboxComponent,
  ],
  exports: [
    CoursesListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
})
export class CoursesListModule { }
