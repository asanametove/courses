import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[coursesDateHighlight]',
})

export class CoursesHighlightDirective implements OnInit {
  @Input('coursesDateHighlight') creationDate: Date;

  constructor(
    private el: ElementRef,
  ) {}

  private static getDateOnly(date: Date): Date {
    return new Date(date.toDateString());
  }

  ngOnInit() {
    const {style} = this.el.nativeElement;
    this.creationDate = CoursesHighlightDirective.getDateOnly(this.creationDate);

    if (this.isFuture()) {
      style.borderColor = 'blue';
    } else if (this.isFresh()) {
      style.borderColor = 'green';
    }
  }

  private isFuture(): boolean {
    const currentDate = new Date();
    return this.creationDate > currentDate;
  }

  private isFresh(): boolean {
    const currentDate = CoursesHighlightDirective.getDateOnly(new Date());
    let oldCourseDate = new Date();
    oldCourseDate.setDate(oldCourseDate.getDate() - 14);
    oldCourseDate = CoursesHighlightDirective.getDateOnly(oldCourseDate);

    return this.creationDate < currentDate
      && this.creationDate >= oldCourseDate;
  }
}
