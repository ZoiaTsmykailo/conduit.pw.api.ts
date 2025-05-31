import {test} from './request.fixture';
import {expect} from '@playwright/test';

test.use({authData:{email:process.env.EMAIL!, password: process.env.PASSWORD!}});

test('MQA-29042025 Create article - it should be created', async ({ request }) => {
const requestBody = {"article":{"author":{},"title":"api article","description":"some description","body":"some body","tagList":["playwright","test","api"]}}  ;
 
const response = await request.post('/api/articles', { 
  data: requestBody 
  });
const responseJson = await response.json();
 
 
 const slugArticle = responseJson.article.slug;
 console.log(slugArticle);

expect(response.status()).toBe(200);
   
});