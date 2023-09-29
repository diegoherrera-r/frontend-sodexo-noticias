export interface Article {
  id_article?:  number,
  id:           number;
  title:        string;
  url:          string;
  image_url:    string;
  news_site:    string;
  summary:      string;
  created_at?:  Date;
  published_at: Date;
  updated_at:   Date;
  featured:     boolean;
  launches?:     any[];
  events?:       any[];
}
