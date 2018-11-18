import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

@Component({
  selector: 'app-my-stepper',
  templateUrl: './my-stepper.component.html',
  styleUrls: ['./my-stepper.component.scss']
})
export class MyStepperComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  nameCtrl = new FormControl('', [
    Validators.required,
    Validators.minLength(5)
  ]);
  emailCtrl = new FormControl('', [Validators.required, , Validators.email]);
  anzahlCtrl = new FormControl('', [Validators.required]);

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      nameCtrl: this.nameCtrl,
      emailCtrl: this.emailCtrl
    });
    this.secondFormGroup = this._formBuilder.group({
      anzahlCtrl: this.anzahlCtrl
    });
  }
}