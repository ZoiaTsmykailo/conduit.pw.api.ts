import { APIRequest, APIRequestContext } from "@playwright/test";


export class ArticlesController {
   private request: APIRequestContext;
  
    constructor(request: APIRequestContext) {
        this.request = request;
    }
  
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

        const response = await this.request.delete(`/api/articles/${slug}/comments/${idComment}`);

        return response;
    };
};