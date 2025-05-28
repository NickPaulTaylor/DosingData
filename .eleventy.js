// Require the luxon library for date handling
const { DateTime } = require("luxon");
const sitemap = require("@quasibit/eleventy-plugin-sitemap");
const eleventyPluginRss = require("@11ty/eleventy-plugin-rss");

eleventyConfig.addPlugin(eleventyPluginRss);
module.exports = function(eleventyConfig) {

    /**
   * Truncate a string to `length` characters, adding `omission` if clipped.
   * @param  {string} str
   * @param  {number} length
   * @param  {string} omission
   */
    eleventyConfig.addFilter("truncate", function(str = "", length = 100, omission = "...") {
      if (typeof str !== "string") return "";
      if (str.length <= length) return str;
      return str.slice(0, length).trim() + omission;
    });
  

  // --- Passthrough Copies ---
  // Copy directories/files directly to the output directory (_site)
  eleventyConfig.addPassthroughCopy("admin");         // For Decap CMS
  eleventyConfig.addPassthroughCopy("src/assets");    // For general assets (JS, fonts maybe)
  eleventyConfig.addPassthroughCopy("src/css");       // For compiled CSS
  eleventyConfig.addPassthroughCopy("src/img");       // For site images (like logo)
  eleventyConfig.addPassthroughCopy("src/js");        // Add this line for JavaScript files
  
  // --- Custom Filters ---
  // Filter for readable date (e.g., Apr 23, 2025)
  eleventyConfig.addFilter("readableDate", (dateObj, format = "LLL dd, yyyy") => {
    // Input dateObj should be a JavaScript Date object from Eleventy
    // Use UTC zone to ensure consistency across builds
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat(format);
  });

  // Filter for HTML date string (e.g., 2025-04-23) used in <time> tags
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    // Input dateObj should be a JavaScript Date object from Eleventy
    // Use UTC zone to ensure consistency
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });

  // --- Shortcodes ---
  // Shortcode for inserting the current year (used in the footer)
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // --- Collections ---
  // Defines the 'posts' collection (all posts, sorted newest first)
  eleventyConfig.addCollection("posts", function(collectionApi) {
    const posts = collectionApi.getFilteredByGlob("src/posts/**/*.md");

    const sortedPosts = posts.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (isNaN(dateA) || isNaN(dateB)) {
        console.warn(`[DEBUG] Invalid date encountered during 'posts' sort: ${a.inputPath} (${a.date}) or ${b.inputPath} (${b.date})`);
        return 0;
      }
      return dateB - dateA; // Newest first
    });

    console.log(`[DEBUG] Collection 'posts' contains ${sortedPosts.length} items after sort.`);
    return sortedPosts;
  }); // End of addCollection("posts")

  // *** START: Added featuredPosts Collection ***
  // Defines the 'featuredPosts' collection (posts marked 'featured: true', sorted newest first)
  eleventyConfig.addCollection("featuredPosts", function(collectionApi) {
    const featured = collectionApi.getFilteredByGlob("src/posts/**/*.md")
      .filter(item => item.data.featured === true);

    console.log(`[DEBUG] Found ${featured.length} files marked as featured for 'featuredPosts' collection.`);

    const sortedFeatured = featured.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (isNaN(dateA) || isNaN(dateB)) {
        console.warn(`[DEBUG] Invalid date encountered during 'featuredPosts' sort: ${a.inputPath} (${a.date}) or ${b.inputPath} (${b.date})`);
        return 0;
      }
      return dateB - dateA;
    });

    console.log(`[DEBUG] Collection 'featuredPosts' contains ${sortedFeatured.length} items after sort.`);
    return sortedFeatured;
  }); // End of addCollection("featuredPosts")
  // *** END: Added featuredPosts Collection ***

  // *** START: Added heroPosts Collection ***
  // Defines the 'heroPosts' collection (splits featuredPosts into left, center, right)
  eleventyConfig.addCollection("heroPosts", function(collectionApi) {
    // Reuse the same glob and filter logic as featuredPosts
    let featured = collectionApi.getFilteredByGlob("src/posts/**/*.md")
      .filter(item => item.data.featured === true);

    // Find and remove the center post marked 'featured_center: true'
    let centerIndex = featured.findIndex(item => item.data.featured_center === true);
    let centerPost = null;
    if (centerIndex > -1) {
      centerPost = featured.splice(centerIndex, 1)[0];
    }

    // Split remaining posts: first 2 = left, next 2 = right
    let left = featured.slice(0, 2);
    let right = featured.slice(2, 4);

    return {
      left,
      center: centerPost,
      right
    };
  }); // End of addCollection("heroPosts")
  // *** END: Added heroPosts Collection ***

  // --- Plugin Configuration ---
  // (Uncomment and configure any plugins you need)
  // const eleventyPluginRss = require("@11ty/eleventy-plugin-rss");
  // eleventyConfig.addPlugin(eleventyPluginRss);

  // --- Return Base Configuration ---
  return {
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
