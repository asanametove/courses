import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesListModule } from './courses-list/courses-list.module';
import { CoreModule } from './core/core.module';
import { AddCourseComponent } from './add-course/add-course.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AddCourseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoursesListModule,
    CoreModule.forRoot(),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
