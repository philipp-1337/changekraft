import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AngularFireDatabase } from 'angularfire2/database';

import { ExcelService } from '../../services/excel.service';

@Component({
  selector: 'app-zusagen',
  templateUrl: './zusagen.component.html',
  styleUrls: ['./zusagen.component.scss']
})
export class ZusagenComponent implements OnInit {
  rsvp: any;
  subscription: Subscription;

  constructor(
    private excelService: ExcelService,
    private db: AngularFireDatabase
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.rsvp, 'rsvp');
  }

  fetchData() {
    this.db
      .list('rsvp')
      .valueChanges()
      .subscribe(rsvp => {
        console.log(rsvp);
        this.rsvp = rsvp;
      });
    console.log(this.rsvp);
  }
}
