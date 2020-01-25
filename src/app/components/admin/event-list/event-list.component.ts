import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Event } from '../../../shared/event.model';
import { Observable } from 'rxjs';
import { DialogDeleteComponent } from '../zusagen/dialog-delete.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html'
})
export class EventListComponent implements OnInit {

  event$: Observable<any>;
  private eventCollection: AngularFirestoreCollection;

  constructor(private authservice: AuthService, private afs: AngularFirestore, public dialog: MatDialog) { }

  ngOnInit() {
    const userId = this.authservice.getCurrentUser().uid;
    this.eventCollection = this.afs.collection(`users/${userId}/events`);
    this.event$ = this.eventCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Event;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  deleteItem(id: string) {
    const promise = this.eventCollection.doc(id).delete();
    promise
      .then(_ => console.log('Erfolgreich gelöscht.'))
      .catch(err => console.log(err, 'Löschen nicht erlaubt.'));
  }

  openDialog(id: string, name: string) {
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
