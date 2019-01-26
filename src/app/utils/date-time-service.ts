import { Injectable } from '@angular/core';

@Injectable()
export class DateTimeService {

  public getDateOnly(date: Date): Date {
    return new Date(date.toDateString());
  }

  public isFutureDate(date: Date): boolean {
    return this.getDateOnly(date) > this.getDateOnly(new Date);
  }

  public isDateInRange(date: Date, beforeCount: number, afterCount: number, startingPoint = new Date()): boolean {
    const earliest = this.getShiftedDate(startingPoint, -beforeCount);
    const latest = this.getShiftedDate(startingPoint, afterCount);
    date = this.getDateOnly(date);

    return date > earliest && date < latest;
  }

  private getShiftedDate(date: Date, shift: number): Date {
    const shiftedDate = new Date(date);
    shiftedDate.setDate(shiftedDate.getDate() + shift);
    return this.getDateOnly(shiftedDate);
  }
}
