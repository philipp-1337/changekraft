import { Component, OnInit, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ExcelService } from '../../../services/excel.service';
import { JoinClass } from 'src/app/shared/join.class';

@Component({
  selector: 'app-admin-zusagen',
  templateUrl: './zusagen.component.html',
  styleUrls: ['./zusagen.component.scss'],
  providers: [JoinClass]
})
export class AdminZusagenComponent implements OnInit, OnDestroy {
  rsvp: Observable<any>;
  rsvpData: AngularFireList<any>;
  excelData: Array<any>;
  subscription: Subscription;

  counter: number;

  editMode = false;

  constructor(
    private excelService: ExcelService,
    private db: AngularFireDatabase,
    public joinclass: JoinClass
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
    this.fetchDataforExcel();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  updateItem(key: string, newValue: any) {
    const promise = this.rsvpData.update(key, { begleitung: newValue });
    promise
      .then(_ => console.log('Erfolgreich geändert.'))
      .catch(err => console.log(err, 'Änderung nicht erlaubt.'));
  }

  deleteItem(key: string) {
    const promise = this.rsvpData.remove(key);
    promise
      .then(_ => console.log('Erfolgreich gelöscht.'))
      .catch(err => console.log(err, 'Löschen nicht erlaubt.'));
  }

  formatDataForExcel() {
    for (let x = 0; x < this.excelData.length; x++) {
      this.excelData[x].unterkuenfte = this.joinclass.join(
        this.excelData[x].unterkuenfte,
        ', '
      );

      this.counter = 1 + x;

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

      if (this.excelData[x].anDate !== '') {
        this.excelData[x].anDate = anDateFormatted;
      }

      if (this.excelData[x].abDate !== '') {
        this.excelData[x].abDate = abDateFormatted;
      }

      if (this.excelData[x].kinder !== '') {
        this.excelData[x].kinder = parseInt(this.excelData[x].kinder, 10);
      } else {
        this.excelData[x].kinder = '0';
        this.excelData[x].kinder = parseInt(this.excelData[x].kinder, 10);
      }

    }
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.excelData, 'rsvp');
  }

  fetchDataforExcel() {
    this.subscription = this.db
      .list('rsvp')
      .valueChanges()
      .subscribe(rsvp => {
        this.excelData = rsvp;
        this.formatDataForExcel();
      });
  }

  fuerendeNullen(nummer: number) {
    if (nummer > 10) {
      return nummer + '';
    } else {
      return '0' + nummer;
    }
  }
}
