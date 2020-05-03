import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { CoronavirusFranceService } from '@coronavirus/services/coronavirus-france.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-coronavirus-news-page',
  templateUrl: './coronavirus-news-page.component.html',
  styleUrls: ['./coronavirus-news-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoronavirusNewsPageComponent implements OnInit {
  news$: Observable<any>;
  newsAll$: Observable<any>;
  news: any = {};
  constructor(
    private readonly coronavirusFranceService: CoronavirusFranceService,
    private readonly route: ActivatedRoute,
    private readonly ref: ChangeDetectorRef,
    private readonly title: Title,
    private readonly meta: Meta
  ) { }

  ngOnInit(): void {
    this.newsAll$ = this.coronavirusFranceService.getFranceNews();
    this.route.params.subscribe((params) => {
      if (params.title) {
        this.coronavirusFranceService
          .getNewsById(params.title)
          .subscribe((result) => {
            this.news.value = result;
            this.news.value.image = !this.getPicture() ? '../../../assets/images/cascoronavirus.png' : this.getPicture();
            this.initMetaNews(params.title);
            this.ref.detectChanges();
          });
      } else {
        this.initMetaAllNews();
      }
    });
  }

  private getPicture(): string {
    if (this.news.value.image) {
      return this.news.value.image;
    }
    if (!this.news && !this.news.value) {
      return null;
    }
    if (this.news.value.content) {
      const html = this.news.value.content;
      return html.substring(
        this.news.value.content.indexOf('c=') + 3,
        this.news.value.content.indexOf('style=') - 2
      );
    }
    return null;
  }

  private initMetaNews(title: string): void {
    this.title.setTitle(`${this.news.value.title} - News Coronavirus`);
    const tags = [
      // tslint:disable-next-line:max-line-length
      {
        name: 'description',
        content: `${this.news.value.title} - ${this.news.value.description}`,
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'https://www.cascoronavirus.fr/' },
      {
        property: 'og:url',
        content: `https://www.cascoronavirus.fr/news/${title}/${this.news.value.id}`,
      },
      {
        property: 'og:title',
        content: `${this.news.value.title} - News Coronavirus`,
      },
      // tslint:disable-next-line:max-line-length
      {
        property: 'og:description',
        content: `${this.news.value.title} - ${this.news.value.description}`,
      },
      {
        property: 'og:image',
        content: this.getPicture(),
      },
      { name: 'twitter:card', content: 'summary' },
      {
        name: 'twitter:title',
        content: `${this.news.value.title} - News Coronavirus`,
      },
      // tslint:disable-next-line:max-line-length
      {
        name: 'twitter:description',
        content: `${this.news.value.title} - ${this.news.value.description}`,
      },
      {
        name: 'twitter:image',
        content: this.getPicture(),
      },
      { name: 'twitter:site', content: '@SouryvathN' },
    ];
    tags.forEach((tag) => {
      this.meta.updateTag(tag);
    });
  }

  private initMetaAllNews(): void {
    this.title.setTitle(
      'News Coronavirus - Suivre toutes les news et actualité du COVID-19'
    );
    const tags = [
      // tslint:disable-next-line:max-line-length
      {
        name: 'description',
        content: 'News Coronavirus - Suivre toutes l\'actualité du COVID-19',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'https://www.cascoronavirus.fr/' },
      { property: 'og:url', content: 'https://www.cascoronavirus.fr/news' },
      {
        property: 'og:title',
        content: 'News Coronavirus - Suivre toutes l\'actualité du COVID-19',
      },
      // tslint:disable-next-line:max-line-length
      {
        property: 'og:description',
        content:
          'Retrouvez toute l\'actualité et les news du Coronavirus COVID-19',
      },
      {
        property: 'og:image',
        content:
          'https://www.cascoronavirus.fr/assets/images/meta_og_social.png',
      },
      { name: 'twitter:card', content: 'summary' },
      {
        name: 'twitter:title',
        content: 'News Coronavirus - Suivre toutes l\'actualité du COVID-19',
      },
      // tslint:disable-next-line:max-line-length
      {
        name: 'twitter:description',
        content:
          'Retrouvez toute l\'actualité et les news du Coronavirus COVID-19',
      },
      {
        name: 'twitter:image',
        content:
          'https://www.cascoronavirus.fr/assets/images/meta_og_social.png',
      },
      { name: 'twitter:site', content: '@SouryvathN' },
    ];
    tags.forEach((tag) => {
      this.meta.updateTag(tag);
    });
  }
}
