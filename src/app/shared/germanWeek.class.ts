import { NativeDateAdapter } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class GermanWeek extends NativeDateAdapter {
  getFirstDayOfWeek(): number {
    return 1;
  }
}
