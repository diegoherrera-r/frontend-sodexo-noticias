import {NewsService} from "./news.service";
import {inject, TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {PaginatedArticleList} from "../models/paginated-article-list";

describe("NewsService", () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NewsService]
    })
  });

  it(
    "should receive a list of paginated news",
    inject(
      [HttpTestingController, NewsService],
      (httpMock: HttpTestingController, newsService: NewsService) => {
        const mockArticles = [{
          "count": 18084,
          "next": "https://api.spaceflightnewsapi.net/v4/articles/?limit=10&offset=10",
          "previous": null,
          "results": [
            {
              "id": 21013,
              "title": "Ispace revises design of lunar lander for NASA CLPS mission",
              "url": "https://spacenews.com/ispace-revises-design-of-lunar-lander-for-nasa-clps-mission/",
              "image_url": "https://spacenews.com/wp-content/uploads/2023/09/ispace-apex-300x170.jpg",
              "news_site": "SpaceNews",
              "summary": "The American subsidiary of Japanese company ispace has revised the design of a lunar lander it is providing for a NASA mission, pushing back the launch of that mission by a year.",
              "published_at": "2023-09-29T12:12:52Z",
              "updated_at": "2023-09-29T12:17:50.132000Z",
              "featured": false,
              "launches": [],
              "events": []
            }]
        }];

        newsService.getAllArticlesPaginated().subscribe((event: PaginatedArticleList) => {
          switch (event) {
            default:
              expect(event).toBeDefined(mockArticles);
          }
        });

        const mockReq = httpMock.expectOne(newsService.baseUrl.concat("/?offset=0"));

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockArticles);

        httpMock.verify();
      })
  )
})
