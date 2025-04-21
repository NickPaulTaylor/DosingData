// Require the luxon library for date handling
const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {

  // --- Passthrough Copies ---
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("src/assets");

  // --- Custom Filters ---
  // Filter for readable date (e.g., Apr 21, 2025)
  eleventyConfig.addFilter("readableDate", (dateObj, format = "LLL dd, yyyy") => {
    // Input dateObj should be a JavaScript Date object
    // Use UTC zone to ensure consistency
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat(format);
  });

  // Filter for HTML date string (e.g., 2025-04-21)
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    // Input dateObj should be a JavaScript Date object
    // Use UTC zone to ensure consistency
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });

  // Make sure the RSS plugin lines are removed or commented out
  // const eleventyPluginRss = require("@11ty/eleventy-plugin-rss");
  // eleventyConfig.addPlugin(eleventyPluginRss);

  // --- Collections ---
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/**/*.md")
      .sort((a, b) => {
        // Ensure dates are valid before comparing
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA; // Sort descending
      });
  });

  // --- Return Config ---
  return {
    dir: {
      input: "src",
      output: "_site"
    },
    // Optional: Specify markdown engine options if needed later
    // markdownTemplateEngine: "njk"
  };
};