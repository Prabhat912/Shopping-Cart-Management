const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const usersRoutes = require('./routes/users');

// new way of importing modules 
// we have to add "type":"module" in package.json
//import bodyParser from 'body-parser';
const app=express();
// const PORT = 5000;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

app.use('/',usersRoutes);

app.get('/',(req,res)=>{
    console.log('Get method initiated');
    res.send('Hi from server');

});

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
  });
  
mongoose
    .connect(
      'mongodb+srv://Prabhat0912:5AkgLV9227H0QzCX@cluster0.bfjva7o.mongodb.net/?retryWrites=true&w=majority'
    )
    .then(result => {
      app.listen(5000);
    })
    .catch(err => console.log(err));

//app.listen(PORT,()=> console.log('Server is running at port 5000.'));

