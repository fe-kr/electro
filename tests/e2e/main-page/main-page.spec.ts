import { expect, test } from "./main-page.fixture";

test.describe("screenshot", () => {
  test.use({ disablePreload: true });

  test("should match screenshot", async ({ mainPage }) => {
    await expect(mainPage).toHaveScreenshot({ maxDiffPixels: 100 });
  });
});

test.describe("window", () => {
  test("should init window", async ({ mainPage }) => {
    const title = await mainPage.title();

    expect(title).toBe("Electro");
  });

  test("should close window", async ({ mainPage }) => {
    await mainPage.getByTestId("close-window").click();

    expect(mainPage.isClosed()).toBe(true);
  });

  test("should minimize window", async ({ mainPage, app }) => {
    test.skip(process.platform === "linux", "Skipping test on Linux");

    await mainPage.getByTestId("minimize-window").click();

    const isMinimized = await app.evaluate((e) =>
      e.BrowserWindow.getAllWindows().at(0)?.isMinimized(),
    );

    expect(isMinimized).toBe(true);
  });
});

test.describe("settings", () => {
  test("should toggle theme", async ({ mainPage }) => {
    await mainPage.getByTestId("open-settings").click();

    expect(mainPage.locator("html")).not.toHaveClass("dark");

    await mainPage.getByTestId("theme-toggle-dark").click();

    expect(mainPage.locator("html")).toHaveClass("dark");
  });

  test("should toggle resource", async ({ mainPage }) => {
    const initialCount = await mainPage.getByTestId("resource-card").count();

    await mainPage.getByTestId("open-settings").click();

    await mainPage.getByTestId("toggle-resource").first().click();

    const actualCount = await mainPage.getByTestId("resource-card").count();

    expect(actualCount).toBe(initialCount - 1);
  });
});
