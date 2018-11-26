import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesListComponent } from './courses-list.component';
import { CoursesListItemComponent } from '../courses-list-item/courses-list-item.component';

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CoursesListComponent,
        CoursesListItemComponent,
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

  it('should define courses raw data', () => {
    expect(component.rawData).toBeDefined();
    expect(component.rawData.length).toBeTruthy();
  });

  it('should return only first part of courses', () => {
    expect(component.courses.length).not.toBe(component.rawData.length);
    expect(component.rawData).toEqual(jasmine.arrayContaining(component.courses));
  });

  describe('#loadMore', () => {
    it('should load more courses if they are available', () => {
      const oldCount = component.itemsCount;
      component.loadMore();
      const newCount = component.itemsCount;
      expect(oldCount < newCount).toBe(true);
    });

    it('should not load more courses if they are not available', () => {
      component.itemsCount = component.rawData.length;
      const oldCount = component.itemsCount;
      component.loadMore();
      const newCount = component.itemsCount;
      expect(oldCount).toBe(newCount);
    });
  });

  describe('#isMoreAvailable', () => {
    it('should be true if more courses can be loaded', () => {
      component.itemsCount = component.rawData.length - 1;
      expect(component.isMoreAvailable()).toBe(true);
    });

    it('should be false if more courses can not be loaded', () => {
      component.itemsCount = component.rawData.length + 1;
      expect(component.isMoreAvailable()).toBe(false);
    });
  });
});
