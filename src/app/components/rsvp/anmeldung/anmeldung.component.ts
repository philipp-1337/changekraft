import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { SnackbarClass } from 'src/app/shared/snackbar.class';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-anmeldung',
  templateUrl: './anmeldung.component.html',
  styleUrls: ['./anmeldung.component.scss'],
  providers: [SnackbarClass]
})
export class AnmeldungComponent implements OnInit {
  constructor(
    private breakpointObserver: BreakpointObserver,
    private httpClient: HttpClient,
    public snackbar: SnackbarClass
  ) {}

  isBigScreen$: Observable<boolean> = this.breakpointObserver
    .observe(['(min-width: 961px)'])
    .pipe(map(result => result.matches));

  @ViewChild('stepper') stepper;

  checked = true;

  absage = false;
  zusage = false;

  minDate = new Date(2019, 6, 19);
  maxDate = new Date(2019, 6, 21);

  firstFormGroup: FormGroup;
  anzahlFormGroup: FormGroup;
  teilnahmeFormGroup: FormGroup;
  anreiseFormGroup: FormGroup;
  unterkunftFormGroup: FormGroup;

  newRsvpData: Array<any>;

  freitag = new Date(2019, 6, 19);
  samstag = new Date(2019, 6, 20);
  sonntag = new Date(2019, 6, 21, 0, 0, 0, 0);

  anreise: number;
  abreise: number;
  nights: number;
  unterkuenfte: Array<string>;

  unterkunftListe: string[] = [
    'Zelt/Bulli',
    'Mehrbettzimmer',
    'Einzelzimmer',
    'Gästehaus'
  ];

  calcNights() {
    this.anreise = this.anreiseFormGroup.controls['anDate'].value;
    this.abreise = this.anreiseFormGroup.controls['abDate'].value;
    this.nights = (this.abreise - this.anreise) / 86400000; // 86400000 = 1 day (in ms)
    this.unterkuenfte = this.unterkunftFormGroup.controls['unterkuenfte'].value;
  }

  checkRange() {
    const anreise = this.anreiseFormGroup.controls['anDate'].value;
    const abreise = this.anreiseFormGroup.controls['abDate'].value;
    if (abreise < anreise) {
      return false;
    } else {
      return true;
    }
  }

  onChooseTrain() {
    console.log(this.anreiseFormGroup.controls['anreise'].value);
  }

  onChanges(): void {
    this.anreiseFormGroup.valueChanges.subscribe(val => {
      this.calcNights();
      this.unterkunftFormGroup = new FormGroup({
        naechte: new FormControl(this.nights),
        unterkuenfte: new FormControl(this.unterkuenfte)
      });
    });
  }

  ngOnInit() {
    this.firstFormGroup = new FormGroup({
      name: new FormControl(''),
      email: new FormControl('')
    });
    this.teilnahmeFormGroup = new FormGroup({
      teilnahme: new FormControl('')
    });
    this.anzahlFormGroup = new FormGroup({
      begleitung: new FormControl(''),
      hund: new FormControl(''),
      kinder: new FormControl('')
    });
    this.anreiseFormGroup = new FormGroup({
      anreise: new FormControl(''),
      abholung: new FormControl(''),
      zugzeit: new FormControl(''),
      anDate: new FormControl('', Validators.required),
      abDate: new FormControl('', Validators.required)
    });
    this.unterkunftFormGroup = new FormGroup({
      naechte: new FormControl(''),
      unterkuenfte: new FormControl('')
    });
    this.onChanges();
  }

  isMobile() {
    return this.breakpointObserver.isMatched('(max-width: 599px)');
  }

  mergeFG() {
    this.newRsvpData = {
      ...this.firstFormGroup.value,
      ...this.teilnahmeFormGroup.value,
      ...this.anzahlFormGroup.value,
      ...this.anreiseFormGroup.value,
      ...this.unterkunftFormGroup.value
    };
  }

  onSubmit() {
    this.mergeFG();
    console.log(this.newRsvpData);
    this.onSaveData(this.newRsvpData);
    this.zusage = true;
    this.snackbar.openSnackBar('Juhu, toll dass du dabei bist.', 'Schließen');
    this.stepper.reset();
  }
  onEarlyExit() {
    this.mergeFG();
    console.log(this.newRsvpData);
    this.onSaveData(this.newRsvpData);
    this.absage = true;
    this.snackbar.openSnackBar(
      'Schade, du wirst nicht eingeplant.',
      'Schließen'
    );
    this.stepper.reset();
  }

  onSaveData(newRsvpData: Array<any>) {
    this.storeRsvpData(newRsvpData).subscribe((response: HttpResponse<any>) => {
      console.log(response);
    });
  }

  storeRsvpData(data: Array<any>) {
    return this.httpClient.post(
      'https://wildwildwuerlich.firebaseio.com/rsvp.json',
      data
    );
  }
}
