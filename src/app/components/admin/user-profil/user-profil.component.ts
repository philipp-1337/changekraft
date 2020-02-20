import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
import { SnackbarClass } from 'src/app/shared/snackbar.class';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  providers: [SnackbarClass],
  animations: [
    trigger('rotate', [
      transition('state1 => state2', [
        style({ transform: 'rotate(-540deg)' }),
        animate('.8s ease-in-out', style({ transform: 'rotate(0)' }))
      ])
    ])
  ],
})
export class UserProfilComponent implements OnInit {
  animate = 'state1';

  constructor(
    public userService: UserService,
    private snackbar: SnackbarClass) { }

  ngOnInit() {
    this.userService.getUserInfo();
    setTimeout(() => {
      if (!this.userService.verfied) {
        this.snackbar.openSnackBar('Bitte E-Mail bestätigen!', 'Ok', 2500);
      }
    }, 100);
  }

  updateUser(form: NgForm) {
    this.animate = 'state2';
    this.userService.updateUser(form);
    setTimeout(() => {
      this.animate = 'state1';
    }, 1000);
  }

  sendVerification() {
    this.userService.sendVerification();
    this.snackbar.openSnackBar('Eine Bestätigungsemail wurde versandt.', 'Ok', 2500);
  }
}
