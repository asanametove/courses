import { Component, OnInit } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  selector: 'courses-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {

  constructor(
    private loadingService: LoadingService,
  ) {}

  public get isSpinnerShown() {
    return this.loadingService.state$;
  }

}
