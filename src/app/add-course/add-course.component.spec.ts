import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseComponent } from './add-course.component';
import { FormsModule } from '@angular/forms';
import { CoursesService } from '../courses-list/courses-list-item/courses.service';
import { NavigationService } from '../core/navigation/navigation.service';
import { RouteName } from '@shared/route-name';

describe('AddCourseComponent', () => {
  let component: AddCourseComponent;
  let fixture: ComponentFixture<AddCourseComponent>;

  let coursesServiceMock: {
    createCourse: jasmine.Spy,
  };

  let navigationServiceMock: {
    navigateByUrl: jasmine.Spy,
  };

  beforeEach(async(() => {
    coursesServiceMock = jasmine.createSpyObj('CoursesService', ['createCourse']);
    navigationServiceMock = jasmine.createSpyObj('NavigationService', ['navigateByUrl']);

    TestBed.configureTestingModule({
      declarations: [ AddCourseComponent ],
      imports: [ FormsModule ],
      providers: [
        { provide: CoursesService, useValue: coursesServiceMock },
        { provide: NavigationService, useValue: navigationServiceMock },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#onSave', () => {
    it('should create course', () => {
      const title = 'title';
      const description = 'description';
      const duration = 1;
      const date = '1995-12-17';
      Object.assign(component, { title, duration, description, date });

      component.onSave();

      expect(coursesServiceMock.createCourse).toHaveBeenCalledWith(title, duration, description, new Date(date));
    });

    it('should navigate to courses', () => {
      component.onSave();
      expect(navigationServiceMock.navigateByUrl).toHaveBeenCalledWith(RouteName.Courses);
    });
  });

  describe('#onCancel', () => {
    it('should navigate to root', () => {
      component.onCancel();
      expect(navigationServiceMock.navigateByUrl).toHaveBeenCalledWith(RouteName.Root);
    });
  });
});
