module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define('task', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.BOOLEAN,
    },
    is_deleted: {
      type: Sequelize.BOOLEAN,
    },
  });

  return Task;
};
