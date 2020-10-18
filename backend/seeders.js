const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

//Models
const Product = require('./models/productModel');
const User = require('./models/userModel');
const Order = require('./models/orderModel');

//Data
const products = require('./data/products');
const users = require('./data/users');

console.log(path.join(__dirname, '.env'));
dotenv.config({ path: './.env' });
console.log(process.env.DATABASE);

const DB = mongoose
	.connect(process.env.DATABASE, {
		useCreateIndex: true,
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
	.then(() => console.log('MONGODB CONNECTED'))
	.catch((err) => {
		console.log(err);
	});

const importData = async () => {
	try {
		//Deleteing Collections
		await Order.deleteMany();
		//await User.deleteMany();
		await Product.deleteMany();

		const createdUsers = await User.insertMany(users);
		const adminUser = createdUsers[0]._id;

		const sampleProducts = products.map((product) => {
			return { ...product, user: adminUser };
		});

		await Product.insertMany(sampleProducts);
		console.log('Data Imported Sucessfully');
		process.exit(1);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

const deleteData = async () => {
	try {
		//Deleteing Collections
		await Order.deleteMany();
		await User.deleteMany();
		await Product.deleteMany();
		console.log('Data Destroyed');
		process.exit(1);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

if (process.argv[2] === '-d') {
	deleteData();
} else {
	importData();
}
