import { Component } from '@angular/core';
import { Breadcrumb } from '../../shared/breadcrumb';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
})
export class BreadcrumbsComponent {
  crumbs: Breadcrumb[];

  constructor() {
    this.crumbs = [
      new Breadcrumb('Fake', '#'),
      new Breadcrumb('Courses', '#'),
      new Breadcrumb('Breadcrumbs', '#'),
    ];
  }
}
