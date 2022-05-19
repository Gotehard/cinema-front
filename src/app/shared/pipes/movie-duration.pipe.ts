import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'movieDuration'
})
export class MovieDurationPipe implements PipeTransform {

  transform(value: number[]): string {
    let t: string[] = value.map(num => Math.floor(num / 10) > 0 ? num.toString() : '0' + num);
    // let t: string = value.forEach(v => v);
    if (t.length == 2) {
      return `${t[0]}:${t[1]}:00`;
    } else if (value.length == 3) {
      return `${t[0]}:${t[1]}:${t[2]}`;
    }
    return '0:0:0';
  }

}
