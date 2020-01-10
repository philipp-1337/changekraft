import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';

import { Event } from '../../../shared/event.model';
import { AuthService } from 'src/app/services/auth.service';

interface eventUrl {
  eventId: string;
  userId: string;
  url: string;
}

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html'
})
export class AddEventComponent implements OnInit {

  eventForm = new FormGroup({
    name: new FormControl('', Validators.required),
    url: new FormControl('', Validators.required),
    desc: new FormControl('', Validators.required)
  });

  constructor(private afs: AngularFirestore, private authservice: AuthService) { }

  urlAvailable = true;
  customUrl: string;
  userId: string;
  eventUrl: eventUrl;
  taken: boolean;
  eventData: {};
  event$: Observable<any>;
  private eventCollection: AngularFirestoreCollection;

  ngOnInit() {
    this.userId = this.authservice.getCurrentUser().uid;
    this.eventCollection = this.afs.collection(`users/${this.userId}/events`);
    this.event$ = this.eventCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Event;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );

    this.eventForm.controls['url'].valueChanges.subscribe(val => {
      this.urlAvailable = true;
      const snapshotResult =  this.afs.collection('urls', ref =>
          ref.where('url', '==', val)
            .limit(1))
            .snapshotChanges()
            .pipe(flatMap(url => url)); 

          snapshotResult.subscribe(doc => {
              this.eventUrl = <eventUrl>doc.payload.doc.data();
              if (this.eventUrl.url = this.eventForm.controls['url'].value) {
                this.urlAvailable = false;
              } else {
                this.urlAvailable = true;
              }
          });
      })
  }


  storeEvent(customUrl: string) {
    this.afs.collection(`users/${this.userId}/events`).add(this.eventData)
      .then(docRef => {
        const eventId = docRef.id;
        const urlData = { user: this.userId, event: eventId, url: customUrl };
        console.log(urlData);
        this.afs.collection('urls/').add(urlData);
      })
      .catch(function (error) {
        console.error('Error adding document: ', error);
      });
  }

  onSave(eventForm: FormGroup) {
    this.eventData = {
      ...this.eventForm.value
    };
    this.customUrl = this.eventForm.controls['url'].value;
    this.storeEvent(this.customUrl);
  }
}
