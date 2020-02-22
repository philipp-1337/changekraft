import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-handler',
  templateUrl: './handler.component.html',
  styleUrls: ['./handler.component.css']
})
export class HandlerComponent implements OnInit {
  mode = this.activatedActivated.snapshot.queryParams['mode'];
  constructor(private activatedActivated: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
