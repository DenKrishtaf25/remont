module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("source/styles");
    eleventyConfig.addPassthroughCopy("source/img");
    eleventyConfig.addPassthroughCopy("source/fonts");
    eleventyConfig.addPassthroughCopy("source/scripts");

    return {
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        dataTemplateEngine: "njk",
        dir: {
            input: "source",
            output: ".",
            includes: "_includes",
            data: "_data"
        }
    };
};