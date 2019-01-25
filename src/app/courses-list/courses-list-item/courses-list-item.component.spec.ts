import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Pipe, PipeTransform } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { MockPipes } from 'ng-mocks/dist/lib/mock-pipe/mock-pipe';
import { MockDirective, MockComponent } from 'ng-mocks';

import { Course } from '@shared/course';
import { CoursesHighlightDirective } from '../directives/courses-highlight.directive';
import { CoursesListItemComponent } from './courses-list-item.component';
import { OrderByDatePipe } from '../pipes/order-by-date.pipe';

describe('CoursesListItemComponent', () => {
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  @Pipe({
    name: 'duration',
  })
  class DurationPipeMock implements PipeTransform {
    transform() {
      return '1 min';
    }
  }

  @Component({
    template: `
      <courses-list-item
        [course]="course" (deleteCourse)="onDelete($event)">
      </courses-list-item>`,
  })
  class TestHostComponent {
    removedItemId: string;
    course = new Course('title', 1, 'description', new Date(2000, 0), '111');
    onDelete(id: string): void { this.removedItemId = id; }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CoursesListItemComponent,
        TestHostComponent,
        MockDirective(CoursesHighlightDirective),
        MockComponent(FaIconComponent),
        MockPipes(OrderByDatePipe),
        DurationPipeMock,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  const findByInnerText = (tag: string, text: string): HTMLElement | void => [...fixture.nativeElement.querySelectorAll(tag)]
    .find(({textContent}) => textContent === text);

  it('should create', () => {
    expect(hostComponent).toBeTruthy();
  });

  it('should display a title', () => {
    const element: HTMLElement = fixture.nativeElement.querySelector('h5');
    expect(element.textContent).toBe(hostComponent.course.title);
  });

  it('should display a duration', () => {
    const duration = [hostComponent.course.duration, 'min'].join(' ');
    expect(findByInnerText('span', duration)).toBeTruthy();
  });

  it('should display a formatted date', () => {
    const dateString = 'Jan 1, 2000';
    expect(findByInnerText('span', dateString)).toBeTruthy();
  });

  it('should display a description', () => {
    const {description} = hostComponent.course;
    expect(findByInnerText('p', description)).toBeTruthy();
  });

  it('should delete course using provided callback', () => {
    const {id} = hostComponent.course;
    const button = findByInnerText('button', 'Delete');
    if (button) {
      button.click();
    }
    expect(hostComponent.removedItemId).toBe(id);
  });
});
