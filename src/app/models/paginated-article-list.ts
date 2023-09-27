import {Article} from "./article";

export interface PaginatedArticleList {
  count:    number;
  next:     string | null;
  previous: string | null;
  results:  Article[];
}
