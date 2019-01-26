import { CoursesHighlightDirective } from './courses-highlight.directive';
import { ElementRef, Renderer2 } from '@angular/core';
import { DateTimeService } from 'src/app/utils/date-time-service';

describe('CoursesHighlightDirective', () => {
  const nativeElement = 'nativeElement';
  let directive: CoursesHighlightDirective;
  let renderer: Renderer2;
  let dateTimeServiceMock: jasmine.SpyObj<DateTimeService>;

  beforeEach(() => {
    renderer = jasmine.createSpyObj('renderer2Mock', ['addClass']);
    dateTimeServiceMock = jasmine.createSpyObj('dateTimeServiceMock', [
      'getDateOnly',
      'isFutureDate',
      'isDateInRange',
    ]);

    directive = new CoursesHighlightDirective(
      new ElementRef(nativeElement),
      renderer,
      dateTimeServiceMock,
    );
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    const creationDate = {} as Date;

    beforeEach(() => {
      dateTimeServiceMock.getDateOnly.and.returnValue(creationDate);
      dateTimeServiceMock.isFutureDate.and.returnValue(false);
      dateTimeServiceMock.isDateInRange.and.returnValue(false);
    });

    it('should set border color to BLUE if future date', () => {
      dateTimeServiceMock.isFutureDate.and.returnValue(true);
      directive.ngOnInit();

      expect(renderer.addClass).toHaveBeenCalledWith(nativeElement, 'border-primary');
      expect(dateTimeServiceMock.isFutureDate).toHaveBeenCalledWith(creationDate);
      expect(dateTimeServiceMock.isDateInRange).not.toHaveBeenCalled();
    });

    it('should set border color to GREEN if creation date and current date diff not greater than 14', () => {
      dateTimeServiceMock.isDateInRange.and.returnValue(true);
      directive.ngOnInit();

      expect(renderer.addClass).toHaveBeenCalledWith(nativeElement, 'border-success');
      expect(dateTimeServiceMock.isDateInRange).toHaveBeenCalledWith(creationDate, 15, 0);
    });

    it('should not set border color for another dates', () => {
      directive.ngOnInit();
      expect(renderer.addClass).not.toHaveBeenCalled();
    });

    it('should get only date from input data', () => {
      const originalCreationDate = directive.creationDate = {} as Date;

      directive.ngOnInit();

      expect(dateTimeServiceMock.getDateOnly).toHaveBeenCalledWith(originalCreationDate);
      expect(directive.creationDate).toBe(creationDate);
    });
  });
});
