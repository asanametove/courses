import { Injectable } from '@angular/core';

const localStorageKeysMap = {
  userInfo: 'userInfo',
};

@Injectable()
export class LoginService {
  logIn(username: string, password: string): void {
    const userInfo = { username, password };
    localStorage.setItem(localStorageKeysMap.userInfo, JSON.stringify(userInfo));
    console.log('Log in', userInfo);
  }

  logOut(): void {
    localStorage.removeItem(localStorageKeysMap.userInfo);
    console.log('Logged out');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(localStorageKeysMap.userInfo);
  }

  getUserInfo(): string {
    const userInfo = JSON.parse(localStorage.getItem(localStorageKeysMap.userInfo));
    console.log(userInfo);
    return userInfo;
  }
}
