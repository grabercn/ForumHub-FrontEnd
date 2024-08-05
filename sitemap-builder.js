// Usage: node src/sitemap-builder.js
// This script generates a sitemap.xml file in the root directory of the project.

require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: ['@babel/plugin-syntax-jsx']
});

const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const router = require('./src/PageRoutes').default;

async function buildSitemap() {
  try {
    // Create a sitemap stream
    const smStream = new SitemapStream({ hostname: 'https://theforumhub.com' });l  

    // Ensure router and router.routes are defined
    if (!router || !router.routes) {
      throw new Error('Router or router.routes is not defined');
    }

    // Add URLs to the sitemap
    router.routes.forEach(route => {
      // Assuming each route has a 'path' property
      smStream.write({ url: route.path, changefreq: 'daily', priority: 0.8 });
    });

    // End the stream
    smStream.end();

    // Convert the stream to a string and write to file
    const sitemap = await streamToPromise(smStream).then(data => data.toString());
    createWriteStream('./public/sitemap.xml').write(sitemap);

    console.log('Sitemap generated successfully.');
  } catch (error) {
    console.error('Failed to generate sitemap', error);
  }
}

// Execute the main function
buildSitemap();
