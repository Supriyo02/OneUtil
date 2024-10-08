import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  // get the sign in button
  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("1@1.com");
  await page.locator("[name=password]").fill("password");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Sign In Successful!")).toBeVisible();
});

test("should show service search results", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Location").fill("Test");
  await page.getByRole("button", { name: "Search" }).click();

  await expect(page.getByText("Services found in Test")).toBeVisible();
  await expect(page.getByText("Test Service")).toBeVisible();
});

test("should show service details", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Location").fill("Test");
  await page.getByRole("button", { name: "Search" }).click();

  await page.getByText("Test Service").click();
  await expect(page).toHaveURL(/detail/);
  await expect(page.getByRole("button", { name: "Book now" })).toBeVisible();
});