import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbsComponent } from './breadcrumbs.component';
import { LoginService } from '../login/login.service';

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;
  let loginServiceMock: jasmine.SpyObj<LoginService>;

  beforeEach(async(() => {
    loginServiceMock = jasmine.createSpyObj('loginService', ['isLoggedIn']);

    TestBed.configureTestingModule({
      declarations: [ BreadcrumbsComponent ],
      providers: [
        { provide: LoginService, useValue: loginServiceMock },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#loggedIn', () => {
    it('should return value from service', () => {
      const loggedIn = true;
      loginServiceMock.isLoggedIn.and.returnValue(loggedIn);

      expect(component.loggedIn).toBe(loggedIn);
      expect(loginServiceMock.isLoggedIn).toHaveBeenCalledWith();
    });
  });
});
