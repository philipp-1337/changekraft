import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
    public snackBar: MatSnackBar
  ) {}

  @ViewChild('stepper') stepper;

  checked = true;

  firstFormGroup: FormGroup;
  anzahlFormGroup: FormGroup;
  teilnahmeFormGroup: FormGroup;

  newRsvpData: RsvpData;

  ngOnInit() {
    this.firstFormGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required)
    });
    this.teilnahmeFormGroup = new FormGroup({
      teilnahme: new FormControl('')
    });
    this.anzahlFormGroup = new FormGroup({
      begleitung: new FormControl(''),
      hund: new FormControl(''),
      kinder: new FormControl('')
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  mergeFG() {
    this.newRsvpData = {
      ...this.firstFormGroup.value,
      ...this.teilnahmeFormGroup.value,
      ...this.anzahlFormGroup.value
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
