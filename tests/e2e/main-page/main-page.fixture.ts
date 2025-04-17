/* eslint-disable react-hooks/rules-of-hooks */
// eslint-disable-file react-hooks/rules-of-hooks
import {
  test as base,
  _electron as electron,
  ElectronApplication,
  Page,
} from "@playwright/test";

export * from "@playwright/test";

interface TestOptions {
  disablePreload?: boolean;
}

interface ElectronFixtures {
  app: ElectronApplication;
  mainPage: Page;
}

export const test = base.extend<ElectronFixtures, TestOptions>({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  disablePreload: [false, { option: true }],

  app: async ({ disablePreload }, use) => {
    const app = await electron.launch({
      args: ["."],
      env: {
        ...process.env,
        PW_DISABLE_PRELOAD_SCRIPT: `${disablePreload}`,
        NODE_ENV: "development",
      },
    });

    await use(app);

    await app.close();
  },

  mainPage: async ({ app }, use) => {
    const mainPage = await app.firstWindow();

    await mainPage.waitForLoadState("load");

    await use(mainPage);
  },
});
