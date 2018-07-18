const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const tasks = require('./routes/tasks');

const port = 3000;
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', task);

app.listen(port, () => {
	console.log(`Server start on port ${port}`);
})