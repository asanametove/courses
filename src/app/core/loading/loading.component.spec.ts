import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { LoadingComponent } from './loading.component';
import { LoadingService } from './loading.service';


describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  beforeEach(async(() => {
    const loadingService = {
      state$: of(false),
    };

    TestBed.configureTestingModule({
      declarations: [ LoadingComponent ],
      providers: [
        { provide: LoadingService, useValue: loadingService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#isSpinnerShown$ should return actual spinner state', () => {
    component.isSpinnerShown$.subscribe((state) => {
      expect(state).toBe(false);
    });
  });
});
