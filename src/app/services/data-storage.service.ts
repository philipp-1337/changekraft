import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RsvpDataService } from './rsvp-data.service';
import { RsvpData } from '../models/rsvp-data.model';

import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(
    private http: Http,
    private rsvpDataService: RsvpDataService,
    private authService: AuthService
  ) {}

  storeRsvpData() {
    const token = this.authService.getToken();
    return this.http.put(
      'https://wildwildwuerlich.firebaseio.com/rsvp.json?auth=' + token,
      this.rsvpDataService.getRsvpData()
    );
  }

  getRsvpData() {
    const token = this.authService.getToken();
    this.authService.getToken();
    this.http
      .get('https://wildwildwuerlich.firebaseio.com/rsvp.json?auth=' + token)
      .pipe(
        map((response: Response) => {
          const rsvpdata: RsvpData[] = response.json();
          return rsvpdata;
        })
      )
      .subscribe((rsvpdata: RsvpData[]) => {
        this.rsvpDataService.setRsvpData(rsvpdata);
      });
  }
}
