const { DateTime } = require("luxon");
const pluginTOC = require("eleventy-plugin-toc");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItHighlightJS = require("markdown-it-highlightjs");
const embeds = require("eleventy-plugin-embed-everything");
const sizeOf = require("image-size");
const eleventyWebcPlugin = require("@11ty/eleventy-plugin-webc");
const { eleventyImagePlugin } = require("@11ty/eleventy-img");
const path = require('path');
const fs = require('fs');

const mdOptions = {
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
};

const mdAnchorOpts = {
  permalink: markdownItAnchor.permalink.ariaHidden({
    placement: 'before',
    class: 'anchor-link',
    symbol: '#',
    level: [1, 2, 3, 4],
  })
};

module.exports = function (eleventyConfig) {
  
  eleventyConfig.addDataExtension("json", (contents) => JSON.parse(contents));
  eleventyConfig.addTemplateFormats("njk");
  eleventyConfig.addPassthroughCopy("./src/css/style.css");
  eleventyConfig.addPassthroughCopy("./src/assets");
  eleventyConfig.addPassthroughCopy("src/pages", "pages");
  eleventyConfig.addPassthroughCopy("src/site.webmanifest");
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  // Netlify CMS
  eleventyConfig.addPassthroughCopy("./admin");
  // Netlify/Decap CMS + config files bundled with webpack
  eleventyConfig.addPassthroughCopy("dist");
  eleventyConfig.addPairedShortcode("myShortcode", function (content) {
    return `<div class="is-flex full-container-blog content-center">${content}</div>`;
  });
  eleventyConfig.addFilter("nextInCollection", (collection, currentSlug) => {
    const currentIndex = getIndex(collection, currentSlug);
    const pages = collection.filter((page, index) => {
      return index == currentIndex + 1 ? page : false;
    });
    return pages.length ? pages[0] : false;
  });
  eleventyConfig.addFilter("nextInCollectionnext", (collection, currentSlug) => {
    const currentIndex = getIndex(collection, currentSlug);
    const pages = collection.filter((page, index) => {
      return index == currentIndex + 2 ? page : false;
    });
    return pages.length ? pages[0] : false;
  });
  eleventyConfig.addFilter("prevInCollection", (collection, currentSlug) => {
    const currentIndex = getIndex(collection, currentSlug);
    const pages = collection.filter((page, index) => {
      return index == currentIndex - 1 ? page : false;
    });
    return pages.length ? pages[0] : false;
  });
  eleventyConfig.addFilter("prevInCollectionnext", (collection, currentSlug) => {
    const currentIndex = getIndex(collection, currentSlug);
    const pages = collection.filter((page, index) => {
      return index == currentIndex - 2 ? page : false;
    });
    return pages.length ? pages[0] : false;
  });
  eleventyConfig.addShortcode("image", function (src, alt, title, cla) {
    const dimensions = sizeOf(`./src/assets/static/images/${src}`);
    return `<img class="${cla}" src="/assets/static/images/${src}" alt="${alt}" title="${title}" width="${dimensions.width}" height="${dimensions.height}">`;
  });
  eleventyConfig.addShortcode("br", function () {
    return `<br>`;
  });
  eleventyConfig.addShortcode("br2", function () {
    return `<br><br>`;
  });
  eleventyConfig.addShortcode("br3", function () {
    return `<br><br><br>`;
  });
  eleventyConfig.addFilter("wrapWithDiv", function(markdownString) {
    return markdownString.replace(/--(.*?)--/g, '<div class="bold">$1</div>');
  });
  eleventyConfig.addNunjucksFilter("mdbr", function(value) {
    const nunjucksSafe = require("nunjucks").runtime.markSafe;
    if (!value) {
      return nunjucksSafe('');
    }
    return nunjucksSafe(value
      .replace(/-(.*?)-/g, '<span class="bold">$1</span>')
      .replace(/\*\*\*/g, '<br>')
      .replace(/\*\*/g, '<br>')
      .replace(/\^+/gm, function(match) {
        return '<br>'.repeat(match.length);
      })
    );
  });

  // Define la ruta a la carpeta de templates
  const templatesDir = path.resolve(__dirname, 'src', '_includes', 'templates');
  const templates = fs.readdirSync(templatesDir).filter(file => file.endsWith('.njk'));

  eleventyConfig.addGlobalData('pluginTemplates', templates.map(file => path.join(templatesDir, file)));

  eleventyConfig.addFilter("mbbr", function (markdownString) {
    return markdownString.replace(/-(.*?)-/g, '<span class="bold">$1</span>');
  });
  eleventyConfig.addPlugin(embeds);
  eleventyConfig.setLibrary(
    "md",
    markdownIt(mdOptions)
      .use(markdownItAnchor, mdAnchorOpts)
      .use(markdownItHighlightJS)
  );
  eleventyConfig.addPlugin(pluginTOC);
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });
  function getIndex(collection, currentSlug) {
    return collection.findIndex((page) => page.fileSlug === currentSlug);
  }
  eleventyConfig.addFilter("prevInCollection1", (collection, currentSlug) => {
    const currentIndex = getIndex(collection, currentSlug);
    const pages = collection.filter((page, index) => {
      return index == currentIndex - 1 ? page : false;
    });
    return pages.length ? pages[0] : false;
  });
  eleventyConfig.addFilter("prevInCollection2", (collection, currentSlug) => {
    const currentIndex = getIndex(collection, currentSlug);
    const pages = collection.filter((page, index) => {
      return index == currentIndex - 2 ? page : false;
    });
    return pages.length ? pages[0] : false;
  });
  eleventyConfig.addFilter("prevInCollection3", (collection, currentSlug) => {
    const currentIndex = getIndex(collection, currentSlug);
    const pages = collection.filter((page, index) => {
      return index === currentIndex - 3 ? page : false;
    });
    return pages.length ? pages[0] : false;
  });
  eleventyConfig.addFilter("reverseWords", function (value) {
    if (typeof value === "string") {
      return value.split("").reverse().join("");
    }
    return value;
  });

  // WebC
  eleventyConfig.addPlugin(eleventyWebcPlugin, {
    components: [
      "npm:@11ty/eleventy-img/*.webc",
    ],
  });
  eleventyConfig.addPlugin(eleventyImagePlugin, {
    formats: ["webp"],
    urlPath: "/assets/static/",
    outputDir: "public/assets/static/",
    defaultAttributes: {
      loading: "lazy",
      decoding: "async",
    },
  });

  // Add filenames to .njk files
  eleventyConfig.on('beforeBuild', () => {
    const templatesDir = path.resolve(__dirname, 'src', '_includes', 'templates');
    const templates = fs.readdirSync(templatesDir).filter(file => file.endsWith('.njk'));
    
    templates.forEach(file => {
      const filePath = path.join(templatesDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      if (!content.startsWith(`<!-- ${file} -->`)) {
        const newContent = `<!-- ${file} -->\n` + content;
        fs.writeFileSync(filePath, newContent, 'utf-8');
      }
    });
  });

  return {
    dir: {
      data: "_data",
      input: "src",
      output: "public",
    },
    passthroughFileCopy: true,
  };
};