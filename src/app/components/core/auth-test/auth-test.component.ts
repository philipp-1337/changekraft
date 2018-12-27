import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-authtest',
  providers: [AngularFireAuth],
  template: `
    <div *ngIf="(afAuth.user | async) as user; else showLogin">
      <h1>Hello {{ user.displayName }}!</h1>
      <button (click)="logout()">Logout</button>
    </div>
    <ng-template #showLogin>
      <p>Please login.</p>
      <form (ngSubmit)="login(f)" #f="ngForm">
        <input
          matInput
          placeholder="E-Mail"
          type="email"
          id="email"
          name="email"
          ngModel
          class="form-control"
        /><br />
        <input
          matInput
          placeholder="Passwort"
          type="password"
          id="password"
          name="password"
          ngModel
          class="form-control"
        /><br />
        <button type="submit">Login</button>
      </form>
    </ng-template>
  `
})
export class AuthTestComponent {
  constructor(public afAuth: AngularFireAuth) {}

  login(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
