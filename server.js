const express = require('express');
const dtenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const routes = require('./routes/routes');



const app = express();

try{
mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true,useUnifiedTopology: true });
}catch (error){
	console.log(error)
}

app.use('/',routes);


app.get('/', (req, res) => {
            

});



app.listen(port, () => console.log(`Listening on port ${port}`));