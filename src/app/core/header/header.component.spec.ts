import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { LoginService } from '../login/login.service';
import { NavigationService } from '../navigation/navigation.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let loginServiceMock: jasmine.SpyObj<LoginService>;
  let navigationServiceMock: jasmine.SpyObj<NavigationService>;

  beforeEach(async(() => {
    loginServiceMock = jasmine.createSpyObj('loginService', ['isLoggedIn']);
    navigationServiceMock = jasmine.createSpyObj('navigationService', ['isOnPage']);

    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
      ],
      providers: [
        { provide: LoginService, useValue: loginServiceMock },
        { provide: NavigationService, useValue: navigationServiceMock },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    navigationServiceMock.isOnPage.calls.reset();
    loginServiceMock.isLoggedIn.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#loggedIn', () => {
    it('should return login status', () => {
      const loggedIn = true;
      loginServiceMock.isLoggedIn.and.returnValue(loggedIn);

      expect(component.loggedIn).toBe(loggedIn);
      expect(loginServiceMock.isLoggedIn).toHaveBeenCalledWith();
    });
  });

  describe('#loginShown', () => {
    it('should be truthy if user not logged in and page is different from Login', () => {
      loginServiceMock.isLoggedIn.and.returnValue(false);
      navigationServiceMock.isOnPage.and.returnValue(false);

      expect(component.loginShown).toBeTruthy();
    });

    it('should be falsy if user logged in', () => {
      loginServiceMock.isLoggedIn.and.returnValue(true);
      expect(component.loginShown).toBeFalsy();
    });

    it('should be falsy if user is on Login page', () => {
      loginServiceMock.isLoggedIn.and.returnValue(false);
      navigationServiceMock.isOnPage.and.returnValue(true);

      expect(component.loginShown).toBeFalsy();
    });

    it('should check current page if user is not logged in', () => {
      loginServiceMock.isLoggedIn.and.returnValue(false);
      // @ts-ignore
      const loginShown = component.loginShown;

      expect(navigationServiceMock.isOnPage).toHaveBeenCalledWith(NavigationService.pages.login);
    });
  });
});
