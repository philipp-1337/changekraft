import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { RsvpDataService } from 'src/app/services/rsvp-data.service';
import { RsvpData } from 'src/app/models/rsvp-data.model';

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.scss']
})
export class RsvpComponent implements OnInit {
  constructor(
    private rsvpDataService: RsvpDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

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
    this.router.navigate(['success'], { relativeTo: this.route });
  }
  onEarlyExit() {
    this.mergeFG();
    console.log(this.newRsvpData);
    this.rsvpDataService.addRsvp(this.newRsvpData);
    this.router.navigate(['cancellation'], { relativeTo: this.route });
  }
}
