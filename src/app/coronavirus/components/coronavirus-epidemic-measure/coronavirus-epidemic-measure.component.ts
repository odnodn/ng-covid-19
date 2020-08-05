import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-coronavirus-epidemic-measure',
  templateUrl: './coronavirus-epidemic-measure.component.html',
  styleUrls: ['./coronavirus-epidemic-measure.component.scss']
})
export class CoronavirusEpidemicMeasureComponent implements OnInit {

  @Input() epidemicMeasures;
  @Input() selectedZone;
  @Input() selectedCountry;
  @Input() selectedRegion;
  @Input() selectedDepartment;
  @Input() isMain;
  constructor() { }

  ngOnInit(): void {
  }

}