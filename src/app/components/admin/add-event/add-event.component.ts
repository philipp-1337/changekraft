import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { SnackbarClass } from 'src/app/shared/snackbar.class';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

interface EventUrl {
  eventId: string;
  userId: string;
  url: string;
}

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  providers: [SnackbarClass]

})
export class AddEventComponent implements OnInit {

  eventForm = new FormGroup({
    name: new FormControl('', Validators.required),
    url: new FormControl('', Validators.required),
    desc: new FormControl('', Validators.required)
  });

  constructor(
    private afs: AngularFirestore,
    private authservice: AuthService,
    public snackbar: SnackbarClass,
    private router: Router,
    private userService: UserService) { }

  urlAvailable = true;
  customUrl: string;
  userId: string;
  eventUrl: EventUrl;
  taken: boolean;
  eventData: {};
  event$: Observable<any>;

  verfied = this.userService.verfied;

  ngOnInit() {
    this.userId = this.authservice.getCurrentUser().uid;
    this.userService.getUserInfo();

    this.eventForm.controls['url'].valueChanges.subscribe(val => {
      this.urlAvailable = true;
      const snapshotResult = this.afs.collection('urls', ref =>
        ref.where('url', '==', val)
          .limit(1))
        .snapshotChanges()
        .pipe(flatMap(url => url));

      snapshotResult.subscribe(doc => {
        this.eventUrl = <EventUrl>doc.payload.doc.data();
        if (this.eventUrl.url = this.eventForm.controls['url'].value) {
          this.urlAvailable = false;
        } else {
          this.urlAvailable = true;
        }
      });
    });
  }

  sendVerification() {
    this.userService.sendVerification();
  }

  storeEvent(customUrl: string) {
    this.afs.collection(`users/${this.userId}/events`).add(this.eventData)
      .then(docRef => {
        const eventId = docRef.id;
        const urlData = { user: this.userId, event: eventId, url: customUrl };
        this.afs.collection('urls/').add(urlData);
      })
      .catch(function (error) {
        console.error('Error adding document: ', error);
      });
  }

  onSave() {
    this.eventData = {
      ...this.eventForm.value
    };
    this.customUrl = this.eventForm.controls['url'].value;
    this.storeEvent(this.customUrl);
    this.eventForm.reset();
    this.snackbar.openSnackBar('Event hinzugefügt.', 'Check');
    this.router.navigate(['./admin/event-list']);
  }
}
