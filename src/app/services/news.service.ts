import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PaginatedArticleList} from "../models/paginated-article-list";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  baseUrl: string = "https://api.spaceflightnewsapi.net/v4/articles"

  offset = 0;

  constructor(private http: HttpClient) { }

  getAllArticlesPaginated() {
    return this.http.get<PaginatedArticleList>(this.baseUrl.concat(`/?offset=${this.offset}`));
  }
}
