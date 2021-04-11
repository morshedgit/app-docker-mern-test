const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const bodyParser = require('body-parser');

// Routes
const postRouter = require('./src/routes/post.router');


const app = express()


app.use(cors())

// Our DB Configuration
require('./src/database')


app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.json({
        title: 'Hello World!',
        desc: 'This is a test'
    })
})

const {
    MONGO_HOSTNAME,
    MONGO_DB,
    MONGO_PORT,
    NAME
} = process.env;


app.get('/env', (req, res) => {
    res.json({
        MONGO_HOSTNAME,
        MONGO_DB,
        MONGO_PORT,
        NAME
    } )
})


app.use('/posts', postRouter);


app.listen('3000', () => {
    console.log('Server running at port 3000')
})