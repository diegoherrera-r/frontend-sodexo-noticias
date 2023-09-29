import { Pipe, PipeTransform } from '@angular/core';
import {Article} from "../models/article";

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(articles: Article[], searchText: string): any[] {
    if (!articles) return [];

    if (!searchText) return articles;

    searchText = searchText.toLowerCase();
    return articles.filter(article => article.title.toLowerCase().includes(searchText));
  }

}
