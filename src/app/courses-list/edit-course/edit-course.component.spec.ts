import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditCourseComponent } from './edit-course.component';
import { MockComponent } from 'ng-mocks';
import { EditCourseFormComponent } from '../edit-course-form/edit-course-form.component';
import { CoursesService } from '@core/courses/courses.service';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '@core/navigation/navigation.service';
import { Course } from '@shared/course';
import { RouteName } from '@shared/route-name';

describe('EditCourseComponent', () => {
  let component: EditCourseComponent;
  let fixture: ComponentFixture<EditCourseComponent>;
  let coursesService: jasmine.SpyObj<CoursesService>;
  let navigationService: jasmine.SpyObj<NavigationService>;

  const id = 1;
  const course = {} as Course;
  const route = {
    snapshot: {
      params: {
        id,
      },
    },
  };

  beforeEach(async(() => {
    coursesService = mockService(CoursesService);
    navigationService = mockService(NavigationService);

    coursesService.getCourseById.and.returnValue(course);

    TestBed.configureTestingModule({
      declarations: [
        EditCourseComponent,
        MockComponent(EditCourseFormComponent),
      ],
      providers: [
        { provide: CoursesService, useValue: coursesService},
        { provide: ActivatedRoute, useValue: route},
        { provide: NavigationService, useValue: navigationService},
      ],
    })
    .compileComponents();
  }));

  function createComponent() {
    fixture = TestBed.createComponent(EditCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  beforeEach(createComponent);

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get and save current course', () => {
    expect(component.course).toBe(course);
    expect(coursesService.getCourseById).toHaveBeenCalledWith(id);
  });

  describe('#onSave', () => {
    it('should update course', () => {
      const update = {
        title: 'title',
      };
      coursesService.getCourseById.and.returnValue({ id });
      createComponent();

      component.onSave(update);
      expect(coursesService.updateCourse).toHaveBeenCalledWith(id, update);
    });

    it('should navigate to courses page', () => {
      component.onSave({});
      expect(navigationService.navigateByUrl).toHaveBeenCalledWith(RouteName.Courses);
    });
  });

  describe('#onCancel', () => {
    it('should navigate to courses page', () => {
      component.onCancel();
      expect(navigationService.navigateByUrl).toHaveBeenCalledWith(RouteName.Courses);
    });
  });
});

function mockService(service: Function): jasmine.SpyObj<any> {
  const methods = Object.getOwnPropertyNames(service.prototype)
    .filter((propName) => service.prototype[propName] instanceof Function && propName !== 'constructor');

  return jasmine.createSpyObj(service.name, methods);
}
