import {Component, Inject, Input, OnInit} from '@angular/core';
import {Article} from "../../models/article";
import {DOCUMENT} from "@angular/common";
import {debounceTime, filter, of, switchMap} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FavoritesService} from "../../services/favorites.service";

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.css']
})
export class NewsCardComponent implements OnInit {

  @Input()
  articles: Article[] = [];

  searchForm!: FormGroup;
  searchResult: { } = [];
  articleTitle: string[] = [];
  searchText = "";

  @Input()
  showButton: boolean = true;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private fb: FormBuilder,
    private favoriteService: FavoritesService
  ) { }

  ngOnInit() {
    this.articles.filter(article => {
      this.articleTitle.push(article.title);
    });
    this.searchForm = this.fb.group({
      searchBar: ''
    });
    this.onChanges();
  }

  goToNews(article: Article) {
    this.document.location.href = article.url;
  }

  addFavorite(article: Article) {
    this.favoriteService.addFavorite(article).subscribe();
  }

  removeFavorite(id: number) {
    this.favoriteService.removeFavorite(id).subscribe();
    window.location.reload();
  }

  onChanges() {
    this.searchForm.get('searchBar')?.valueChanges.pipe(
      filter(data => data.trim().length > 0),
      debounceTime(500),
      switchMap((id: string) => {
        return id ? this.articleSearchFilter(id.replace(/[\s]/g,'')) : of([]);
      })
    ).subscribe(articles => {
      this.searchResult = articles as Array<{}>;
    })
  }

  articleSearchFilter(searchValue: string){
    return of(this.articles.filter( article => article.title.replace(/[\s]/g,'').toLowerCase().indexOf(searchValue.toLowerCase()) === 0 ));
  }
}
