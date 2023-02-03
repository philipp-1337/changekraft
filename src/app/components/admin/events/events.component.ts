import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Event } from '../../../shared/event.model';
import { Observable, Subscription } from 'rxjs';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { DialogDeleteComponent } from 'src/app/shared/dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})

export class EventsComponent implements OnInit, OnDestroy {
  eventData: Array<any>;
  subscription: Subscription;
  event$: Observable<any>;
  shareVar: any;
  counter: number;
  userId: string;


  private eventCollection: AngularFirestoreCollection;

  constructor(
    private authservice: AuthService,
    private afs: AngularFirestore,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getEventData();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async getEventData() {
    this.userId = (await (this.authservice.getCurrentUser())).uid;
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

    this.subscription = this.event$.subscribe(rsvp => {
      this.eventData = rsvp;
      for (let x = 0; x < this.eventData.length; x++) {
        this.counter = 1 + x;
        console.log(this.counter);
      }
    });
  }

  checkPlural() {
    if (this.counter > 1) {
      return 'Events';
    } else {
      return 'Event';
    }
  }

  deleteItem(id: string) {
    const promise = this.eventCollection.doc(id).delete();
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

}
