const { Sequelize } = require('sequelize');

const connection = new Sequelize(
  'd96b3a8gje5mgj',
  'wbssacaiinmzxy',
  '4a056f4a934b4265780585d5e99af6c17f5b594077fee392da4545c40c8f6121',
  {
    host: 'ec2-54-226-56-198.compute-1.amazonaws.com',
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
          require: true, // This will help you. But you will see nwe error
          rejectUnauthorized: false // This line will fix new error
        }
      },
  }
);

try {
  connection.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

module.exports = connection;
