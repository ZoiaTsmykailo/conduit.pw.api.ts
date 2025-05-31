import { test as base } from '@playwright/test';

type MyFixture = {
    authData: { 
        email?:string,
        password?:string,
    },

    articleData: {
        
            slug?:string,
            title?:string,
            description?:string,
            body?:string,
            tagList?:string[]
    },
         
    createdArticle: {
        slug: string;
        title: string;
    },
    updateArticle: (slug: string, newTitle: string) => Promise<void>;
    deleteArticle: (slug: string) => Promise<void>;
};

export const test = base.extend<MyFixture>({
    authData:{},
    articleData:{},

    request: async ({playwright, request, authData}, use ) => {
        const authRequestBody = {
            user:{
                email: process.env.EMAIL!,
                password: process.env.PASSWORD!}  
        };
        
        const authResponse = await request.post('/api/users/login', { data: authRequestBody  
        });
        
        const authResponseJson = await authResponse.json();
        const token = authResponseJson.user.token;
        const apiContext = await playwright.request.newContext({
            extraHTTPHeaders: {
                Authorization: "Token "+ token,
            }

        });
      await  use(apiContext);
    },

    createdArticle: async ({ request, articleData }, use) => {
        const uniqueTitle = articleData.title;
        const response = await request.post('/api/articles', {
          data: {
            article: {
              title: uniqueTitle,
              description: articleData.description,
              body: articleData.body,
              tagList: articleData.tagList,
            },
          },
        });
    
        const responseJson = await response.json();
        const slug = responseJson.article.slug;
    
        await use({ slug, title: `${uniqueTitle}` });
      },

      updateArticle: async ({ request }, use) => {
        const update = async (slug: string, newTitle: string) => {
          await request.put(`/api/articles/${slug}`, {
            data: {
              article: {
                title: newTitle,
                description: 'update description',
                body: 'update body',
              },
            },
          });
        };
      
        await use(update); 
      },

      deleteArticle: async ({request}, use) =>{
        const dlt = async (slug: string) => {
            await request.delete(`/api/articles/${slug}`);
          };
          await use(dlt);
      }

});

export {expect} from '@playwright/test';
 