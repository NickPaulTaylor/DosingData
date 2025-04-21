module.exports = function(eleventyConfig) {

  // Tell Eleventy to copy the 'admin' folder straight to the output
  eleventyConfig.addPassthroughCopy("admin");

  // Tell Eleventy to copy the 'src/assets' folder (where media_folder points)
  eleventyConfig.addPassthroughCopy("src/assets");

  // Add other configurations here if needed later

  // Make sure Eleventy knows 'src' is the input folder
  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};
