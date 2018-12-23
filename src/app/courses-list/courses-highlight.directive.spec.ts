import { CoursesHighlightDirective } from './courses-highlight.directive';
import { ElementRef } from '@angular/core';

describe('DateHighlightDirective', () => {
  let directive: CoursesHighlightDirective;
  let element: ElementRef;
  let style: {borderColor?: string};

  beforeEach(() => {
    style = {};
    element = new ElementRef({style});
    directive = new CoursesHighlightDirective(element);

    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(2000, 1, 20));
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should set border color to BLUE if future date', () => {
      directive.creationDate = new Date(2000, 2, 1);
      directive.ngOnInit();

      expect(style.borderColor).toBe('blue');
    });

    it('should set border color to GREEN if creation date and current date diff not greater than 14', () => {
      directive.creationDate = new Date(2000, 1, 6);
      directive.ngOnInit();

      expect(style.borderColor).toBe('green');
    });

    it('should not set border color if creation date and current date diff greater than 14', () => {
      directive.creationDate = new Date(2000, 1, 5);
      directive.ngOnInit();

      expect(style.borderColor).toBeUndefined();
    });

    it('should not set border color for the same creation and current date ', () => {
      directive.creationDate = new Date(2000, 1, 20);
      directive.ngOnInit();

      expect(style.borderColor).toBeUndefined();
    });

    it('should make calculations based only on date', () => {
      directive.creationDate = new Date(2000, 1, 1, 1);
      directive.ngOnInit();

      expect(style.borderColor).toBeUndefined();
    });
  });
});
