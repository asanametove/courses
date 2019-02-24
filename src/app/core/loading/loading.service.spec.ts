import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    service = new LoadingService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#show should change state to true', () => {
    service.show();
    service.state$.subscribe((state) => {
      expect(state).toBe(true);
    });
  });

  it('#hide should change state to false', () => {
    service.hide();
    service.state$.subscribe((state) => {
      expect(state).toBe(false);
    });
  });
});
