const path = require('path');

const constructorMethod = (app) => {
  app.get('/', (req, res) => {
    res.sendFile(path.resolve('public/html/index.html'));
  });

    app.use('*', (req, res) => {
      res.status(404).json({ error: '404 Error: Not found' });
    });
};

module.exports = constructorMethod;