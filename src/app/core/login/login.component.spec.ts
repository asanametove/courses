import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;

  beforeEach(() => {
    component = new LoginComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#logIn', () => {
    it('should log in', () => {
      component.logIn();
      expect(component.isLoggedIn).toBe(true);
    });
  });

  describe('#logOut', () => {
    it('should log out', () => {
      component.logOut();
      expect(component.isLoggedIn).toBe(false);
    });
  });
});
