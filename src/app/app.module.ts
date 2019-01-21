import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesListModule } from './courses-list/courses-list.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoursesListModule,
    CoreModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
