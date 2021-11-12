const express = require('express');
const cors = require('cors');
// create express app
const app = express();

var corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// define a root route
app.get('/', (req, res) => {
  res.send('Tasks App');
});

require('./components/tasks/routes')(app);

const PORT = process.env.PORT || 8080;

// listen for requests
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

const db = require('./config/database/sequelize');

db.sequelize.sync({ alter: true }).then(() => {
  console.log('Drop and re-sync db.');
});
