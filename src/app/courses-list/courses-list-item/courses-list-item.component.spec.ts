import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesListItemComponent } from './courses-list-item.component';
import { Component } from '@angular/core';
import { Course } from '@shared/course';
import { MockDirective, MockComponent } from 'ng-mocks';
import { CoursesHighlightDirective } from '../courses-highlight.directive';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

describe('CoursesListItemComponent', () => {
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

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
