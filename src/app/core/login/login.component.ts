import { Component } from '@angular/core';
import { NavigationService } from '../navigation/navigation.service';
import { LoginService } from './login.service';

@Component({
  selector: 'courses-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username: string;
  password: string;

  constructor(
    private loginService: LoginService,
    private navigationService: NavigationService,
  ) {}

  logIn(): void {
    const { root } = NavigationService.routes;
    this.loginService.logIn(this.username, this.password);
    this.navigationService.navigateByUrl(root);
  }
}
