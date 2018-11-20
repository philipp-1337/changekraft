import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { RsvpData } from '../../models/rsvp-data.model';
import { RsvpDataService } from '../../services/rsvp-data.service';

@Component({
  selector: 'app-zusagen',
  templateUrl: './zusagen.component.html',
  styleUrls: ['./zusagen.component.scss']
})
export class ZusagenComponent implements OnInit {
  rsvpdata: RsvpData[] = [];
  subscription: Subscription;


  constructor(private rsvpDataService: RsvpDataService) { }

  ngOnInit() {
    this.rsvpdata = this.rsvpDataService.getRsvpData();
  }

}
