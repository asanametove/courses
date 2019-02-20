import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { HeaderComponent } from './header.component';
import { LoginService } from '../login/login.service';
import { NavigationService } from '../navigation/navigation.service';
import { RouteName } from '@shared/route-name';
import { User } from '@shared/user';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let loginService: jasmine.SpyObj<LoginService>;
  let navigationService: jasmine.SpyObj<NavigationService>;

  beforeEach(async(() => {
    loginService = jasmine.createSpyObj('loginService', ['isLoggedIn']);
    loginService.userInfo$ = new Subject<User>() as any;
    navigationService = jasmine.createSpyObj('navigationService', ['isOnPage']);

    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
      ],
      providers: [
        { provide: LoginService, useValue: loginService },
        { provide: NavigationService, useValue: navigationService },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    navigationService.isOnPage.calls.reset();
    loginService.isLoggedIn.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should track user info changes', () => {
      const user = {} as User;
      loginService.userInfo$.next(user);
      expect(component.user).toBe(user);
    });
  });

  describe('#loggedIn', () => {
    it('should return login status', () => {
      const loggedIn = true;
      loginService.isLoggedIn.and.returnValue(loggedIn);

      expect(component.loggedIn).toBe(loggedIn);
      expect(loginService.isLoggedIn).toHaveBeenCalledWith();
    });
  });

  describe('#loginShown', () => {
    it('should be truthy if user not logged in and page is different from Login', () => {
      loginService.isLoggedIn.and.returnValue(false);
      navigationService.isOnPage.and.returnValue(false);

      expect(component.loginShown).toBeTruthy();
    });

    it('should be falsy if user logged in', () => {
      loginService.isLoggedIn.and.returnValue(true);
      expect(component.loginShown).toBeFalsy();
    });

    it('should be falsy if user is on Login page', () => {
      loginService.isLoggedIn.and.returnValue(false);
      navigationService.isOnPage.and.returnValue(true);

      expect(component.loginShown).toBeFalsy();
    });

    it('should check current page if user is not logged in', () => {
      loginService.isLoggedIn.and.returnValue(false);
      // @ts-ignore
      const loginShown = component.loginShown;

      expect(navigationService.isOnPage).toHaveBeenCalledWith(RouteName.Login);
    });
  });
});
