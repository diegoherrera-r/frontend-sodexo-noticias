import {Component, OnInit} from '@angular/core';
import {NewsService} from "../../services/news.service";
import {PaginatedArticleList} from "../../models/paginated-article-list";
import {PageEvent} from "@angular/material/paginator";
import {Article} from "../../models/article";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  paginatedArticles: PaginatedArticleList | undefined;
  articles: Article[] = [];

  length = 0;
  pageSize = 10;
  hidePageSize = true;
  currentPage = 0;

  showButton: boolean = true;

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.getAllArticlesPaginated();
  }

  getAllArticlesPaginated() {
    this.newsService.getAllArticlesPaginated().subscribe({
      next: articleList => {
        this.paginatedArticles = articleList;
        this.length = articleList.count;
        this.articles = articleList.results;
      }
    });
  }

  handlePageEvent(pageEvent: PageEvent) {
    this.currentPage = pageEvent.pageIndex;
    this.newsService.offset = pageEvent.pageSize * pageEvent.pageIndex;
    this.getAllArticlesPaginated();
  }

}
