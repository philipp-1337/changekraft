import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BreakpointObserver } from '@angular/cdk/layout';

import { RsvpDataService } from 'src/app/services/rsvp-data.service';
import { RsvpData } from 'src/app/models/rsvp-data.model';

import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.scss']
})
export class RsvpComponent implements OnInit {
  constructor(
    private rsvpDataService: RsvpDataService,
    private router: Router,
    public snackBar: MatSnackBar,
    private breakpointObserver: BreakpointObserver
  ) {}

  @ViewChild('stepper') stepper;

  checked = true;

  minDate = new Date(2019, 6, 19);
  maxDate = new Date(2019, 6, 21);

  firstFormGroup: FormGroup;
  anzahlFormGroup: FormGroup;
  teilnahmeFormGroup: FormGroup;
  anreiseFormGroup: FormGroup;
  unterkunftFormGroup: FormGroup;

  newRsvpData: RsvpData;

  freitag = new Date(2019, 6, 19);
  samstag = new Date(2019, 6, 20);
  sonntag = new Date(2019, 6, 21, 0, 0, 0, 0);

  anreise: number;
  abreise: number;
  nights = 0;

  unterkunftListe: string[] = [
    'Zelt/Bulli',
    'Mehrbettzimmer',
    'Einzelzimmer',
    'Gästehaus'
  ];

  calcNights() {
    this.anreise = this.anreiseFormGroup.controls['anDate'].value;
    this.abreise = this.anreiseFormGroup.controls['abDate'].value;
    this.nights = (this.abreise - this.anreise) / 8.64 / 10000000;
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

  onChanges(): void {
    this.anreiseFormGroup.valueChanges.subscribe(val => {
      this.calcNights();
      this.unterkunftFormGroup = new FormGroup({
        naechte: new FormControl(this.nights),
        unterkuenfte: new FormControl('')
      });
    });
  }

  ngOnInit() {
    this.firstFormGroup = new FormGroup({
      name: new FormControl('', Validators.required),
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

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2500
    });
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
    this.rsvpDataService.addRsvp(this.newRsvpData);
    this.router.navigate(['zusagen']);
    this.openSnackBar('Juhu, toll dass du dabei bist.', 'Schließen');
    this.stepper.reset();
  }
  onEarlyExit() {
    this.mergeFG();
    console.log(this.newRsvpData);
    this.rsvpDataService.addRsvp(this.newRsvpData);
    this.router.navigate(['zusagen']);
    this.openSnackBar('Schade, du wirst nicht eingeplant.', 'Schließen');
    this.stepper.reset();
  }
}
