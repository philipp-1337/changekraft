import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
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
  event$: Observable<Event>;
  eventUrl: string;
  eventDetails: any;

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private authservice: AuthService
  ) { }

  ngOnInit() {
    this.getSingleEventData();
  }
  async getSingleEventData() {
    this.userId = (await (this.authservice.getCurrentUser())).uid;
    this.route.params.subscribe((params: Params) => {
      this.eventId = params['eventId'];
      this.eventDoc = this.afs.doc(`users/${this.userId}/events/${this.eventId}`);
      this.event$ = this.eventDoc.valueChanges().pipe(
        map(a => {
          const data = a as Event;
          return data;
        })
      );
    });
  }
}
