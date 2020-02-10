import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  AngularFirestore
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { SnackbarClass } from 'src/app/shared/snackbar.class';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { BreakpointObserver } from '@angular/cdk/layout';

interface EventUrl {
  eventId: string;
  userId: string;
  url: string;
}

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  providers: [SnackbarClass]

})
export class AddEventComponent implements OnInit {

  constructor(
    private afs: AngularFirestore,
    private authservice: AuthService,
    public snackbar: SnackbarClass,
    private router: Router,
    private userService: UserService,
    private breakpointObserver: BreakpointObserver,
    private fb: FormBuilder
  ) { }

  eventForm: FormGroup;
  urlAvailable = true;
  customUrl: string;
  userId: string;
  eventUrl: EventUrl;
  taken: boolean;
  eventData: {};
  event$: Observable<any>;
  prefilledUrl: string;
  multipleDays: boolean;
  minDate = new Date();
  maxDate = new Date(2099, 12, 31);
  newStartDate: Date;
  newEndDate: Date;
  oldStartDate: any;
  oldEndDate: any;

  buildForm() {
    this.eventForm = this.fb.group({
      name: ['', [Validators.required]],
      url: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.-]*$')
      ]],
      desc: ['', [Validators.required]],
      dates: this.fb.group({
        multipleDays: [false],
        startDate: [''],
        endDate: [''],
      })
    });
  }

  get dates() {
    return this.eventForm.get('dates') as FormArray;
  }

  setDatesValidators() {
    const startControl = this.dates.get('startDate');
    const endControl = this.dates.get('endDate');
    this.dates.get('multipleDays').valueChanges
      .subscribe(multipleDays => {
        if (multipleDays === false) {
          startControl.setValidators([Validators.required]);
          endControl.setValidators(null);
          endControl.setValue(null);
        }
        if (multipleDays === true) {
          startControl.setValidators([Validators.required]);
          endControl.setValidators([Validators.required]);
        }
        startControl.updateValueAndValidity();
        endControl.updateValueAndValidity();
      });
  }

  transformDate() {
    if (
      this.dates.controls['startDate'].touched &&
      this.dates.controls['startDate'].valid &&
      this.dates.controls['startDate'].value
    ) {
      this.oldStartDate = this.dates.controls['startDate'].value;
      this.newStartDate = this.dates.controls['startDate'].value.toDate();
    }
    if (
      this.dates.controls['endDate'].touched &&
      this.dates.controls['endDate'].valid &&
      this.dates.controls['endDate'].value
    ) {
      this.oldEndDate = this.dates.controls['startDate'].value;
      this.newEndDate = this.dates.controls['endDate'].value.toDate();
    }

    this.eventForm.patchValue({
      dates: {
        startDate: this.newStartDate,
        endDate: this.newEndDate,
      },
    });
  }

  ngOnInit() {
    this.buildForm();
    this.setDatesValidators();
    setTimeout(() => {
      if (!this.userService.verfied) {
        this.router.navigate(['./admin/profile']);
      }
    }, 100);
    this.userId = (this.authservice.getCurrentUser()).uid;
    this.userService.getUserInfo();

    this.eventForm.controls['url'].valueChanges.subscribe(val => {
      this.urlAvailable = true;
      const snapshotResult = this.afs.collection('urls', ref =>
        ref.where('url', '==', val)
          .limit(1))
        .snapshotChanges()
        .pipe(flatMap(url => url));

      snapshotResult.subscribe(doc => {
        this.eventUrl = <EventUrl>doc.payload.doc.data();
        if (this.eventUrl.url = this.eventForm.controls['url'].value) {
          this.urlAvailable = false;
        } else {
          this.urlAvailable = true;
        }
      });
    });
  }

  calcDays() {
    const start = this.dates.controls['startDate'].value;
    const end = this.dates.controls['endDate'].value;
    const days = (end - start) / 86400000; // 86400000 = 1 day (in ms)
    return days;
  }

  checkRange() {
    const start = this.dates.controls['startDate'].value;
    const end = this.dates.controls['endDate'].value;
    if (end <= start) {
      return false;
    } else {
      return true;
    }
  }

  isMobile() {
    return this.breakpointObserver.isMatched('(max-width: 599px)');
  }

  storeEvent(customUrl: string) {
    this.afs.collection(`users/${this.userId}/events`).add(this.eventData)
      .then(docRef => {
        const eventId = docRef.id;
        const urlData = { user: this.userId, event: eventId, url: customUrl };
        this.afs.collection('urls/').add(urlData);
      })
      .catch(function (error) {
        console.error('Error adding document: ', error);
      });
  }

  onSave() {
    this.transformDate();
    this.eventData = {
      ...this.eventForm.value
    };
    console.log(this.eventData);
    this.customUrl = this.eventForm.controls['url'].value;
    this.storeEvent(this.customUrl);
    this.eventForm.reset();
    this.snackbar.openSnackBar('Event hinzugefügt.', 'Check');
    this.router.navigate(['./admin/event-list']);
    this.eventForm.patchValue({
      dates: {
        startDate: this.oldStartDate,
        endDate: this.oldEndDate,
      },
    });
  }
}
