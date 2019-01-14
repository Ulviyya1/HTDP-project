const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');

const db =knex({
	client:'pg',
	connection:{
		host:'127.0.0.1',
		user: 'postgres',
		password: '.......',
		database: 'coffee'
	}
})

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/sendorder', (req, res) => {
	const { name, surname, product, sizeNumber, address, email,  phoneNumber} = req.body;

	db.insert({
		name: name,
		surname:surname,
		product:product,
		address: address,
		size: sizeNumber,
		number: phoneNumber,
		email: email
	}).into('orders').returning('*')
	.then(data => res.json(data[0]))
	.catch(err => res.status(400).json('error'))
})


app.listen(3000, () => {
	console.log('app is running on port 3000');
})
