import {test} from './request.fixture';
import {expect} from '@playwright/test';
import { Article } from "../controllers/Articles/ArticleType";
import { ArticlesController } from "../controllers/Articles/ArticlesController";

test.use({ authData: { email: process.env.EMAIL! , password: process.env.PASSWORD!},
    articleData:    
    {title:`Title edited`,
    description:'some description edited',
    body:`perfect body`,
    tagList:['teg', 'pass', 'great']}
});

// beforeEach
// afterEach

// beforeAll
// afterAll

// fixture

// globalSetup
// globalTeardown

test("test static method", async ({}) => {
  ArticlesController.printBaseUrl();
  console.log(ArticlesController.baseUrl);
});

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
   
    const response = await request.put(`/api/articles/${slug}`, {
        data: {
        "article":{"slug":`${slug}`}
        }
    });  
    const responseUpdated = await request.get(`/api/articles/${slug}`);
    const responseJson = await responseUpdated.json();
    expect(responseJson.article.title).toBe('Title edited'); 
    expect(response.status()).toBe(200);
  
    const responseDelete = await request.delete(`/api/articles/${slug}`);
    expect(responseDelete.status()).toBe(204);
  });