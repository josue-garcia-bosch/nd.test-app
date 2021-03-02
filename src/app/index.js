const express = require('express');
const entityRoutes = require('./routes/routes')
const bodyParser = require('body-parser');

const app = express()
const PORT =  3000;

app.use(bodyParser.json());


const mongoose = require('mongoose')


mongoose.connect("mongodb://localhost:27017/entityDB", {}).then(()=> {
    console.log('connected to db');  

    app.use("/api/entities", entityRoutes);

    app.listen(PORT, ()=>{
        console.log(`puerto  ${PORT}`)
    });
});

