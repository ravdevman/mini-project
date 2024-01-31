const express = require('express');
const sequelize = require('./config/database.js');
const cors = require('cors');
const Member =  require('./models/member.js');
const memberRoute = require('./routes/memberRoute.js');

const app = express();

app.use(cors())
app.use(express.json())
app.use('/member', memberRoute);

// connect to database and lunch server and init
try {
	sequelize.authenticate();
	console.log('Connection has been established successfully.');
	sequelize.sync().then(res => {
		console.log(res)
		app.listen(3000, () => {
			console.log('Server is running at http://localhost:3000/');
		});
	}).catch(err => console.log(err))
} catch (error) {
	console.error('Unable to connect to the database:', error);
	process.exit(1);
}


module.exports = app;