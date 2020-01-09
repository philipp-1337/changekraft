import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';

import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Event } from '../../../shared/event.model';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html'
})
export class EventDetailComponent implements OnInit {

  private eventDoc: AngularFirestoreDocument<Event>;
  event: Observable<Event>;
  userId: string;
  eventId: string;

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.userId = params['userId'];
      this.eventId = params['eventId'];
    });
    this.eventDoc = this.afs.doc(`users/${this.userId}/event/${this.eventId}`);
    this.event = this.eventDoc.valueChanges();
  }

}
