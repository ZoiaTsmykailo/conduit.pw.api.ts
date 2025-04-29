import { test, expect } from '@playwright/test';

// /api/articles?offset=0&limit=10

test('request article - verify count more then one', async ({ request }) => {
  //AAA
  //Arrange

  //Act
 const response = await request.get('/api/articles?offset=0&limit=10');

 const responseJson = await response.json();
 //Assert
 expect(responseJson.articlesCount).toBeGreaterThan(1);
 console.log(responseJson.articlesCount);
  
});

// /api/articles/demo-article-rjd94l

test('request article - it should exist', async ({ request }) => {
  
 const response = await request.get('/api/articles/demo-article-rjd94l');

 const responseJson = await response.json();

 expect(responseJson.article.title).toBe('Demo Article');
 console.log(responseJson.article.title);
  
});
/*
Request URL: /api/users
Request Method: POST
Status Code: 200
Payload example: {"user":{"email":"testuser@mail.com","password":"1234","username":"testuser"}}

response example: {
    "user": {
        "username": "testuser",
        "email": "testuser@mail.com",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MGExMzc4ZGI0MTIyYTUwNGYzMzIxMiIsInVzZXJuYW1lIjoidGVzdHVzZXIiLCJleHAiOjE3NTA2NzQ4MDgsImlhdCI6MTc0NTQ5MDgwOH0.BscJykmDU8m-NcWM6i_iwYopMvZ4Q09lxHRrQGY-9FE"
    }
}
*/
test.skip('register user- it should be registered', async ({ request }) => {
  
 const response = await request.post('/api/users', { 
  data: {
    "user":{"email":process.env.EMAIL!, "password":process.env.PASSWORD!,"username":process.env.USERNAME!}}});

 const responseJson = await response.json();
 responseJson.user.token;
 
 expect(responseJson.user.token).toBeTruthy();
 expect(response.status()).toBe(200);
  
});

/*
Request URL: https://conduit-api.learnwebdriverio.com/api/users/login
Request Method: POST
Status Code: 200

payload example: {"user":{"email":"testuser@mail.com","password":"1234"}}

body example: {
    "user": {
        "username": "testuser",
        "email": "testuser@mail.com",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MGExMzc4ZGI0MTIyYTUwNGYzMzIxMiIsInVzZXJuYW1lIjoidGVzdHVzZXIiLCJleHAiOjE3NTA2NzU5NTIsImlhdCI6MTc0NTQ5MTk1Mn0.YM_6XuB0PEADLACOEoXNHTkujCLCgAlmWahDZebtZQQ"
    }
}

*/

test('login user- it should be logged', async ({ request }) => {
  const requestBody = {
     
      user:{email:process.env.EMAIL!, password:process.env.PASSWORD!}
        
  };

 const response = await request.post('/api/users/login', { data: requestBody  
  });

 const responseJson = await response.json();
 responseJson.user.token;

 expect(responseJson.user.token).toBeTruthy();
 expect(response.status()).toBe(200);

  
});

/*
Request URL:
https://conduit-api.learnwebdriverio.com/api/articles
Request Method: POST
Status Code: 200
payload example: {"article":{"author":{},"title":"api article","description":"some description","body":"some body","tagList":["plawright","test","api"]}}

*/


test('Create article - it should be created', async ({ request }) => {
  const authRequestBody = {
    user:{email:process.env.EMAIL!, password:process.env.PASSWORD!}  
};

const authResponse = await request.post('/api/users/login', { data: authRequestBody  
});

const authResponseJson = await authResponse.json();
const token = authResponseJson.user.token;

const requestBody = {"article":{"author":{},"title":"api article","description":"some description","body":"some body","tagList":["playwright","test","api"]}}  ;
  //Act
 const response = await request.post('/api/articles', { 
  data: requestBody , 
  headers: {
    authorization: "Token "+ token}
  });

 const responseJson = await response.json();
 
 //Assert

 expect(response.status()).toBe(200);
   
});