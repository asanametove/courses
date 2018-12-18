import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockComponent } from 'ng-mocks';

import { CoursesListComponent } from './courses-list.component';
import { CoursesListItemComponent } from './courses-list-item/courses-list-item.component';
import { ToolboxComponent } from '../toolbox/toolbox.component';

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CoursesListComponent,
        MockComponent(CoursesListItemComponent),
        MockComponent(ToolboxComponent),
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create list item component for each course', () => {
    const items = fixture.nativeElement.querySelectorAll('courses-list-item');
    expect(items).toBeTruthy();
  });

  describe('#loadMore', () => {
    const getLoadMoreButton = () => fixture.debugElement.query(By.css('button'));
    const getCoursesList = () => fixture.nativeElement.querySelectorAll('courses-list-item');

    it('should show button if more courses available', () => {
      expect(getLoadMoreButton()).toBeTruthy();
    });

    it('should load more courses if they are available', () => {
      const oldList = getCoursesList();

      getLoadMoreButton().triggerEventHandler('click', null);
      fixture.detectChanges();
      const newList = getCoursesList();

      expect(oldList.length).toBeLessThan(newList.length);
    });

    it('should hide button if more courses does not available', () => {
      getLoadMoreButton().triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(getLoadMoreButton()).toBeFalsy();
    });
  });

  describe('#onDelete', () => {
    it('should delete course with provided id', () => {
      const [, course] = component.courses;
      component.onDelete(course.id);
      expect(component.courses).not.toContain(course);
    });
  });
});
