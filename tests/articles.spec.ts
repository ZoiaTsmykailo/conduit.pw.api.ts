import { test, expect } from "./request.fixture";
import { Article } from "../controllers/Articles/ArticleType";
import { ArticlesController } from "../controllers/Articles/ArticlesController";
let slug;
test.use({ authData: { email: process.env.EMAIL } });
test.afterEach(async ({ request }) => {
  const articlesController = new ArticlesController(request);
  if (slug) {
    await articlesController.deleteArticle(slug);
    slug = undefined; // обов'язково обнуляти
  }
});

test("test static method", async ({}) => {
  ArticlesController.printBaseUrl();
  console.log(ArticlesController.baseUrl);
});

test("MQA-29042025 create article - it should created", async ({ request }) => {
  const articlesController = new ArticlesController(request);
  const requestBody: Article = {
    title: "some title",
    body: "some body",
    tagList: ["qa", "dojo", "test"],
  };
  const response = await articlesController.createArticle(requestBody);
  const responseJson = await response.json();
  slug = responseJson.article.slug;
  expect(response.status()).toBe(200);
});

test("MQA-29042025 get article - it should exist", async ({ request }) => {
  const articlesController = new ArticlesController(request);
  const response = await articlesController.getArticle("");
  expect(response.status()).toBe(200);
});

test("MQA-29042025 get articles - it should return 10 article", async ({
  request,
}) => {
  const articlesController = new ArticlesController(request);
  const response = await articlesController.getArticles(0, 10);
  expect(response.status()).toBe(200);
});

test("MQA-30042025 delete article - it should be deleted", async ({
  request,
}) => {
  const requestBody: Article = {
    title: "some title for delete",
    body: "some body for delete",
    tagList: ["qa", "dojo", "test", "delete"],
  };
  const articlesController = new ArticlesController(request);
  const response = await articlesController.createArticle(requestBody);
  const slugJson = await response.json();
  const slug = slugJson.article.slug;
  const responseDelete = await articlesController.deleteArticle(slug);
  const responseGet = await articlesController.getArticle(slug);

  expect(responseDelete.status()).toBe(204);
  expect(responseGet.status()).toBe(404);
});

test("MQA-30042025 update article - it should be updated", async ({
  request,
}) => {
  const articlesController = new ArticlesController(request);

  await test.step("Create article", async () => {
    const response = await articlesController.createArticle({
      title: "some title",
      body: "some body",
      tagList: ["qa", "dojo", "test"],
    });
    const json = await response.json();
    slug = json.article.slug;
    expect(response.status()).toBe(200);
  });

  await test.step("Update article", async () => {
    const response = await articlesController.updateArticle(slug, {
      title: "some title for updated",
      body: "some body for updated",
      tagList: ["qa", "dojo", "test", "updated"],
    });
    expect(response.status()).toBe(200);
  });

  await test.step("Verify update", async () => {
    const response = await articlesController.getArticle(slug);
    const json = await response.json();
    expect(json.article.title).toBe("some title for updated");
    expect(json.article.body).toBe("some body for updated");
    expect(json.article.tagList).toContain("updated");
  });
});
