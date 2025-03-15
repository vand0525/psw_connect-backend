'use strict';

require('dotenv/config');
const express = require('express');
const morgan = require('morgan');

const jobRouter = require('./routers/job');
const userRouter = require('./routers/user');
const { errorHandler } = require('./middleware/errors');
const { connect } = require('./models/db');
const { auth, requiresAuth } = require('express-openid-connect');
const { syncUser } = require('./middleware/sync');
const cors = require('cors');

console.log(process.env.MONGO_URL);

connect();

const app = express();

app.use(express.json());
app.use(morgan('tiny'));

app.use(
	auth({
		authRequired: false,
		auth0Logout: true,
		secret: process.env.AUTH0_SECRET,
		baseURL: process.env.BASE_URL,
		clientID: process.env.CLIENT_ID,
		issuerBaseURL: process.env.ISSUER_BASE_URL,
	})
);

const corsOptions = {
    origin: 'http://localhost:5500/', // Replace with your frontend URL
    credentials: true,
};

app.use(cors(corsOptions));

app.get('/logout', (req, res) => {
    req.oidc.logout({ returnTo: process.env.BASE_URL});
    res.send('Logged out');
});

app.use(syncUser);

app.get('/api/me', (req, res) => {
	res.json({
		user: req.oidc.user || null,
		idToken: req.oidc.idToken || null,
		accessToken: req.oidc.accessToken ? req.oidc.accessToken.access_token : null,
	});
});

app.use('/api/jobs', requiresAuth(), jobRouter);
// app.use('/api/users', userRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, (err) => {
	if (err) {
		console.error('Something went wrong', err);
		return;
	}
	console.log(`Server running at ${PORT}`);
});
