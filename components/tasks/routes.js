module.exports = (app) => {
  const tasks = require('./controller');
  var router = require('express').Router();

  //Create new task
  router.post('/', tasks.create);

  //Retrieve all tasks
  router.get('/', tasks.findAll);

  //Retrieve all completed Tasks
  router.get('/status', tasks.findAllCompleted);

  //Retrieve a single Task with ID
  router.get('/:id', tasks.findOne);

  //Update a task with ID
  router.put('/:id', tasks.update);

  //Delete a task with ID
  router.put('/delete/:id', tasks.delete);

  //Delete all tasks
  router.post('/deleteAll', tasks.deleteAll);

  app.use('/api/tasks', router);
};
