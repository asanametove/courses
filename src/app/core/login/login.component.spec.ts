import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { NavigationService } from '../navigation/navigation.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let loginServiceMock: LoginService;
  let navigationServiceMock: NavigationService;

  beforeEach(() => {
    loginServiceMock = jasmine.createSpyObj('loginService', ['logIn']);
    navigationServiceMock = jasmine.createSpyObj('navigationService', ['navigateByUrl']);
    component = new LoginComponent(
      loginServiceMock,
      navigationServiceMock,
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#logIn', () => {
    it('should log in using service', () => {
      const username = 'username';
      const password = 'password';
      Object.assign(component, { username, password });

      component.logIn();

      expect(loginServiceMock.logIn).toHaveBeenCalledWith(username, password);
    });

    it('should navigate to the root', () => {
      const { root } = NavigationService.routes;
      component.logIn();
      expect(navigationServiceMock.navigateByUrl).toHaveBeenCalledWith(root);
    });
  });
});
