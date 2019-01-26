import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { DateTimeService } from 'src/app/utils/date-time-service';

@Directive({
  selector: '[coursesDateHighlight]',
})

export class CoursesHighlightDirective implements OnInit {
  @Input('coursesDateHighlight') creationDate: Date;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private dateTimeService: DateTimeService,
  ) {}

  ngOnInit() {
    const className = this.getClassName();
    if (className) {
      this.renderer.addClass(this.el.nativeElement, className);
    }
  }

  private getClassName(): string | void {
    this.creationDate = this.dateTimeService.getDateOnly(this.creationDate);

    if (this.dateTimeService.isFutureDate(this.creationDate)) {
      return 'border-primary';
    } else if (this.dateTimeService.isDateInRange(this.creationDate, 15, 0)) {
      return 'border-success';
    }
  }
}
