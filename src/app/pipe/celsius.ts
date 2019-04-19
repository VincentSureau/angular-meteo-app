import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'celsius'})
export class CelsiusPipe implements PipeTransform {
  transform(value: number): string {
    return (value) ? Math.round(value) + '°C' : '-°C';
  }
}
