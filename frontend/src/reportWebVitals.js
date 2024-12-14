/**
 * Measures and reports web vital metrics for performance monitoring.
 *
 * @function reportWebVitals
 * @param {Function} onPerfEntry - Callback function to handle performance metrics.
 * @description
 * - This function dynamically imports the `web-vitals` library and measures key performance metrics:
 *   - **CLS**: Cumulative Layout Shift
 *   - **FID**: First Input Delay
 *   - **FCP**: First Contentful Paint
 *   - **LCP**: Largest Contentful Paint
 *   - **TTFB**: Time to First Byte
 * - The metrics are passed to the provided callback function (`onPerfEntry`), which can be used to log, analyze, or send the metrics to an external service.
 *
 * @example
 * // Usage example:
 * import reportWebVitals from './reportWebVitals';
 * reportWebVitals(console.log);
 *
 * @exports reportWebVitals
 */

const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
