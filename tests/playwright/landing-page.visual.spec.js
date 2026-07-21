import { expect, test } from "@playwright/test";
import { stabilizeLandingPage } from "./setup/landingPage";

const sectionSnapshots = [
  {
    testId: "landing-hero",
    desktop: "landing-hero-desktop.png",
    mobile: "landing-hero-mobile.png",
  },
  {
    testId: "landing-how-it-works",
    desktop: "landing-how-it-works-desktop.png",
    mobile: "landing-how-it-works-mobile.png",
  },
  {
    testId: "landing-why-it-sticks",
    desktop: "landing-why-it-sticks-desktop.png",
    mobile: "landing-why-it-sticks-mobile.png",
  },
  {
    testId: "landing-who-its-for",
    desktop: "landing-who-its-for-desktop.png",
    mobile: "landing-who-its-for-mobile.png",
  },
  {
    testId: "landing-progress-and-recall",
    desktop: "landing-progress-and-recall-desktop.png",
    mobile: "landing-progress-and-recall-mobile.png",
  },
  {
    testId: "landing-page-end",
    desktop: "landing-page-end-desktop.png",
    mobile: "landing-page-end-mobile.png",
  },
];

test.describe("landing page visual regression", () => {
  test("reveals below-the-fold sections once they enter the viewport", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "no-preference", colorScheme: "dark" });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const section = page.getByTestId("landing-progress-and-recall");

    await expect(section).not.toHaveAttribute("data-revealed", "true");
    await expect(section).toHaveCSS("opacity", "0");

    await section.scrollIntoViewIfNeeded();

    await expect(section).toHaveAttribute("data-revealed", "true");
  });

  test("shows all sections immediately when reduced motion is preferred", async ({
    page,
  }) => {
    await stabilizeLandingPage(page);

    const section = page.getByTestId("landing-progress-and-recall");

    await expect(section).toHaveAttribute("data-revealed", "true");
    await expect(section).toHaveCSS("opacity", "1");
  });

  test("freezes scroll reveals before visual capture", async ({ page }) => {
    await stabilizeLandingPage(page);

    await expect(page.locator(".scroll-reveal").first()).toHaveCSS(
      "transition-property",
      "none",
    );
  });

  test("shows launch notification consent copy next to the form", async ({
    page,
  }) => {
    await stabilizeLandingPage(page);

    await expect(
      page
        .getByText(
          "Enter your email and we'll notify you once when Coffee Quest launches.",
        )
        .first(),
    ).toBeVisible();
  });

  test("captures full-page snapshot", async ({ page }, testInfo) => {
    await stabilizeLandingPage(page);

    const fileName =
      testInfo.project.name.includes("mobile") ?
        "landing-page-mobile.png"
      : "landing-page-desktop.png";

    await expect(page).toHaveScreenshot(fileName, {
      animations: "disabled",
      fullPage: true,
      // Autoplaying hero video is non-deterministic;
      // mask it (its container has
      // a fixed height, so surrounding layout is still verified).
      mask: [page.locator("video")],
    });
  });

  test("captures section snapshots", async ({ page }, testInfo) => {
    await stabilizeLandingPage(page);

    const isMobile = testInfo.project.name.includes("mobile");

    for (const section of sectionSnapshots) {
      await expect(page.getByTestId(section.testId)).toHaveScreenshot(
        isMobile ? section.mobile : section.desktop,
        {
          animations: "disabled",
          // Mask the autoplaying hero video (non-deterministic frames).
          mask: [page.locator("video")],
        },
      );
    }
  });
});
