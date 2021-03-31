const todoData = require('../data');

const constructorMethod = (app) => {
  app.get('/', function (request, response) {

    response.render('home', {
      pageTitle: 'So Much ToDo!',
      todoItems: todoData.getAll()
    });
  });

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;