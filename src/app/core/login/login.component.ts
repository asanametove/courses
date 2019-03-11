import { Component } from '@angular/core';
import { RouteName } from '@shared/route-name';
import { NavigationService } from '../navigation/navigation.service';
import { LoginService } from './login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'courses-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  public loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private loginService: LoginService,
    private navigationService: NavigationService,
  ) {}

  public get username() { return this.loginForm.controls.username; }

  public get password() { return this.loginForm.controls.password; }

  public logIn(): void {
    const { username, password } = this.loginForm.value;
    this.loginService.logIn(username, password);
    this.navigationService.navigateByUrl(RouteName.Root);
  }
}
