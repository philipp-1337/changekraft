import { Injectable } from '@angular/core';

@Injectable()
export class JoinClass {
  constructor() {}
  public join(array: Array<string>, seperator: string) {
    let result: any = '';
    for (let x = 0; x < array.length; x++) {
      if (x !== 0) {
        result += seperator;
      }
      result += array[x];
    }
    return result;
  }
}
