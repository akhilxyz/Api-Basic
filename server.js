require('dotenv').config();
const http = require("http");

//function that will check all the passed .env variables are set
//if any is missing then it will terminate the server
((names) => {
    let shouldExit = false
    for (let i = 0; i < names.length; i++) {
        if (!process.env[names[i]]) {
            shouldExit = true
            console.log(`Missing ${names[i]} in .env`)
        }
    }
    if (shouldExit) {
        console.log('*************Server Terminates**************')
        process.exit(0)
    }
})([
    'DB_URL',
    'BASE_URL',
    'PORT',
    'APP_NAME',
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_USER',
    'SMTP_PASS',
    'MAIL_FROM'
]);

//creates database connection
(async () =>{
    db =  await require("./core/db");
    await db();
})();



//intialize and start express server
const express = require('express');
const app = express();



//require morgan for request logging
const morgan = require("morgan");
app.use(morgan("dev"));

const bodyParser = require('body-parser');

app.use(express.json())
app.use(bodyParser.json());
app.use((req, res, next) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Expose-Headers", "Content-Range")
    
    // if (req.method === "OPTIONS") {
    //     res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    //     return res.status(200).json({});
    // }
    next();
});


let appApi = require('./api/routes');

app.use('/api/', appApi)
app.get('*', function(req, res) {
    res.status(404).send({
        success: false,
        message: "Not Found",
        data:null
    })
});


// const Mailer = require('./core/lib/Mailer');
// Mailer('test mail', 'akhilchoudharyxyz@gmail.com', 'hello how are you')

    //app.listen(process.env.PORT, () => console.log('Rep Server Running...'))
http.createServer(app).listen(process.env.PORT, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log(`${process.env.APP_NAME} server started on port ${process.env.PORT}`);
    }
});
