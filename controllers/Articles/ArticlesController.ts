import { APIRequest, APIRequestContext } from "@playwright/test";
import { Article } from "./ArticleType";

export class ArticlesController {
  private request: APIRequestContext;
  static baseUrl = "https://conduit-api.learnwebdriverio.com";

  constructor(request: APIRequestContext) {
    this.request = request;
  }
  static printBaseUrl() {
    console.log(this.baseUrl);
  }

  async getArticles(offset: number, limit: number) {
    //pagination
    const response = await this.request.get(
      `/api/articles?offset=${offset}&limit=${limit}`
    );
    return response;
  }
  async getArticle(slug: string) {
    const response = await this.request.get(`/api/articles/${slug}`);
    return response;
  }
  async createArticle(articleBody: Article) {
    const requestBody = {
      article: articleBody,
    };

    const response = await this.request.post("/api/articles", {
      data: requestBody,
    });

    return response;
  }
  async updateArticle(slug: string, articleBody: Article) {
    const requestBody = {
      article: articleBody,
    };
    const response = await this.request.put(`/api/articles/${slug}`, {
      data: requestBody,
    });
    return response;
  }
  async deleteArticle(slug: string) {
    const response = await this.request.delete(`/api/articles/${slug}`);
    return response;
  }
  async getMyArticles(offset: number, limit: number, author: "38096") {
    //pagination
    const response = await this.request.get(
      `/api/articles?offset=${offset}&limit=${limit}&author=${author}`
    );
    return response;
  }
}
