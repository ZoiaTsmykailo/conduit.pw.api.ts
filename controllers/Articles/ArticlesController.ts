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

    async getArticles(offset:number, limit: number) {
        //pagination
        const response = await this.request.get(`/api/articles?offset=${offset}&limit=${limit}`);
        return response;
    };
    async getArticle(slug: string){
        const response = await this.request.get(`https://conduit-api.learnwebdriverio.com/api/articles/${slug}`);
        return response;
    };
    async createArticle(articleBody: Article) {
        const requestBody = {
          article: articleBody,
        };
    
        const response = await this.request.post("/api/articles", {
          data: requestBody,
        });
    
        return response;
      }
    async updateArticle(slug: string, articleBody:Article){
        const requestBody = {
            article: articleBody,
          };
        const response = await this.request.put(`/articles/${slug}`, {data:requestBody});
        return response;
    };
    async deleteArticle (slug: string) {
        const response = await this.request.delete(`/api/articles/${slug}`);
        return response;   
    };
    async  postComment(slug: string,newComment:string) {
        const comments = {"comment":{"body":`${newComment}`}}
        const response = await this.request.post(`/api/articles/${slug}/comments`, {data:{comments}});
        return response;
    };
    async getComment(slug: string,comment: string){

        const response = await this.request.get(`/api/articles/${slug}/comments`, {data:{body:`${comment}`}});
        return response;
    };
    async deleteComment(slug: string, comment: string){
        const responseComment = await this.getComment(slug, comment);
        const responseJson = await responseComment.json(); 

        const idComment =  responseJson.comments.id;

        const response = await this.request.delete(`https://conduit-api.learnwebdriverio.com/api/articles/${slug}/comments/${idComment}`);

        return response;
    };
}