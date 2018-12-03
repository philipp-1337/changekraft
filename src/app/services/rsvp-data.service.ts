import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { RsvpData } from '../models/rsvp-data.model';

@Injectable({
  providedIn: 'root'
})
export class RsvpDataService {
  rsvpDataChanged = new Subject<RsvpData[]>();

  rsvpdata: RsvpData[] = [
    new RsvpData(
      'Jon Doe',
      'jon@doe.com',
      true,
      true,
      true,
      1,
      'Lorem',
      new Date('7/19/19, 0:00 AM'),
      new Date('7/21/19, 0:00 AM'),
      2,
      ['Zelt', 'Mehrbettzimmer']
    )
  ];

  constructor() {}

  getRsvpData() {
    return this.rsvpdata.slice();
  }

  getRsvp(index: number) {
    return this.rsvpdata[index];
  }

  addRsvp(rsvpdata: RsvpData) {
    this.rsvpdata.push(rsvpdata);
    this.rsvpDataChanged.next(this.rsvpdata.slice());
  }
}
