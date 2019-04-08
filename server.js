const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const tasks = require('./routes/api/tasks');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');

const app = express();

// BodyParser Middleware
app.use(express.json());

// DB config
const db = config.get('mongoURI');

// Mongo Conntected
mongoose
	.connect(db, {
		useNewUrlParser: true,
		useCreateIndex: true
	})
	.then(() => console.log('MongoDB connected...'))
	.catch(error => console.error(`Error: ${error}`))

// Use routes
app.use('/api/tasks', tasks);
app.use('/api/users', users);
app.use('/api/auth', auth);

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));