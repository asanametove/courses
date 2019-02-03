import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CourseUpdateInfo } from '@shared/course';

@Component({
  selector: 'courses-edit-course-form',
  templateUrl: './edit-course-form.component.html',
  styleUrls: ['./edit-course-form.component.scss'],
})
export class EditCourseFormComponent implements OnInit {
  @Input() course: CourseUpdateInfo;
  @Output() save = new EventEmitter<CourseUpdateInfo>();
  @Output() cancel = new EventEmitter<void>();

  ngOnInit() {
    this.course = {...(this.course || {})} as CourseUpdateInfo;
  }

  onSave(): void {
    this.save.emit(this.course);
  }

  onCancel(): void {
    this.cancel.emit();
  }

}
