import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { COUNTRIES } from '@coronavirus/constants/countries.constants';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-coronavirus',
  templateUrl: './coronavirus.component.html',
  styleUrls: ['./coronavirus.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusComponent implements OnInit {

  selectedCountry: any = COUNTRIES[1];
  selectedDivisionMap = 'regionFrance';
  selectedRegion: any;
  selectedDepartment: any;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly ref: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
  }

  onActivate($event): void {
    this.ref.detectChanges();
    this.selectedCountry = $event.selectedCountry;
    this.selectedRegion = $event.selectedRegion;
    this.selectedDepartment = $event.selectedDepartment;
  }

  onSelectCountry(country: any): void {
    this.selectedCountry = country;
    this.selectedRegion = undefined;
    this.selectedDepartment = undefined;
    this.router.navigate(['stats', this.selectedCountry.slug]);
  }

  onSelectRegion(region: any): void {
    this.selectedRegion = region;
    this.selectedDepartment = undefined;
    this.router.navigate(['stats', this.selectedCountry.slug, 'region', this.selectedRegion.slug]);
  }

  onSelectDepartment(department: any): void {
    this.selectedDepartment = department;
    this.selectedRegion = undefined;
    this.router.navigate(['stats', this.selectedCountry.slug, 'departement', this.selectedDepartment.slug]);
  }

}
