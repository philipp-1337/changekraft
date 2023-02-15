import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth.service';

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
  eventId: string;
  urls: EventUrl;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    public authservice: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    //Get custom event url from browser url 
    this.route.params.subscribe((params: Params) => {
      //Assign received url to varible (string)
      this.eventUrl = params['eventUrl'];

      //Use url variable to find matching url in database
      const snapshotResult = this.afs.collection('urls', ref =>
        ref.where('url', '==', this.eventUrl)
          .limit(1))
        .snapshotChanges()
        .pipe(mergeMap(url => {
          if (url.length === 0) {
            console.log('nichts gefunden');
            this.router.navigate(['404']);
            return url;
          } else {
            return url;
          }
        }));

      // Use result from url search and retrieve event data
      snapshotResult.subscribe(doc => {
        this.urls = <EventUrl>doc.payload.doc.data();
        this.eventDoc = this.afs.doc(`users/${this.urls.user}/events/${this.urls.event}`);
        this.eventId = this.urls.event
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
