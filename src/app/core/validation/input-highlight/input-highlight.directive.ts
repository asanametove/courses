import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[coursesInputHighlight]',
})
export class InputHighlightDirective implements OnInit {
  private readonly validClass = 'is-valid';
  private readonly invalidClass = 'is-invalid';

  constructor(
    private control: NgControl,
    private element: ElementRef,
    private renderer: Renderer2,
  ) { }

  ngOnInit(): void {
    const { nativeElement } = this.element;
    this.control.valueChanges.subscribe(() => {
      // TODO Can do this only on validity toggle
      this.renderer.addClass(nativeElement, this.classToAdd);
      this.renderer.removeClass(nativeElement, this.classToRemove);
    });
  }

  private get classToAdd(): string {
    return this.control.valid ? this.validClass : this.invalidClass;
  }

  private get classToRemove(): string {
    return this.control.valid ? this.invalidClass : this.validClass;
  }

}
