const showRoutes = require('./shows');
const searchRoutes = require('./search');
const homeRoute = require('./home');
const path = require('path');

const constructorMethod = (app) => {
  app.use('/shows', showRoutes);
  app.use('/search', searchRoutes);
  app.get('/', homeRoute);

  app.use('*', (req, res) => {
    res.status(404).json({ error: '404 Error: Not found' });
  });
};

module.exports = constructorMethod;