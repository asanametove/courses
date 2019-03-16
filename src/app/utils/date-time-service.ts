import { Injectable } from '@angular/core';
import { InvalidDateFormatError } from '@shared/errors';

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

  public dateToString(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  public stringToDate(date: string): Date {
    const [day, month, year] = this.getSplittedDate(date);
    return new Date(year, month - 1, day);
  }

  public isValidDate(dateString: string): boolean {
    try {
      const [day, month, year] = this.getSplittedDate(dateString);
      const date = this.stringToDate(dateString);

      return date.getDate() === day
        && date.getMonth() === month - 1
        && date.getFullYear() === year;
    } catch (InvalidDateFormatError) {
      return false;
    }
  }

  private getShiftedDate(date: Date, shift: number): Date {
    const shiftedDate = new Date(date);
    shiftedDate.setDate(shiftedDate.getDate() + shift);
    return this.getDateOnly(shiftedDate);
  }

  private getSplittedDate(date: string): number[] {
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(date)) {
      throw new InvalidDateFormatError();
    }

    return date.split('/').map(Number);
  }
}
