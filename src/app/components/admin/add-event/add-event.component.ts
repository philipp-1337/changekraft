import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html'
})
export class AddEventComponent implements OnInit {

  eventForm = new FormGroup({
    name: new FormControl(''),
    desc: new FormControl('')
  });

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
  }

  onSave(eventForm: FormGroup) {

    const eventData = {
      ...this.eventForm.value
    };

    console.log(eventForm);
    console.log(eventData);

    this.afs.collection('event').add(eventData);
  }
}
