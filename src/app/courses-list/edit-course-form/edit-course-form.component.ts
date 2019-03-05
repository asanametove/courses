import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CourseUpdateInfo } from '@shared/course';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'courses-edit-course-form',
  templateUrl: './edit-course-form.component.html',
  styleUrls: ['./edit-course-form.component.scss'],
})
export class EditCourseFormComponent implements OnInit {
  @Input() course: CourseUpdateInfo;
  @Output() save = new EventEmitter<CourseUpdateInfo>();
  @Output() cancel = new EventEmitter<void>();
  public courseForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  get controls() { return this.courseForm.controls; }
  get title() { return this.controls.title; }
  get duration() { return this.controls.duration; }
  get description() { return this.controls.description; }
  get date() { return this.controls.date; }
  get authors() { return this.controls.authors; }

  ngOnInit() {
    this.createForm();
  }

  onSave(): void {
    this.save.emit(this.course);
  }

  onCancel(): void {
    this.cancel.emit();
  }

  private createForm(): void {
    const {
      title,
      description,
      creationDate,
      duration,
      authors,
    } = this.course || {} as CourseUpdateInfo;

    this.courseForm = this.formBuilder.group({
      title: [ title, [Validators.required, Validators.maxLength(50)] ],
      description: [ description, [ Validators.required, Validators.maxLength(500)] ],
      date: [ String(creationDate || ''), [ Validators.required] ],
      duration: [ duration, [ Validators.required] ],
      authors: [ authors, [ Validators.required] ],
    });
  }

}
