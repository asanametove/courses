import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';
import { MockComponent } from 'ng-mocks';

import { Course } from '@shared/course';
import { CoursesListComponent } from './courses-list.component';
import { CoursesListItemComponent } from './courses-list-item/courses-list-item.component';
import { ToolboxComponent } from '../toolbox/toolbox.component';
import { FilterPipe } from './pipes/filter.pipe';
import { CoursesService } from '../core/courses/courses.service';
import { of } from 'rxjs';

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;
  let coursesService: jasmine.SpyObj<CoursesService>;
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

    coursesService = jasmine.createSpyObj('CoursesService', ['getCourses', 'removeCourse']);
    coursesService.getCourses.and.returnValue(of(courses));

    TestBed.configureTestingModule({
      declarations: [
        CoursesListComponent,
        MockComponent(CoursesListItemComponent),
        MockComponent(ToolboxComponent),
        OrderByDatePipeMock,
      ],
      providers: [
        { provide: FilterPipe, useValue: { transform: arg => arg } },
        { provide: CoursesService, useValue: coursesService },
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
      expect(coursesService.getCourses).toHaveBeenCalledWith({
        start: 0,
        count: 5,
      });
    });

    it('should save loaded courses', () => {
      component.ngOnInit();
      expect(courses).toEqual(jasmine.arrayContaining(component.courses));
    });
  });

  describe('#loadCourses', () => {
    const getLoadCoursesButton = () => fixture.debugElement.query(By.css('button'));
    const getCoursesList = () => fixture.nativeElement.querySelectorAll('courses-list-item');

    // TODO to tests it correctly we need to get rid of hardcoded chunk size
    xit('should show button if more courses available', () => {
      expect(getLoadCoursesButton()).toBeTruthy();
    });

    xit('should load more courses if they are available', () => {
      const oldList = getCoursesList();

      getLoadCoursesButton().triggerEventHandler('click', null);
      fixture.detectChanges();
      const newList = getCoursesList();

      expect(oldList.length).toBeLessThan(newList.length);
    });

    xit('should hide button if more courses does not available', () => {
      getLoadCoursesButton().triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(getLoadCoursesButton()).toBeFalsy();
    });
  });

  describe('#onDelete', () => {
    let course: Course;

    beforeEach(() => {
      [, course] = component.courses;
      coursesService.getCourses.calls.reset();
      coursesService.removeCourse.and.returnValue(of({}));
    });

    describe('if confirmed', () => {
      beforeEach(() => {
        spyOn(window, 'confirm').and.returnValue(true);
      });

      it('should delete course with provided id', () => {
        component.onDelete(course.id);
        expect(coursesService.removeCourse).toHaveBeenCalledWith(course.id);
      });

      it('should load courses', () => {
        coursesService.getCourses.calls.reset();
        component.onDelete(course.id);
        expect(coursesService.getCourses).toHaveBeenCalled();
      });
    });

    describe('if declined', () => {
      beforeEach(() => {
        spyOn(window, 'confirm').and.returnValue(false);
      });

      it('should not delete course with provided id', () => {
        component.onDelete(course.id);
        expect(coursesService.removeCourse).not.toHaveBeenCalled();
      });

      it('should not load courses', () => {
        component.onDelete(course.id);
        expect(coursesService.getCourses).not.toHaveBeenCalled();
      });
    });
  });

  describe('#onSearch', () => {
    beforeEach(() => {
      coursesService.getCourses.calls.reset();
    });

    it('should load courses on query change', fakeAsync(() => {
      component.onSearch('aaa');
      tick(1000);
      expect(coursesService.getCourses).toHaveBeenCalled();
    }));

    it('should not load courses if there is not enough symbols', fakeAsync(() => {
      component.onSearch('a');
      tick(1000);
      expect(coursesService.getCourses).not.toHaveBeenCalled();
    }));

    it('should load courses with debounce', fakeAsync(() => {
      component.onSearch('aaa');
      tick(500);
      expect(coursesService.getCourses).not.toHaveBeenCalled();
      tick(500);
    }));
  });
});
