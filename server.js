const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const tasks = require('./routes/api/tasks');

const app = express();

// BodyParser Middleware
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

// Mongo Conntected
mongoose
	.connect(db, {
		useNewUrlParser: true
	})
	.then(() => console.log('MongoDB connected...'))
	.catch(error => console.error(`Error: ${error}`))

// Use routes
app.use('/api/tasks', tasks);

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));