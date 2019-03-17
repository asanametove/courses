import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'courses-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(translate: TranslateService) {
    translate.setDefaultLang('en');
  }
}
