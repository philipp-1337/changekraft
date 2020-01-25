import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Event } from '../../../shared/event.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html'
})
export class EditEventComponent implements OnInit {
  eventId: string;
  userId: string;
  eventDoc: AngularFirestoreDocument<Event>;
  event: Observable<Event>;
  eventUrl: string;

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private authservice: AuthService
  ) { }

  ngOnInit() {
    this.userId = this.authservice.getCurrentUser().uid;
    this.route.params.subscribe((params: Params) => {
      this.eventId = params['eventId'];
      this.eventDoc = this.afs.doc(`users/${this.userId}/events/${this.eventId}`);
      this.event = this.eventDoc.valueChanges();
      this.event.subscribe(data => {
        console.log(data.url);
      });
    });
  }
}
