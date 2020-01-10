import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';


import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Event } from '../../../shared/event.model';

interface eventUrl {
  event: string;
  user: string;
  url: string;
}

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html'
})
export class EventDetailComponent implements OnInit {

  private eventDoc: AngularFirestoreDocument<Event>;
  event: Observable<Event>;
  userId: string;
  eventId: string;
  eventUrl: string;
  urls: eventUrl;


  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      
      this.eventUrl = params['eventUrl'];

      const snapshotResult =  this.afs.collection('urls', ref =>
      ref.where('url', '==', this.eventUrl)
      .limit(1))
      .snapshotChanges()
      .pipe(flatMap(url => url)); 
      
      snapshotResult.subscribe(doc => {
        this.urls = <eventUrl>doc.payload.doc.data();
        console.log(this.urls);
        console.log(this.urls);
        this.eventDoc = this.afs.doc(`users/${this.urls.user}/events/${this.urls.event}`);
        this.event = this.eventDoc.valueChanges();
      });
    });


  }

}
