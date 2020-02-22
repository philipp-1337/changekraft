import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
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
  event$: Observable<Event>;
  eventUrl: string;
  urls: EventUrl;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {

      this.eventUrl = params['eventUrl'];

      const snapshotResult = this.afs.collection('urls', ref =>
        ref.where('url', '==', this.eventUrl)
          .limit(1))
        .snapshotChanges()
        .pipe(flatMap(url => {
          console.log(url);
          if (url.length === 0) {
            console.log('nichts gefunden');
            this.router.navigate(['404']);
            return url;
          } else {
            return url;
          }
        }));
      console.log(snapshotResult);

      snapshotResult.subscribe(doc => {
        this.urls = <EventUrl>doc.payload.doc.data();
        this.eventDoc = this.afs.doc(`users/${this.urls.user}/events/${this.urls.event}`);
        this.event$ = this.eventDoc.valueChanges().pipe(
          map(a => {
            const data = a as Event;
            return data;
          })
        );
      });
    });
  }
}
