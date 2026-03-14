const { join } = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
    // Tells Puppeteer to install Chrome in a safe, permanent folder inside your project
    cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};