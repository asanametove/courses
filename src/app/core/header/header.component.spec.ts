import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject, of, Observable, BehaviorSubject } from 'rxjs';
import { HeaderComponent } from './header.component';
import { LoginService } from '../login/login.service';
import { NavigationService } from '../navigation/navigation.service';
import { RouteName } from '@shared/route-name';
import { User } from '@shared/user';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let navigationService: jasmine.SpyObj<NavigationService>;
  let loginService: {
    isLoggedIn$: Observable<boolean>,
    userInfo$: Observable<User>,
  };
  let isLoggedIn$: BehaviorSubject<boolean>;

  const firstName = 'firstName';
  const lastName = 'lastName';

  beforeEach(async(() => {
    navigationService = jasmine.createSpyObj('navigationService', ['isOnPage']);
    loginService = {
      isLoggedIn$: isLoggedIn$ = new BehaviorSubject(false),
      userInfo$: of(new User(firstName, lastName)),
    };

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
    it('should return observable login status', (done) => {
      component.isLoggedIn$.subscribe((isLoggedIn) => {
        expect(isLoggedIn).toBe(false);
        done();
      });
    });
  });

  describe('#isLoginShown$', () => {
    it('should be truthy if user not logged in and page is different from Login', (done) => {
      navigationService.isOnPage.and.returnValue(false);

      component.isLoginShown$.subscribe((isLoginShown) => {
        expect(isLoginShown).toBe(true);
        done();
      });
    });

    it('should be falsy if user logged in', (done) => {
      isLoggedIn$.next(true);
      component.isLoginShown$.subscribe((isLoginShown) => {
        expect(isLoginShown).toBe(false);
        done();
      });
    });

    it('should be falsy if user is on Login page', (done) => {
      navigationService.isOnPage.and.returnValue(true);

      component.isLoginShown$.subscribe((isLoginShown) => {
        expect(isLoginShown).toBe(false);
        done();
      });
    });

    it('should check current page if user is not logged in', (done) => {
      component.isLoginShown$.subscribe(() => {
        expect(navigationService.isOnPage).toHaveBeenCalledWith(RouteName.Login);
        done();
      });
    });
  });
});
