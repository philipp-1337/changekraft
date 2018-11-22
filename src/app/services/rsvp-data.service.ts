import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { RsvpData } from '../models/rsvp-data.model';

@Injectable({
  providedIn: 'root'
})
export class RsvpDataService {
  rsvpDataChanged = new Subject<RsvpData[]>();

  rsvpdata: RsvpData[] = [
    new RsvpData('Jon Doe', 'jon@doe.com', true, 'Lange Str. 17, 10555 Berlin')
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
