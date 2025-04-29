import { FullConfig } from "@playwright/test";
import { UserController } from "./controllers/Users/UserController";
import { request, expect } from "@playwright/test";

export default async function globalTeardown(config: FullConfig) {
  console.log("Test execution finished");
}