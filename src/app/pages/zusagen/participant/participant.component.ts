import { Component, OnInit, Input } from '@angular/core';
import { RsvpData } from '../../../models/rsvp-data.model';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.scss']
})
export class ParticipantComponent implements OnInit {
  @Input()
  rsvpdata: RsvpData;
  @Input()
  index: number;

  constructor() {}

  ngOnInit() {}
}
