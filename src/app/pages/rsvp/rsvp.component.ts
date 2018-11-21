import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { RsvpDataService } from 'src/app/services/rsvp-data.service';
// import { RsvpData } from 'src/app/models/rsvp-data.model';

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.scss']
})
export class RsvpComponent implements OnInit {
  constructor(private rsvpDataService: RsvpDataService) {}

  rsvpForm: FormGroup;
  formGroup1: FormGroup;
  formGroup2: FormGroup;

  ngOnInit() {
    this.rsvpForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    console.log(this.rsvpForm.value);
    this.rsvpDataService.addRsvp(this.rsvpForm.value);
  }
}
