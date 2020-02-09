import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Event } from '../../../shared/event.model';

interface EventUrl {
  event: string;
  user: string;
  url: string;
}

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html'
})
export class EventDetailComponent implements OnInit {

  eventDoc: AngularFirestoreDocument<Event>;
  event: Observable<Event>;
  eventUrl: string;
  eventId: string;
  userId: string;
  urls: EventUrl;
  isLoading = false;
  enrol = false;

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {

      this.eventUrl = params['eventUrl'];

      const snapshotResult = this.afs.collection('urls', ref =>
        ref.where('url', '==', this.eventUrl)
          .limit(1))
        .snapshotChanges()
        .pipe(flatMap(url => url));

      snapshotResult.subscribe(doc => {
        this.urls = <EventUrl>doc.payload.doc.data();
        this.eventDoc = this.afs.doc(`users/${this.urls.user}/events/${this.urls.event}`);
        this.eventUrl = this.urls.url;
        this.eventId = this.urls.event;
        this.userId = this.urls.user;
        this.event = this.eventDoc.valueChanges();
      });
    });
  }
}
