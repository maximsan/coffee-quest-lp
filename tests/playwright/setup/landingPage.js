export async function stabilizeLandingPage(page) {
  await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "dark" });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.evaluate(async () => {
    if (document.fonts?.ready) {
      await document.fonts.ready;
    }

    for (const video of document.querySelectorAll("video")) {
      video.pause();
      video.currentTime = 0;
      video.muted = true;
    }
  });
  await page.waitForTimeout(150);
}
