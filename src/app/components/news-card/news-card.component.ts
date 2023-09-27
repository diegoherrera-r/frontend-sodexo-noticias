import {Component, Inject, Input} from '@angular/core';
import {Article} from "../../models/article";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.css']
})
export class NewsCardComponent {

  @Input()
  articles: Article[] | undefined = [];

  constructor(@Inject(DOCUMENT) private document: Document) { }

  goToNews(article: Article) {
    this.document.location.href = article.url;
  }
}
