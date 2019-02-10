import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesListModule } from './courses-list/courses-list.module';
import { CoreModule } from './core/core.module';
import { FormsModule } from '@angular/forms';
import { httpInterceptorProviders } from '@core/interceptors';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoursesListModule,
    CoreModule.forRoot(),
    FormsModule,
    AppRoutingModule,
  ],
  providers: [
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
