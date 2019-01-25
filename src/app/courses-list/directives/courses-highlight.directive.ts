import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[coursesDateHighlight]',
})

export class CoursesHighlightDirective implements OnInit {
  @Input('coursesDateHighlight') creationDate: Date;
  className: string;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
    const className = this.getClassName();
    if (className) {
      this.renderer.addClass(this.el.nativeElement, className);
    }
  }

  private getDateOnly(date: Date): Date {
    return new Date(date.toDateString());
  }

  private getClassName(): string | void {
    this.creationDate = this.getDateOnly(this.creationDate);

    if (this.isFuture()) {
      return 'border-primary';
    } else if (this.isFresh()) {
      return 'border-success';
    }
  }

  private isFuture(): boolean {
    const currentDate = new Date();
    return this.creationDate > currentDate;
  }

  private isFresh(): boolean {
    const currentDate = this.getDateOnly(new Date());
    let oldCourseDate = new Date();
    oldCourseDate.setDate(oldCourseDate.getDate() - 14);
    oldCourseDate = this.getDateOnly(oldCourseDate);

    return this.creationDate < currentDate
      && this.creationDate >= oldCourseDate;
  }
}
