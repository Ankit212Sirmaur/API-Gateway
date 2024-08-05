const express = require('express');

const {ServerConfig} = require('./config');
const apiRoutes = require('./routes');


const app = express();
app.use('/api', apiRoutes);


app.listen(ServerConfig.PORT, () =>{
    console.log(`sucessfully started our server on port : ${ServerConfig.PORT}`);
});
