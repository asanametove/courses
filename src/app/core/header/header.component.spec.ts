import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject, of, Observable } from 'rxjs';
import { HeaderComponent } from './header.component';
import { LoginService } from '../login/login.service';
import { NavigationService } from '../navigation/navigation.service';
import { RouteName } from '@shared/route-name';
import { User } from '@shared/user';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let navigationService: jasmine.SpyObj<NavigationService>;
  const loginService: {
    isLoggedIn$: Observable<boolean>,
  } = {} as any;

  beforeEach(async(() => {
    navigationService = jasmine.createSpyObj('navigationService', ['isOnPage']);
    loginService.isLoggedIn$ = of(false);

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#loggedIn', () => {
    it('should return observable login status', () => {
      const loggedIn = {};
      loginService.isLoggedIn$ = {} as any;

      expect(component.loggedIn).toBe(loggedIn);
    });
  });

  describe('#loginShown', () => {
    it('should be truthy if user not logged in and page is different from Login', () => {
      loginService.isLoggedIn$ = of(false);
      navigationService.isOnPage.and.returnValue(false);

      expect(component.loginShown).toBeTruthy();
    });

    it('should be falsy if user logged in', () => {
      loginService.isLoggedIn$ = of(true);
      expect(component.loginShown).toBeFalsy();
    });

    it('should be falsy if user is on Login page', () => {
      loginService.isLoggedIn$ = of(false);
      navigationService.isOnPage.and.returnValue(true);

      expect(component.loginShown).toBeFalsy();
    });

    it('should check current page if user is not logged in', () => {
      loginService.isLoggedIn$ = of(false);
      // @ts-ignore
      const loginShown = component.loginShown;

      expect(navigationService.isOnPage).toHaveBeenCalledWith(RouteName.Login);
    });
  });
});
