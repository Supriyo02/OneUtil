import { test, expect } from "@playwright/test";
import path from "path";

const UI_URL = "http://localhost:5173/";

test("should allow the user to sign in", async ({ page }) => {
  await page.goto(UI_URL);
  // get the sign in button
  await page.getByRole("link", { name: "Sign In" }).click();
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("1@1.com");
  await page.locator("[name=password]").fill("password");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Sign in Successful!")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Services" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
});

test("should allow user to add a service", async ({ page }) => {
  await page.goto(`${UI_URL}add-service`);

  await page.locator('[name="name"]').fill("Test Service");
  await page.locator('[name="city"]').fill("Test City");
  await page.locator('[name="country"]').fill("Test Country");
  await page
    .locator('[name="description"]')
    .fill("This is a description for the Test Service");
  await page.locator('[name="pricePerService"]').fill("100");
  await page.selectOption('select[name="starRating"]', "3");

  await page.getByText("Spa").click();

  await page.getByLabel("Hygiene & sanitation").check();
  await page.getByLabel("Discounts").check();

  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "files", "1.jpg"),
    path.join(__dirname, "files", "2.jpg"),
  ]);

  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Service Saved!")).toBeVisible();
});

test("should display services", async ({ page }) => {
  await page.goto(`${UI_URL}my-services`);

  await expect(page.getByText("Test Service")).toBeVisible();
  await expect(page.getByText("This is a description for the Test Service")).toBeVisible();
  await expect(page.getByText("Test City, Test Country")).toBeVisible();
  await expect(page.getByText("Spa")).toBeVisible();
  await expect(page.getByText("$100 per service")).toBeVisible();
  await expect(page.getByText("3 Star Rating")).toBeVisible();

  await expect(
    page.getByRole("link", { name: "View Details" }).first()
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Add Service" })).toBeVisible();
});

test("should edit service", async ({ page }) => {
  await page.goto(`${UI_URL}my-services`);

  await page.getByRole("link", { name: "View Details" }).first().click();

  await page.waitForSelector('[name="name"]', { state: "attached" });
  await expect(page.locator('[name="name"]')).toHaveValue("Test Service");
  await page.locator('[name="name"]').fill("Test Service UPDATED");
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Service Saved!")).toBeVisible();

  await page.reload();

  await expect(page.locator('[name="name"]')).toHaveValue(
    "Test Service UPDATED"
  );
  await page.locator('[name="name"]').fill("Test Service");
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Service Saved!")).toBeVisible();
});