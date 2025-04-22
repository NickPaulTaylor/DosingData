// Require the luxon library for date handling
const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {

  // --- Passthrough Copies ---
  // Copy directories/files directly to the output directory (_site)
  eleventyConfig.addPassthroughCopy("admin");         // For Decap CMS
  eleventyConfig.addPassthroughCopy("src/assets");    // For general assets (JS, fonts maybe)
  eleventyConfig.addPassthroughCopy("src/css");       // For compiled CSS
  eleventyConfig.addPassthroughCopy("src/img");       // For site images (like logo)

  // --- Custom Filters ---
  // Filter for readable date (e.g., Apr 22, 2025)
  eleventyConfig.addFilter("readableDate", (dateObj, format = "LLL dd, yyyy") => {
    // Input dateObj should be a JavaScript Date object from Eleventy
    // Use UTC zone to ensure consistency across builds
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat(format);
  });

  // Filter for HTML date string (e.g., 2025-04-22) used in <time> tags
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    // Input dateObj should be a JavaScript Date object from Eleventy
    // Use UTC zone to ensure consistency
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });

  // --- Shortcodes ---
  // Shortcode for inserting the current year (used in the footer)
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // --- Collections ---
  // Defines the 'posts' collection
  eleventyConfig.addCollection("posts", function(collectionApi) {
    // Get all markdown files from the src/posts directory and subdirectories
    const posts = collectionApi.getFilteredByGlob("src/posts/**/*.md");

    // --- Debugging: Log found files and their dates ---
    console.log(`[DEBUG] Found ${posts.length} files in src/posts/ by glob.`);
    posts.forEach(p => {
        // Eleventy automatically provides 'date' based on front matter or filename
        console.log(`[DEBUG] -> File: ${p.inputPath}, Date from Eleventy: ${p.date}`);
    });
    // --- End Debugging ---

    // Sort the posts by date in descending order (newest first)
    const sortedPosts = posts.sort((a, b) => {
      // Ensure dates are valid before comparing
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      // Optional: Add warning for invalid dates during sort
      if (isNaN(dateA) || isNaN(dateB)) {
           console.warn(`[DEBUG] Invalid date encountered during sort: ${a.inputPath} (${a.date}) or ${b.inputPath} (${b.date})`);
           return 0; // Return 0 to avoid crashing sort on invalid date
       }
      return dateB - dateA; // Sort descending
    });

    // --- Debugging: Log final count after sorting ---
    console.log(`[DEBUG] Collection 'posts' contains ${sortedPosts.length} items after sort.`);
    // --- End Debugging ---

    // Return the sorted array for use in templates as 'collections.posts'
    return sortedPosts;
  }); // End of addCollection("posts", ...)

  // --- Plugin Configuration ---
  // Make sure the RSS plugin lines are removed or commented out if not used
  // const eleventyPluginRss = require("@11ty/eleventy-plugin-rss");
  // eleventyConfig.addPlugin(eleventyPluginRss);


  // --- Return Base Configuration ---
  // Define input and output directories
  return {
    dir: {
      input: "src",       // Source directory
      includes: "_includes", // Relative to input directory
      layouts: "_includes", // Relative to input directory (can be same as includes)
      data: "_data",       // Relative to input directory
      output: "_site"      // Output directory
    },
    // Specify template engines if needed (optional, defaults work well)
    // markdownTemplateEngine: "njk",
    // htmlTemplateEngine: "njk",
    // dataTemplateEngine: "njk",
  };
}; // End of module.exports = function(...) - Ensure this closing brace and semicolon are present