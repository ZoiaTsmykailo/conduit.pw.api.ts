import { request } from "@playwright/test";
import { ArticlesController } from "./controllers/Articles/ArticlesController";

export default async function globalTeardown() {
  const apiContext = await request.newContext({
    baseURL: ArticlesController.baseUrl,
  });

  // Авторизація
  const loginResponse = await apiContext.post("/api/users/login", {
    data: {
      user: {
        email: process.env.EMAIL,
        password: process.env.PASSWORD,
      },
    },
  });

  const loginBody = await loginResponse.json();
  const token = loginBody.user.token;
  const username = loginBody.user.username;

  // Контекст із токеном
  const authContext = await request.newContext({
    baseURL: ArticlesController.baseUrl,
    extraHTTPHeaders: {
      Authorization: `Token ${token}`,
    },
  });

  const articlesController = new ArticlesController(authContext);

  // Отримуємо всі статті автора
  const limit = 100;
  const response = await articlesController.getMyArticles(0, limit, username);
  const { articles } = await response.json();

  // Видаляємо кожну
  for (const article of articles) {
    await articlesController.deleteArticle(article.slug);
    console.log(`Deleted article: ${article.slug}`);
  }

  await authContext.dispose();
  await apiContext.dispose();
}
