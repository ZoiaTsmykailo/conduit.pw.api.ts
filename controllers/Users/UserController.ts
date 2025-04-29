import {APIRequestContext} from '@playwright/test';

export class UserController {
    private request:APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async loginUser(authData:{email:string, password:string}) {
        const requestBody = {user: authData};
        const response = await this.request.post("/api/users/login",  { data:requestBody});
        return response;
    };

    async registerUser(authData:{email:string, password:string, userName: string}) {
        const requestBody = {user: authData};
        const response = await this.request.post('/api/users', { 
            data: requestBody});
          
           return response;
    }
};