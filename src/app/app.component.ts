import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageKey } from '@shared/language';

@Component({
  selector: 'courses-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(translate: TranslateService) {
    translate.setDefaultLang(LanguageKey.en);
    translate.use(LanguageKey.en);
  }
}
