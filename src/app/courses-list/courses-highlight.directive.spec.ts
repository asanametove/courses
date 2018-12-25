import { CoursesHighlightDirective } from './courses-highlight.directive';
import { ElementRef, Renderer2 } from '@angular/core';

describe('DateHighlightDirective', () => {
  const nativeElement = 'nativeElement';
  let directive: CoursesHighlightDirective;
  let renderer: Renderer2;

  beforeEach(() => {
    renderer = jasmine.createSpyObj('renderer2Mock', [
      'destroy',
      'createElement',
      'createComment',
      'createText',
      'destroyNode',
      'appendChild',
      'insertBefore',
      'removeChild',
      'selectRootElement',
      'parentNode',
      'nextSibling',
      'setAttribute',
      'removeAttribute',
      'addClass',
      'removeClass',
      'setStyle',
      'removeStyle',
      'setProperty',
      'setValue',
      'listen',
    ]);
    directive = new CoursesHighlightDirective(
      new ElementRef(nativeElement),
      renderer,
    );

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

      expect(renderer.addClass).toHaveBeenCalledWith(nativeElement, 'border-primary');
    });

    it('should set border color to GREEN if creation date and current date diff not greater than 14', () => {
      directive.creationDate = new Date(2000, 1, 6);
      directive.ngOnInit();

      expect(renderer.addClass).toHaveBeenCalledWith(nativeElement, 'border-success');
    });

    it('should not set border color if creation date and current date diff greater than 14', () => {
      directive.creationDate = new Date(2000, 1, 5);
      directive.ngOnInit();

      expect(renderer.addClass).not.toHaveBeenCalled();
    });

    it('should not set border color for the same creation and current date ', () => {
      directive.creationDate = new Date(2000, 1, 20);
      directive.ngOnInit();

      expect(renderer.addClass).not.toHaveBeenCalled();
    });

    it('should make calculations based only on date', () => {
      directive.creationDate = new Date(2000, 1, 1, 1);
      directive.ngOnInit();

      expect(renderer.addClass).not.toHaveBeenCalled();
    });
  });
});
