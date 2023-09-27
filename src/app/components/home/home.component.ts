import {Component, OnInit} from '@angular/core';
import {NewsService} from "../../services/news.service";
import {PaginatedArticleList} from "../../models/paginated-article-list";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  paginatedArticles: PaginatedArticleList | undefined;

  length = 0;
  pageSize = 10;
  hidePageSize = true;
  currentPage = 0;

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.getAllArticlesPaginated();
  }

  getAllArticlesPaginated() {
    this.newsService.getAllArticlesPaginated().subscribe({
      next: articleList => {
        this.paginatedArticles = articleList;
        this.length = articleList.count;
      }
    });
  }

  handlePageEvent(pageEvent: PageEvent) {
    console.log('handlePageEvent', pageEvent);
    this.currentPage = pageEvent.pageIndex;
    this.newsService.offset = pageEvent.pageSize;
  }

}
