const express = require('express');
require('dotenv').config();
const app = express();
const sequelize = require('./db');
sequelize.sync();
const user = require('./controllers/usercontroller')
app.use(express.json());
const comment = require('./controllers/commcontroller')
app.use(require('./middleware/headers'))

app.listen(3000, function() {
    console.log('Hello I am at 3000')
});

app.use('/api/test', function (req, res) {
    res.send("test info");
});

app.use('/user', user);

app.use(require('./middleware/validate-session'));
app.use('/comment', comment);