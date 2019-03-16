import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudTagsInputComponent } from './cloud-tags-input.component';

describe('CloudTagsInputComponent', () => {
  let component: CloudTagsInputComponent;
  let fixture: ComponentFixture<CloudTagsInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloudTagsInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloudTagsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
