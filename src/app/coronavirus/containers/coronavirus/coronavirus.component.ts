import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef, PLATFORM_ID, Inject } from '@angular/core';
import { COUNTRIES } from '@coronavirus/constants/countries.constants';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-coronavirus',
  templateUrl: './coronavirus.component.html',
  styleUrls: ['./coronavirus.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusComponent implements OnInit {

  selectedCountry: any = COUNTRIES[0];
  selectedDivisionMap = 'departmentFrance';
  selectedRegion: any;
  selectedDepartment: any;
  isMobile: boolean;
  isBrowser = isPlatformBrowser(this.platformId);
  constructor(
    public readonly router: Router,
    private readonly ref: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private readonly platformId: any
  ) {
  }

  ngOnInit(): void {

  }

  onActivate($event): void {
    this.ref.detectChanges();
    this.selectedCountry = $event.selectedCountry;
    this.selectedRegion = $event.selectedRegion;
    this.selectedDepartment = $event.selectedDepartment;
    if (!this.selectedCountry && !this.selectedDepartment && !this.selectedRegion) {
      this.router.navigate(['/']);
    }
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
