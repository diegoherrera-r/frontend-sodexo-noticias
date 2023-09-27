import {Component, Input} from '@angular/core';
import {Article} from "../../models/article";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  @Input()
  articles: Article[] | undefined = [];

  constructor() {

  }

}
