import { Component, ChangeDetectionStrategy  } from '@angular/core';
import { COUNTRIES } from '@coronavirus/constants/countries.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coronavirus',
  templateUrl: './coronavirus.component.html',
  styleUrls: ['./coronavirus.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusComponent  {

  selectedCountry: any = COUNTRIES[1];
  selectedDivisionMap = 'regionFrance';
  selectedRegion: any;
  selectedDepartment: any;

  constructor(
    private readonly router: Router,
  ) {
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
