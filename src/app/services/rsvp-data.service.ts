import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { RsvpData } from '../models/rsvp-data.model';

@Injectable({
  providedIn: 'root'
})
export class RsvpDataService {
  rsvpDataChanged = new Subject<RsvpData[]>();

  private rsvpdata: RsvpData[] = [
    new RsvpData(
      'Jon Doe',
      'jon@doe.com',
      'Lange Str. 17, 10555 Berlin',
    )
  ];

  constructor() { }

  getRsvpData() {
    return this.rsvpdata.slice();
  }

  getRsvp(index: number) {
    return this.rsvpdata[index];
  }

}
