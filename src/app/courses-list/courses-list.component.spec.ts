import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockComponent } from 'ng-mocks';

import { CoursesListComponent } from './courses-list.component';
import { CoursesListItemComponent } from './courses-list-item/courses-list-item.component';
import { ToolboxComponent } from '../toolbox/toolbox.component';
import { FilterPipe } from './pipes/filter.pipe';
import { Pipe, PipeTransform } from '@angular/core';
import { CoursesService } from './courses-list-item/courses.service';
import { Course } from '@shared/course';

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;
  let coursesServiceMock: jasmine.SpyObj<CoursesService>;
  let courses: Course[];

  @Pipe({
    name: 'orderByDate',
  })
  class OrderByDatePipeMock implements PipeTransform {
    transform(list) {
      return list;
    }
  }

  beforeEach(async(() => {
    courses = [
      new Course('Title 1', 123, 'description1', new Date(2018, 11, 22)),
      new Course('Title 2', 3, 'description2', undefined, undefined, true),
      new Course('Title 3', 3, 'description3', new Date(2018, 11, 11)),
      new Course('Title 4', 3, 'description4'),
    ];

    coursesServiceMock = jasmine.createSpyObj('CoursesService', ['getCourses', 'removeCourse']);
    coursesServiceMock.getCourses.and.returnValue(courses);

    TestBed.configureTestingModule({
      declarations: [
        CoursesListComponent,
        MockComponent(CoursesListItemComponent),
        MockComponent(ToolboxComponent),
        OrderByDatePipeMock,
      ],
      providers: [
        { provide: FilterPipe, useValue: { transform: arg => arg } },
        { provide: CoursesService, useValue: coursesServiceMock },
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

  describe('#ngOnInit', () => {
    it('should load courses using service', () => {
      component.ngOnInit();
      expect(coursesServiceMock.getCourses).toHaveBeenCalledWith();
    });

    it('should save loaded courses', () => {
      component.ngOnInit();
      expect(courses).toEqual(jasmine.arrayContaining(component.courses));
    });
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
    let course: Course;

    beforeEach(() => {
      [, course] = component.courses;
      coursesServiceMock.getCourses.calls.reset();
    });

    describe('if confirmed', () => {
      beforeEach(() => {
        spyOn(window, 'confirm').and.returnValue(true);
      });

      it('should delete course with provided id', () => {
        component.onDelete(course.id);
        expect(coursesServiceMock.removeCourse).toHaveBeenCalledWith(course.id);
      });

      it('should load courses', () => {
        component.onDelete(course.id);
        expect(coursesServiceMock.getCourses).toHaveBeenCalledWith();
      });
    });

    describe('if declined', () => {
      beforeEach(() => {
        spyOn(window, 'confirm').and.returnValue(false);
      });

      it('should not delete course with provided id', () => {
        component.onDelete(course.id);
        expect(coursesServiceMock.removeCourse).not.toHaveBeenCalled();
      });

      it('should not load courses', () => {
        component.onDelete(course.id);
        expect(coursesServiceMock.getCourses).not.toHaveBeenCalled();
      });
    });
  });
});
