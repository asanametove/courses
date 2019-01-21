import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router,
  ) {}

  logIn(): void {
    this.loginService.logIn(this.username, this.password);
    this.router.navigateByUrl('/');
  }
}
