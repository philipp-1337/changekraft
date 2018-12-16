import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ExcelService } from '../../services/excel.service';

@Component({
  selector: 'app-zusagen',
  templateUrl: './zusagen.component.html',
  styleUrls: ['./zusagen.component.scss']
})
export class ZusagenComponent implements OnInit {
  subscription: Subscription;
  rsvp: any;
  rsvpData: AngularFireList<any>;
  excelData: any = [];

  nights: any = [];

  editMode = false;

  constructor(
    private excelService: ExcelService,
    private db: AngularFireDatabase
  ) {}

  ngOnInit() {
    this.rsvpData = this.db.list('rsvp');
    // Use snapshotChanges().map() to store the key
    this.rsvp = this.rsvpData
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
    console.log(this.rsvp);
    console.log(this.rsvpData);
    this.fetchDataforExcel();
  }

  updateItem(key: string, newValue: any) {
    this.rsvpData.update(key, { begleitung: newValue });
  }

  deleteItem(key: string) {
    this.rsvpData.remove(key);
  }

  formilan() {
    for (let x = 0; x < this.excelData.length; x++) {
      this.excelData[x].unterkuenfte = this.join(
        this.excelData[x].unterkuenfte,
        ', '
      );

      const abDate: Date = new Date(this.excelData[x].abDate);
      const anDate: Date = new Date(this.excelData[x].anDate);

      const abDateFormatted: string =
        this.fuerendeNullen(abDate.getDate()) +
        '.' +
        this.fuerendeNullen(abDate.getMonth() + 1) +
        '.' +
        abDate.getFullYear();

      const anDateFormatted: string =
        this.fuerendeNullen(anDate.getDate()) +
        '.' +
        this.fuerendeNullen(anDate.getMonth() + 1) +
        '.' +
        anDate.getFullYear();

      this.excelData[x].abDate = abDateFormatted;
      this.excelData[x].anDate = anDateFormatted;

      this.excelData[x].kinder = parseInt(this.excelData[x].kinder, 10);

      const night: number = (abDate.getTime() - anDate.getTime()) / 86400000;

      this.nights.push(night);

      console.log(night);
    }
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.excelData, 'rsvp');
  }

  fetchDataforExcel() {
    this.db
      .list('rsvp')
      .valueChanges()
      .subscribe(rsvp => {
        this.excelData = rsvp;
        this.formilan();
      });
  }

  public join(array: Array<string>, seperator: string) {
    let result: any = '';
    for (let x = 0; x < array.length; x++) {
      if (x !== 0) {
        result += seperator;
      }
      result += array[x];
    }
    return result;
  }

  fuerendeNullen(nummer: number) {
    if (nummer > 10) {
      return nummer + '';
    } else {
      return '0' + nummer;
    }
  }
}
