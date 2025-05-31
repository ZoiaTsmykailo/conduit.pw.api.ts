import { test, expect } from "./request.fixture";
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
/*
Request URL
https://conduit-api.learnwebdriverio.com/api/articles?offset=0&limit=5&author=38096
Request Method
GET
Status Code
*/
test("Get my articles", async ({ request }) => {
  const articlesController = new ArticlesController(request);
  await articlesController.createArticle({
    title: "some title",
    body: "some body",
    tagList: ["qa", "dojo", "test"],
  });
  await articlesController.createArticle({
    title: "some title2",
    body: "some body2",
    tagList: ["qa", "dojo", "test"],
  });
  await articlesController.createArticle({
    title: "some title3",
    body: "some body2",
    tagList: ["qa", "dojo", "test"],
  });

  const response = await articlesController.getMyArticles(0, 10, "38096");
  const myArticlesResponse = await response.json();
  const slugs = myArticlesResponse.articles.map((article: any) => article.slug);
  console.log(slugs);
  expect(myArticlesResponse.articlesCount).toBeGreaterThan(2);
  console.log(myArticlesResponse);
  for (const slug of slugs) {
    await articlesController.deleteArticle(slug);
    console.log(`Deleted ${slug}`);
  }
  const responseAfterDelete = await articlesController.getMyArticles(
    0,
    10,
    "38096"
  );
  const myArticlesDeleted = responseAfterDelete.json();
  console.log(myArticlesDeleted);
});
