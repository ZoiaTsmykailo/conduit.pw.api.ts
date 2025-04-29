import {test} from './request.fixture';
import {expect} from '@playwright/test';

test.use({authData:{email:process.env.EMAIL!, password: process.env.PASSWORD!}, 
    articleData:{
        title:"api article edited",
        description:"some description edited",
        body:"some body edited",
        tagList:["test","api","edited"]
    }});

/*
Request URL:
https://conduit-api.learnwebdriverio.com/api/articles/api-article-gm5lwr
Request Method:
PUT
Status Code: 200

payload example: {"article":{"slug":"api-article-gm5lwr","title":"api article edited","description":"some description edited","body":"some body edited","createdAt":"2025-04-25T11:53:53.710Z","updatedAt":"2025-04-25T11:53:53.710Z","tagList":["test","api","edited"],"favorited":false,"favoritesCount":0,"author":{"username":"testuser2","image":"https://static.productionready.io/images/smiley-cyrus.jpg","following":false}}}

*/

test('Edit article - it should be edited', async ({ request, createdArticle }) => {
    const slug = createdArticle.slug;
   
    const response = await request.put(`/api/articles/${createdArticle.slug}`, {
        data: {
        "article":{"slug":`${slug}`,
        
        }
    }});  
    const responseUpdated = await request.get(`/api/articles/${slug}`);
    const responseJson = await responseUpdated.json();
    expect(responseJson.article.title).toBe('api article edited'); 
    expect(response.status()).toBe(200);
  
    const responseDelete = await request.delete(`/api/articles/${slug}`);
    expect(responseDelete.status()).toBe(204);
  });

  test('Update article -article should be updated', async ({request,createdArticle}) => {
    const slug = createdArticle.slug;
    const articleUpdate = {
        article: {
            title: 'New Title - updated',
            description: 'update description',
            body: 'update body',
        }
    };
    const response = await request.put(`/api/articles/${createdArticle.slug}`, { data: articleUpdate });  
    const responseUpdated = await request.get(`/api/articles/${slug}`);
    const responseJson = await responseUpdated.json();
    expect(responseJson.article.title).toBe('New Title - updated'); 
    expect(response.status()).toBe(200);
  
    const responseDelete = await request.delete(`/api/articles/${slug}`);
    expect(responseDelete.status()).toBe(204);

  })

 