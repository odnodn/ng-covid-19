import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingPipe } from './pipes/loading.pipe';
import { SymbolNumberPipe } from './pipes/symbol-number.pipe';
import { CountryTranslationPipe } from './pipes/country-translation.pipe';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AgeFilterPipe } from './pipes/age-filter.pipe';
import { CountryFilterPipe } from './pipes/country-filter.pipe';
import { PercentagePipe } from './pipes/percentage.pipe';
import { IncludePipe } from './pipes/include.pipe';

@NgModule({
  declarations: [
    LoadingPipe,
    SymbolNumberPipe,
    CountryTranslationPipe,
    CountryFilterPipe,
    AgeFilterPipe,
    PercentagePipe,
    IncludePipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingPipe,
    SymbolNumberPipe,
    CountryTranslationPipe,
    CountryFilterPipe,
    AgeFilterPipe,
    PercentagePipe,
    IncludePipe,
    NgxMatSelectSearchModule
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule
  ]
})
export class SharedLibsModule { }
