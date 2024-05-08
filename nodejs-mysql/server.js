const express = require('express');
const bodyParser = require('body-parser');
//const dbConfig = require('./config/db.js');
const mysql = require('mysql');
const UserRoute = require('./app/routes/User');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/user',UserRoute);
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'nodejs'
// });

// // connect to database
// connection.connect(function (err) {
//     if (err) throw err
//     console.log('You are now connected with mysql database...')
// });
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});