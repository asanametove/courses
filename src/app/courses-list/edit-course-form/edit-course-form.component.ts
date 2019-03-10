import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CourseUpdateInfo, Course } from '@shared/course';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateTimeService } from 'src/app/utils/date-time-service';
import { Author } from '@shared/common.interfaces';
import { AuthorsService } from '@core/authors.service';

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
  public authorsToAdd: Author[];
  public initialized: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private dateTimeService: DateTimeService,
    private authorsService: AuthorsService,
  ) {}

  get controls() { return this.courseForm.controls; }
  get title() { return this.controls.title; }
  get duration() { return this.controls.duration; }
  get description() { return this.controls.description; }
  get date() { return this.controls.date; }
  get authors() { return this.controls.authors; }

  ngOnInit() {
    // TODO maybe route resolver will be better here
    this.authorsService.getAuthors().subscribe(
      (authors: Author[]) => {
        this.authorsToAdd = authors;
        this.initialized = true;
      },
      (err) => console.error(err),
    );

    this.createForm();
  }

  onSave(): void {
    const course = new Course(this.courseForm.value);
    this.save.emit(course);
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
    } = this.course || new Course();

    this.courseForm = this.formBuilder.group({
      title: [ title, [Validators.required, Validators.maxLength(50)] ],
      description: [ description, [ Validators.required, Validators.maxLength(500)] ],
      date: [ this.dateTimeService.dateToString(creationDate), [ Validators.required] ],
      duration: [ duration, [ Validators.required] ],
      authors: [ authors, [ Validators.required] ],
    });
  }

}
