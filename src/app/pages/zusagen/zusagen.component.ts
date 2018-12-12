import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import { ExcelService } from '../../services/excel.service';

@Component({
  selector: 'app-zusagen',
  templateUrl: './zusagen.component.html',
  styleUrls: ['./zusagen.component.scss']
})
export class ZusagenComponent implements OnInit {
  // keys: any;
  // snapshot: any;
  // merged: any;
  // itemRef: any;
  excelData: any;
  subscription: Subscription;
  rsvpData: AngularFireList<any>;
  rsvp: Observable<any[]>;

  constructor(
    private excelService: ExcelService,
    private db: AngularFireDatabase
  ) {}

  ngOnInit() {
    // this.fetchData();
    this.rsvpData = this.db.list('rsvp');
    // Use snapshotChanges().map() to store the key
    this.rsvp = this.rsvpData
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  deleteItem(key: string) {
    this.rsvpData.remove(key);
  }

  exportAsXLSX(): void {
    // this.excelService.exportAsExcelFile(this.rsvpData, 'rsvp');
  }

  // fetchData() {
  //   this.db
  //     .list('rsvp')
  //     .valueChanges()
  //     .subscribe(rsvp => {
  //       this.rsvp = rsvp;
  //       console.log(this.rsvp);
  //     });
  //   this.db
  //     .list('rsvp')
  //     .snapshotChanges()
  //     .subscribe(snapshot => {
  //       this.keys = snapshot.map(e => e.key);
  //       this.snapshot = snapshot;
  //       console.log(this.snapshot);
  //       console.log(this.keys);
  //     });
  // }

  //   deleteSth(key) {
  //     firebase
  //       .database()
  //       .ref()
  //       .child('/rsvp/' + key + '/')
  //       .remove();
  //   }
}
