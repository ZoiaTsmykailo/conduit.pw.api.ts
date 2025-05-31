import { test } from "./request.fixture";
import { expect } from "@playwright/test";
/*
Request URL:
https://conduit-api.learnwebdriverio.com/api/articles/api-article-byfyv3
Request Method: DELETE
Status Code: 204 No Content

*/
/*
test.use({authData:{email:"testuser@mail.com", password: '1234'}});

test('Delete article - it should be deleted', async ({ request }) => {
  //AAA
  //Arrange
  const slug = 'api-article-fltgpn';
    
  //Act
  const response = await request.delete(`/api/articles/${slug}`);

 //Assert

expect(response.status()).toBe(204);
   
});
*/
test.use({
  authData: {
    email: process.env.EMAIL!,
    password: process.env.PASSWORD!,
  },
  articleData: {
    title: "api article ",
    description: "some description ",
    body: "some body ",
    tagList: ["test", "api"],
  },
});

test("Delete article by slug", async ({ request, createdArticle }) => {
  const slug = createdArticle.slug;
  console.log(slug);
  const response = await request.delete(`/api/articles/${slug}`);
  expect(response.status()).toBe(204);
  const deletedResponse = await request.get(`/api/articles/${slug}`);
  expect(deletedResponse.status()).toBe(404);
});
