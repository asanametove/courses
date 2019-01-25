import { NavigationService } from './navigation.service';
import { RouteName } from '@shared/route-name';

describe('NavigationService', () => {
  let service: NavigationService;
  let routerMock: any;

  beforeEach(() => {
    routerMock = {
      url: RouteName.Login,
      navigateByUrl: jasmine.createSpy('Router#navigateByUrl'),
    };

    service = new NavigationService(routerMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#isOnPage', () => {
    it('should be truthy if current page provided', () => {
      expect(service.isOnPage(RouteName.Login)).toBeTruthy();
    });

    it('should be falsy if another page provided', () => {
      expect(service.isOnPage(RouteName.Courses)).toBeFalsy();
    });
  });

  describe('#navigateByUrl', () => {
    it('should navigate to provided page', () => {
      service.navigateByUrl(RouteName.Login);
      expect(routerMock.navigateByUrl).toHaveBeenCalledWith(RouteName.Login);
    });
  });
});
