import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(duration: number): string {
    return [this.getHoursString(duration), this.getMinutesString(duration)]
      .filter(Boolean)
      .join(' ');
  }

  private getHoursString(duration: number): string {
    const hours = Math.floor(duration / 60);
    return hours ? `${hours}h` : '';
  }

  private getMinutesString(duration: number): string {
    const minutes = duration % 60;
    return minutes ? `${minutes}min` : '';
  }
}
