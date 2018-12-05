import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { RsvpData } from '../../models/rsvp-data.model';
import { RsvpDataService } from '../../services/rsvp-data.service';
import { ExcelService } from '../../services/excel.service';

@Component({
  selector: 'app-zusagen',
  templateUrl: './zusagen.component.html',
  styleUrls: ['./zusagen.component.scss']
})
export class ZusagenComponent implements OnInit {
  rsvpdata: RsvpData[];
  subscription: Subscription;

  constructor(
    private rsvpDataService: RsvpDataService,
    private excelService: ExcelService
    ) {}

  ngOnInit() {
    this.subscription = this.rsvpDataService.rsvpDataChanged.subscribe(
      (rsvpdata: RsvpData[]) => {
        this.rsvpdata = rsvpdata;
      }
    );
    this.rsvpdata = this.rsvpDataService.getRsvpData();
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.rsvpdata, 'rsvp');
  }
}
