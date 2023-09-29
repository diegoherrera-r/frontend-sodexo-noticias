import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Article} from "../models/article";

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private readonly baseUrl: string = "http://localhost:8080/favorites"

  constructor(private http: HttpClient) { }

  getAllFavorites() {
    return this.http.get<Article[]>(this.baseUrl)
  }

  addFavorite(article: Article) {
    return this.http.post<Article>(this.baseUrl, article);
  }

  removeFavorite(id: number) {
    return this.http.delete<Article>(this.baseUrl.concat(`/${id}`));
  }
}
