import { Component, OnInit, inject } from '@angular/core';
import { UntypedFormArray, UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import {
  AngularFirestore
} from '@angular/fire/compat/firestore';
import {
  AngularFireStorage
} from '@angular/fire/compat/storage';
import { Observable, finalize } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { SnackbarClass } from 'src/app/shared/snackbar.class';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogWarningComponent } from 'src/app/shared/dialog-warning/dialog-warning.component';

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

  
  eventForm: UntypedFormGroup;
  urlAvailable = true;
  customUrl: string;
  userId: string;
  eventUrl: EventUrl;
  taken: boolean;
  eventData: {};
  event$: Observable<any>;
  minDateStart = new Date();
  minDateEnd = new Date();
  maxDate = new Date(2099, 11, 31);
  selectedIcon: File;
  selectedHeader: File;
  iconPath: string;
  headerPath: string;
  placeholderIcon: string;
  placeholderHeader: string;
  
  constructor(
    private afs: AngularFirestore,
    private authservice: AuthService,
    public snackbar: SnackbarClass,
    private router: Router,
    private userService: UserService,
    private fb: UntypedFormBuilder,
    private readonly storage: AngularFireStorage = inject(AngularFireStorage),
    public dialog: MatDialog
    ) { }
    
    ngOnInit() {
    this.buildForm();
    this.setDatesValidators();
    setTimeout(() => {
      if (!this.userService.verfied || !this.userService.name) {
        this.router.navigate(['./admin/profile']);
      }
    }, 100);
    this.getSingleEventData();
    // Disable the endDate initially
    this.dates.get('endDate').disable();
    // Listen for changes in the startDate field and enable/disable the endDate field accordingly and adjust the minDateEnd
    this.dates.get('startDate').valueChanges.subscribe(value => {
      if (value) {
        this.dates.get('endDate').enable();
        this.minDateEnd = new Date(value + 86400000)
      } else {
        this.dates.get('endDate').disable();
      }
    });
  }

  buildForm() {
    this.eventForm = this.fb.group({
      name: ['', [Validators.required]],
      url: ['', [
        Validators.required,
        Validators.pattern('^[a-z0-9_.-]*$'),
        Validators.minLength(5)
      ]],
      desc: ['', [Validators.required]],
      dates: this.fb.group({
        multipleDays: [false],
        startDate: [''],
        endDate: ['']
      }),
      images: this.fb.group({
        iconUrl: [''],
        headerUrl: ['']
      })
    });
  }

  onImageSelected(event: any, imageType: string) {
    const selectedImage = event.target.files[0];
    const file = selectedImage;

    if (file) {
      const filePath = `images/${Date.now()}_${file.name}`;
      const fileRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, file);

      uploadTask
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              if (imageType === 'icon') {
                this.iconPath = url;
                const tempPlaceholderIcon = this.iconPath.split('_')[1];
                this.placeholderIcon = tempPlaceholderIcon.split('?')[0];
              } else if (imageType === 'header') {
                this.headerPath = url;
                const tempPlaceholderHeader = this.headerPath.split('_')[1];
                this.placeholderHeader = tempPlaceholderHeader.split('?')[0];
              }

              this.eventForm.patchValue({
                images: {
                  [`${imageType}Url`]: url,
                },
              });
            });
          })
        )
        .subscribe();
    }
  }

  get dates() {
    return this.eventForm.get('dates') as UntypedFormArray;
  }

  getErrorMessage() {
    const urlControl = this.eventForm.get('url');
    if (urlControl.hasError('required')) {
      return 'Bitte eine URL festlegen.';
    }
    if (urlControl.hasError('pattern')) {
      return 'Keine Sonderzeichen & Großbuchstaben erlaubt.';
    }
    return urlControl.hasError('minlength') ? 'Die URL muss mindestens 5 Zeichen lang sein.' : '';
  }

  setDatesValidators() {
    const datesGroup = this.dates;
    const startControl = datesGroup.get('startDate');
    const endControl = datesGroup.get('endDate');

    datesGroup
      .get('multipleDays')
      .valueChanges.subscribe((multipleDays) => {
        if (!multipleDays) {
          startControl.setValidators([Validators.required]);
          endControl.clearValidators();
          endControl.reset();
        } else {
          startControl.setValidators([Validators.required]);
          endControl.setValidators([Validators.required]);
        }

        startControl.updateValueAndValidity();
        endControl.updateValueAndValidity();
      });
  }

  transformDate() {
    const datesGroup = this.dates;
    const startDateControl = datesGroup.get('startDate');
    const endDateControl = datesGroup.get('endDate');

    if (startDateControl.touched && startDateControl.valid && startDateControl.value) {
      if (!datesGroup.get('multipleDays').value) {
        this.eventForm.patchValue({
          dates: {
            startDate: startDateControl.value,
          },
        });
      }
    }

    if (
      endDateControl.touched &&
      endDateControl.valid &&
      endDateControl.value &&
      datesGroup.get('multipleDays').value
    ) {
      this.eventForm.patchValue({
        dates: {
          startDate: startDateControl.value,
          endDate: endDateControl.value,
        },
      });
    }
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
        if (this.eventUrl.url === val) {
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
    const days = 1 + Math.round((end - start) / 86400000); // 86400000 = 1 day (in ms)
    return days;
  }

  checkPlural() {
    return this.calcDays() > 1 ? 'Tage' : 'Tag';
  }

  checkRange() {
    if (this.dates.get('multipleDays').value) {
      const startDate = this.dates.get('startDate').value;
      const endDate = this.dates.get('endDate').value;
      return endDate > startDate;
    }
    return true;
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

  canExit() : boolean {
 
    if (this.eventForm.dirty) {
      this.openWarnDialog('Achtung', 'Deine Eingaben gehen verloren. Was möchtest du tun?', 'Löschen', true);
        return true
      } else {
        return false
      }
    }

  openWarnDialog(title: string, text: string, actionLabel: string, action: boolean) {
    const dialogRef = this.dialog.open(DialogWarningComponent, {
      width: '350px',
      data: { title: title, text: text, actionLabel: actionLabel, action: action}
    });
    dialogRef.afterClosed().subscribe(action => {
      if (action === undefined) {
        console.log('Der Vorgang wurde abgebrochen')
      } else {
        this.eventForm.reset()
        console.log('Die Eingaben wurden zurückgesetzt.')

      }
    });
  }

}
