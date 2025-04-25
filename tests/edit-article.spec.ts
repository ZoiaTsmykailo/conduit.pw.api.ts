import {test} from './request.fixture';
import {expect} from '@playwright/test';

test.use({authData:{email:"testuser2@mail.com", password: '1234'}, 
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
    //AAA
    //Arrange
    const slug = createdArticle.slug;
    expect(slug).toBeTruthy();
    console.log(slug)  
    //Act
    const response = await request.put(`/api/articles/${createdArticle.slug}`, {
        data: {
        "article":{"slug":`${createdArticle.slug}`,
        
        }
    }});  
    const responseUpdated = await request.get(`/api/articles/${slug}`);
    const responseJson = await responseUpdated.json();
    
  
   //Assert
   expect(responseJson.article.title).toBe('api article edited'); 
  expect(response.status()).toBe(200);
  
  const responseDelete = await request.delete(`/api/articles/${createdArticle.slug}`);
  expect(responseDelete.status()).toBe(204);
  });

 