import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private http: Http) {}

  storeRsvpData(data) {
    return this.http.post(
      'https://wildwildwuerlich.firebaseio.com/rsvp.json',
      data
    );
  }
}
