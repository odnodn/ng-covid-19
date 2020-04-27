import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coronavirus-news',
  templateUrl: './coronavirus-news.component.html',
  styleUrls: ['./coronavirus-news.component.scss']
})
export class CoronavirusNewsComponent implements AfterViewInit {

  @Input() news;
  constructor(private readonly router: Router) { }

  ngAfterViewInit(): void {
    // @ts-ignore
    if ((window as any).twttr) {
      (window as any).twttr.widgets.load();
    }
  }


}
