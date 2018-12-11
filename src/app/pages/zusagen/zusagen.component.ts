import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

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
  rsvp: any;
  keys: any;
  snapshot: any;
  subscription: Subscription;
  todos$: AngularFireList<any[]>;

  constructor(
    private excelService: ExcelService,
    private db: AngularFireDatabase
  ) {}

  ngOnInit() {
    this.fetchData();
    this.getKey();
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.rsvp, 'rsvp');
  }

  fetchData() {
    this.db
      .list('rsvp')
      .valueChanges()
      .subscribe(rsvp => {
        this.rsvp = rsvp;
        console.log(this.rsvp);
      });
  }

  getKey() {
    this.db
      .list('rsvp')
      .snapshotChanges()
      .subscribe(snapshot => {
        this.keys = snapshot.map(e => e.key);
        this.snapshot = snapshot;
        console.log(this.snapshot);
        console.log(this.keys);
      });
  }

  deleteSth(key) {
    firebase.database().ref().child('/rsvp/' + key + '/').remove();
  }
}
