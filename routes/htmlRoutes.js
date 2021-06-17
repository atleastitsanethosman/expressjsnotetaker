// We need to include the path package to get the correct file path for our html

const path = require('path');

// ROUTING

module.exports = (app) => {
  // => HTML GET Routes.
  // Below code handles when users "visit" a page.

  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../notes.html'));
  });

  // home page
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
  });
};
