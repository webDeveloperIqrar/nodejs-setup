const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/db.js');
const mongoose = require('mongoose');
const UserRoute = require('./app/routes/User');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/user',UserRoute);
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1:27017/nodejs")
    .then(() => {
        console.log("Connected To DB Sucessfully....")
    })
    .catch((err) => {
        console.log(err)
    })
// mongoose.connect(dbConfig.url, {
//     useNewUrlParser: true
// }).then(() => {
//     console.log("Databse Connected Successfully!!");    
// }).catch(err => {
//     console.log('Could not connect to the database', err);
//     process.exit();
// });
// app.get('/', (req, res) => {
//     res.json({"message": "Hello Crud Node Express"});
// });
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});