

const { Sequelize } = require('sequelize');

function connectToDatabase(database, username, password, host) {
  const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: 'mysql',
  });

  sequelize.authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch((error) => {
      console.error('Unable to connect to the database:', error);
    });

  return sequelize;
}

module.exports = connectToDatabase;
