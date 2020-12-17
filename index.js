
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const cors = require('./middleware/cors');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = process.env.SERVER_PORT;
const host = process.env.SERVER_HOST;
const router = require('./router');

app.use(cors);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname,'public')));

app.use('/sms',router.smsRouter);
app.listen(port,host)
