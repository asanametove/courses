import { NavigationService } from './navigation.service';

describe('NavigationService', () => {
  let service: NavigationService;
  let routerMock: any;

  beforeEach(() => {
    routerMock = {
      url: '/',
      navigateByUrl: jasmine.createSpy('Router#navigateByUrl'),
    };

    service = new NavigationService(routerMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#isOnPage', () => {
    it('should be truthy if current page provided', () => {
      routerMock.url = NavigationService.routes.root;
      expect(service.isOnPage(NavigationService.pages.root)).toBeTruthy();
    });

    it('should be falsy if another page provided', () => {
      routerMock.url = NavigationService.routes.login;
      expect(service.isOnPage(NavigationService.pages.root)).toBeFalsy();
    });
  });

  describe('#navigateByUrl', () => {
    it('should navigate to provided page', () => {
      const { login } = NavigationService.pages;
      service.navigateByUrl(login);
      expect(routerMock.navigateByUrl).toHaveBeenCalledWith(NavigationService.routes[login]);
    });
  });
});
