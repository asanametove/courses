import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RouteName } from '@shared/route-name';
import { User } from '@shared/user';
import { LoginService } from '../login/login.service';
import { NavigationService } from '../navigation/navigation.service';
import { Language, LanguageKey } from '@shared/language';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'courses-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  public languages = [
    new Language(LanguageKey.en),
    new Language(LanguageKey.ru),
  ];
  public language: Language;

  constructor(
    private loginService: LoginService,
    private navigationService: NavigationService,
    private translateService: TranslateService,
  ) {}

  get isLoggedIn$(): Observable<boolean> {
    return this.user$.pipe(
      map((user) => user.isLoggedIn),
    );
  }

  get isLoginShown$(): Observable<boolean> {
    return this.isLoggedIn$.pipe(
      map((isLoggedIn) => !isLoggedIn && !this.navigationService.isOnPage(RouteName.Login)),
    );
  }

  get user$(): Observable<User> {
    return this.loginService.user$;
  }

  ngOnInit(): void {
    this.language = new Language(this.translateService.currentLang as LanguageKey);
  }

  logOut(): void {
    this.loginService.logOut();
  }

  onLanguageChange(lang: Language): void {
    this.language = lang;
    this.translateService.use(lang.key);
  }
}
