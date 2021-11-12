const db = require('../../config/database/sequelize');
const Task = db.tasks;
const Op = db.Sequelize.Op;

//create new task
exports.create = (req, res) => {
  // Validate request
  if (!req.body.description) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  const task = {
    description: req.body.description,
    status: req.body.status ? req.body.status : false,
    is_deleted: 0,
  };

  Task.create(task)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the task.',
      });
    });
};

//retrieve all tasks
exports.findAll = (req, res) => {
  const description = req.query.description;
  var condition = description
    ? { description: { [Op.like]: `%${description}%` } }
    : null;

  Task.findAll({ where: { ...condition, is_deleted: 0 } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving tasks.',
      });
    });
};

//find a single task
exports.findOne = (req, res) => {
  const id = req.params.id;

  Task.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find the task with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving task with ID= ' + id,
      });
    });
};

//update a task by id
exports.update = (req, res) => {
  const id = req.params.id;

  Task.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Task was updated succesfully.',
        });
      } else {
        res.send({
          message: `Cannot update Task with id=${id}, maybe Task was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Task with id=' + id,
      });
    });
};

//delete a task by id
exports.delete = (req, res) => {
  const id = req.params.id;

  Task.update(
    { is_deleted: 1 },
    {
      where: { id: id },
    }
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Task was deleted succesfully!',
        });
      } else {
        res.send({
          message: `Cannot delete Task with id=${id}. Maybe task was not found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Task with id=' + id,
      });
    });
};

//delete all tasks from DB
exports.deleteAll = (req, res) => {
  Task.update({ is_deleted: 1 }, { where: {} })
    .then((nums) => {
      res.send({ message: `${nums} Tasks were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all task.',
      });
    });
};

//find all completeded tasks
exports.findAllCompleted = (req, res) => {
  Task.findAll({ where: { status: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving tasks',
      });
    });
};
