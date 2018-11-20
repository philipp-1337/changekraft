import { Component, OnInit, Input } from '@angular/core';
import { RsvpData } from '../../../models/rsvp-data.model';

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.scss']
})
export class RsvpComponent implements OnInit {
  @Input()
  rsvpdata: RsvpData;
  @Input()
  index: number;

  constructor() { }

  ngOnInit() {
  }

}
