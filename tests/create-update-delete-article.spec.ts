import {test} from './request.fixture';
import {expect} from '@playwright/test';

test.use({authData:{email:"testuser2@mail.com", password: '1234'}, 
    articleData:{
        title:"api article ",
        description:"some description ",
        body:"some body ",
        tagList:["test","api"]
    }});// Використовуємо фікстуру для налаштування користувача

test('Create, update, and delete article', async ({ request, createdArticle, updateArticle, deleteArticle }) => {
  const { slug, title } = createdArticle; // Створюємо статтю

  // Перевіряємо, чи стаття створена
  expect(slug).toBeTruthy(); // Перевірка, що slug не порожній

  // Оновлюємо статтю
  const newTitle = 'Updated Test Article Title';
  await updateArticle(slug, newTitle);

  // Перевіряємо, що статтю оновлено (наприклад, перевіряємо новий заголовок)
  const response = await request.get(`/api/articles/${slug}`);
  const responseJson = await response.json();
  expect(responseJson.article.title).toBe(newTitle);

  // Видаляємо статтю
  await deleteArticle(slug);

  // Перевіряємо, чи стаття була успішно видалена
  const deleteResponse = await request.get(`/api/articles/${slug}`);
  expect(deleteResponse.status()).toBe(404); // Перевіряємо, що стаття більше не існує
});