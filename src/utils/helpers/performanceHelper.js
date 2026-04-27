export class PerformanceHelper {
  static async measurePageLoad(page) {
    return await page.evaluate(() => {
      const timing = window.performance.timing;
      return {
        loadTime: timing.loadEventEnd - timing.navigationStart,
        domReady: timing.domContentLoadedEventEnd - timing.navigationStart,
        requestTime: timing.responseEnd - timing.requestStart,
      };
    });
  }
}
