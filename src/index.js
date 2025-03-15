'use strict'

require('dotenv/config');
const express = require('express');
const morgan = require('morgan');

const jobRouter = require('./routers/job');
const userRouter = require('./routers/user');
const providerRouter = require('./routers/provider');
const {errorHandler} = require('./middleware/errors');
const {connect} = require('./models/db');

console.log(process.env.MONGO_URL);

connect();

const app = express();

app.use(express.json());
app.use(morgan('tiny'));

app.use('/api/jobs', jobRouter);
// app.use('/api/users', userRouter);
// app.use('/api/providers', providerRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, (err) => {
    if (err) {
        console.error('Something went wrong', err);
        return;
    }
    console.log(`Server running at ${PORT}`);
})