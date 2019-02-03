import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCourseFormComponent } from './edit-course-form.component';
import { MockModule } from 'ng-mocks';
import { FormsModule } from '@angular/forms';

describe('EditCourseFormComponent', () => {
  let component: EditCourseFormComponent;
  let fixture: ComponentFixture<EditCourseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCourseFormComponent ],
      imports: [
        MockModule(FormsModule),
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCourseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should make copy of course input', () => {
      const course = { title: 'title' };
      component.course = course;

      component.ngOnInit();
      expect(component.course).not.toBe(course);
      expect(component.course).toEqual(course);
    });

    it('should initialize course input if it is not provided', () => {
      component.ngOnInit();
      expect(component.course).toEqual({});
    });
  });

  describe('#onSave', () => {
    it('should save course', () => {
      const course = component.course = { title: 'title' };
      component.save.subscribe((arg) => expect(arg).toBe(course));
      component.onSave();
    });
  });

  describe('#onCancel', () => {
    it('should cancel editing', () => {
      component.cancel.subscribe((arg) => expect(arg).toBeUndefined());
      component.onCancel();
    });
  });
});
