import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  template: `<router-outlet></router-outlet>`,
})
export class AdminComponent implements OnInit {
  constructor() { }

  ngOnInit() { }

}
