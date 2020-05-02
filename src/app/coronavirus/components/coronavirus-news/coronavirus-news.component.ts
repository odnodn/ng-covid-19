import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-coronavirus-news',
  templateUrl: './coronavirus-news.component.html',
  styleUrls: ['./coronavirus-news.component.scss']
})
export class CoronavirusNewsComponent {

  @Input() news;
}
