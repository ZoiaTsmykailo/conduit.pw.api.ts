import {test} from './request.fixture';
import {expect} from '@playwright/test';

test.use({authData:{email:process.env.EMAIL, password: process.env.PASSWORD}, 
    articleData:{
        title:"api article ",
        description:"some description ",
        body:"some body ",
        tagList:["test","api"]
    }});

test('Create article', async ({ request, createdArticle, deleteArticle }) => {
  const { slug, title } = createdArticle; 
  expect(slug).toBeTruthy(); 

  await deleteArticle(slug);

  const deleteResponse = await request.get(`/api/articles/${slug}`);
  //expect(deleteResponse.status()).toBe(404); 
});
test('Update article', async ({ request, createdArticle, updateArticle, deleteArticle }) => {
  const { slug, title } = createdArticle; 

  const newTitle = 'Updated Test Article Title';
  await updateArticle(slug, newTitle);

  const response = await request.get(`/api/articles/${slug}`);
  const responseJson = await response.json();
  expect(responseJson.article.title).toBe(newTitle);

  await deleteArticle(slug);

});
test('Delete article', async ({ request, createdArticle, deleteArticle }) => {
  const { slug, title } = createdArticle; 
  expect(slug).toBeTruthy(); 

  await deleteArticle(slug);

  const deleteResponse = await request.get(`/api/articles/${slug}`);
  expect(deleteResponse.status()).toBe(404); 
});