import { Component } from '@angular/core';

@Component({
  selector: 'courses-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  isLoggedIn = false;

  logIn(): void {
    this.isLoggedIn = true;
  }

  logOut(): void {
    this.isLoggedIn = false;
  }
}
