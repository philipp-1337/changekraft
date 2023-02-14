import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Event } from '../../../shared/event.model';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteComponent } from 'src/app/shared/dialog-delete/dialog-delete.component';
// import { DialogShareComponent } from 'src/app/shared/dialog-share/dialog-share.component';

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
  shareVar: any;

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private authservice: AuthService,
    public dialog: MatDialog
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

  share(title: string, text: string, url: string) {
    this.shareVar = window.navigator;
    if (this.shareVar && this.shareVar.share) {
      this.shareVar.share({
        title: url,
        text: title + ' — ' + text,
        url: url,
      })
        .then(() => console.log('Successful share'))
        .catch((error: any) => console.log('Error sharing', error));
    } else {
      console.log('No browser support');
      // this.shareDialog(title, text, url);
    }
  }

  deleteItem(id: string) {
    const promise = this.afs.doc(id).delete();
    promise
      .then(_ => console.log('Erfolgreich gelöscht.'))
      .catch(err => console.log(err, 'Löschen nicht erlaubt.'));
  }

  deleteDialog(id: string, name: string) {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: '250px',
      data: { id: id, name: name }
    });

    dialogRef.afterClosed().subscribe(result => {
      id = result;
      if (id === undefined) {
        console.log('Das Event wurde nicht gelöscht.');
      } else {
        console.log('Das Event mit der ID ' + id + ' wurde gelöscht.');
        this.deleteItem(id);
      }
    });
  }
  // shareDialog(title: string, text: string, url: string) {
  //   this.dialog.open(DialogShareComponent, {
  //     width: '250px',
  //     data: { title: title, text: text, url: url }
  //   });
  // }



}
