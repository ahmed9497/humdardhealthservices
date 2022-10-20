const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');
const apiRoute = require("./routes/apiRoute");
require('dotenv').config()
const { dbConnection } = require('./dbConfig');
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(express.urlencoded())
app.use(bodyParser.json());

app.use(cors());
app.use("/",cors(corsOptions), apiRoute);


const port = process.env.PORT || 8000;

if(process.env.NODE_ENV === 'production'){
    app.use('/',express.static(__dirname + '/build'));
}


app.listen(port,()=>{

    dbConnection();
    console.log(`Server is listening in port ${port}`)
});



