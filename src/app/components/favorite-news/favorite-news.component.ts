import {Component, OnInit} from '@angular/core';
import {Article} from "../../models/article";
import {FavoritesService} from "../../services/favorites.service";

@Component({
  selector: 'app-favorite-news',
  templateUrl: './favorite-news.component.html',
  styleUrls: ['./favorite-news.component.css']
})
export class FavoriteNewsComponent implements OnInit {

  articles: Article[] = [];

  showButton: boolean = false;

  constructor(private favoritesService: FavoritesService) { }

  ngOnInit() {
    this.getAllFavorites();
  }

  getAllFavorites() {
    this.favoritesService.getAllFavorites().subscribe({
      next: articles => this.articles = articles
    })
  }
}
