import { Component, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import {
  AngularFirestore
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
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
    private fb: UntypedFormBuilder
  ) { }

  eventForm: UntypedFormGroup;
  urlAvailable = true;
  customUrl: string;
  userId: string;
  eventUrl: EventUrl;
  taken: boolean;
  eventData: {};
  event$: Observable<any>;
  minDate = new Date();
  maxDate = new Date(2099, 12, 31);

  buildForm() {
    this.eventForm = this.fb.group({
      name: ['', [Validators.required]],
      url: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.-]*$'),
        Validators.minLength(5)
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
    return this.eventForm.get('dates') as UntypedFormArray;
  }

  getErrorMessage() {
    if (this.eventForm.controls['url'].hasError('required')) {
      return 'Bitte eine URL festlegen.';
    }
    if (this.eventForm.controls['url'].hasError('pattern')) {
      return 'Die URL darf keine Leer- & Sonderzeichen enthalten.';
    }
    return this.eventForm.controls['url'].hasError('minlength') ? 'Die URL muss mindestens 5 Zeichen lang sein.' : '';
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
    let newStartDate: Date;
    let newEndDate: Date;
    if (
      this.dates.controls['startDate'].touched &&
      this.dates.controls['startDate'].valid &&
      this.dates.controls['startDate'].value
    ) {
      newStartDate = this.dates.controls['startDate'].value.toDate();
      if (this.dates.controls['multipleDays'].value === false) {
        this.eventForm.patchValue({
          dates: {
            startDate: newStartDate,
          },
        });
      }
    }
    if (
      this.dates.controls['endDate'].touched &&
      this.dates.controls['endDate'].valid &&
      this.dates.controls['endDate'].value &&
      this.dates.controls['multipleDays'].value === true
    ) {
      newEndDate = this.dates.controls['endDate'].value.toDate();
      this.eventForm.patchValue({
        dates: {
          startDate: newStartDate,
          endDate: newEndDate,
        },
      });
    }
  }

  ngOnInit() {
    this.buildForm();
    this.setDatesValidators();
    setTimeout(() => {
      if (!this.userService.verfied || !this.userService.name) {
        this.router.navigate(['./admin/profile']);
      }
    }, 100);
    this.getSingleEventData();
  }

  async getSingleEventData() {
    this.userId = (await (this.authservice.getCurrentUser())).uid;
    this.userService.getUserInfo();

    this.eventForm.controls['url'].valueChanges.subscribe(val => {
      this.urlAvailable = true;
      const snapshotResult = this.afs.collection('urls', ref =>
        ref.where('url', '==', val)
          .limit(1))
        .snapshotChanges()
        .pipe(mergeMap(url => url));

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
    const days = Math.round((end - start) / 86400000); // 86400000 = 1 day (in ms)
    return days;
  }

  checkPlural() {
    if (this.calcDays() > 1) {
      return 'Tage';
    } else {
      return 'Tag';
    }
  }

  checkRange() {
    if (this.dates.get('multipleDays').value === true) {
      const start = this.dates.controls['startDate'].value;
      const end = this.dates.controls['endDate'].value;
      if (end <= start) {
        return false;
      } else {
        return true;
      }
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
        const urlData = {
          user: this.userId, event: eventId, url: customUrl, completeUrl: 'https://changekraft.de/event/' + customUrl
        };
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
    this.customUrl = this.eventForm.controls['url'].value;
    this.storeEvent(this.customUrl);
    this.eventForm.reset();
    this.snackbar.openSnackBar('Event hinzugefügt.', 'Ok', 2500);
    this.router.navigate(['./admin/dashboard']);
  }
}
