import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { SnackbarClass } from 'src/app/shared/snackbar.class';

@Component({
  selector: 'app-handler',
  templateUrl: './handler.component.html'
})
export class HandlerComponent implements OnInit {
  mode = this.activateRoute.snapshot.queryParams['mode'];
  code = this.activateRoute.snapshot.queryParams['oobCode'];

  constructor(
    private activateRoute: ActivatedRoute,
    public afAuth: AngularFireAuth,
    private router: Router,
    public snackbar: SnackbarClass) { }

  ngOnInit(): void {
    if (this.mode === 'verifyEmail') {
      this.afAuth.auth
        .applyActionCode(this.code)
        .then(() => {
          this.snackbar.openSnackBar('E-Mail verifiziert.', 'Ok', 2500);
          this.router.navigate(['./admin/profile']);
        })
        .catch(err => {
          // show error message
        });
    } else if (this.mode === 'verifyEmail') {
      console.log('else if');
    } else {
      console.log('else');
    }
  }
}
