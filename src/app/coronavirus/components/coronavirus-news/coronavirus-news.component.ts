import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coronavirus-news',
  templateUrl: './coronavirus-news.component.html',
  styleUrls: ['./coronavirus-news.component.scss']
})
export class CoronavirusNewsComponent implements OnInit {

  @Input() news;
  constructor(private readonly router: Router) { }

  ngOnInit(): void {

  }

}
