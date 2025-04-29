import { FullConfig } from "@playwright/test";
import { UserController } from "./controllers/Users/UserController";
import { request, expect } from "@playwright/test";

export default async function globalSetup(config: FullConfig) {
  console.log("Starting...");
  const apiContext = await request.newContext();

  const userController = new UserController(apiContext);

   process.env.EMAIL = process.env.EMAIL?.trim();
   process.env.PASSWORD = process.env.PASSWORD?.trim();
   process.env.USERNAME = process.env.USERNAME?.trim();

  try {
    const requestBody = {
      email: process.env.EMAIL!,
      password: process.env.PASSWORD!,
      userName: process.env.USERNAME!,
    };

    const response = await userController.registerUser(requestBody);

    expect(response.status()).toBe(200);
  } catch (e) {
    console.log("User already exist");
  }
}