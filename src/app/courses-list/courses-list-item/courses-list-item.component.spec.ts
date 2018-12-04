import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesListItemComponent } from './courses-list-item.component';

describe('CoursesListItemComponent', () => {
  let component: CoursesListItemComponent;
  let fixture: ComponentFixture<CoursesListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesListItemComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListItemComponent);
    component = fixture.componentInstance;
    component.course = {
      id: '1',
      title: 'Title 1',
      creationDate: new Date(),
      duration: 31,
      description: 'description3',
    },
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
