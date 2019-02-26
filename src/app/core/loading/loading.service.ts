import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoadingService {
  private _state$ = new BehaviorSubject<boolean>(null);
  public state$ = this._state$.asObservable();

  constructor() {}

  /**
   * shows global spinner
   */
  public show(): void {
    this._state$.next(true);
  }

  /**
   * hides global spinner
   */
  public hide(): void {
    this._state$.next(false);
  }
}
