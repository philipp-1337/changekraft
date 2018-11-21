import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { RsvpDataService } from 'src/app/services/rsvp-data.service';
import { RsvpData } from 'src/app/models/rsvp-data.model';

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.scss']
})
export class RsvpComponent implements OnInit {
  constructor(private rsvpDataService: RsvpDataService) {}

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  newRsvpData: RsvpData;

  ngOnInit() {
    this.firstFormGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required)
    });
    this.secondFormGroup = new FormGroup({
      address: new FormControl('', Validators.required)
    });
  }

  mergeFG() {
    this.newRsvpData = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value
    };
  }

  onSubmit() {
    this.mergeFG();
    console.log(this.newRsvpData);
    this.rsvpDataService.addRsvp(this.newRsvpData);
  }
}
