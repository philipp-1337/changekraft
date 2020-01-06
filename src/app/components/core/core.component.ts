import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-core',
  template: `<router-outlet></router-outlet>`,
})
export class CoreComponent implements OnInit {
  constructor() { }

  ngOnInit() { }

}
