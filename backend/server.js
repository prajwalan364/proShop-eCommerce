const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');

//Router
const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');
const orderRouter = require('./routes/orderRoutes');
const uploadRouter = require('./routes/uploadRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();

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

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

//Routes
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/upload', uploadRouter);

app.get('/api/v1/config/paypal', (req, res) => {
	res.send(process.env.PAYPAL_CLIENT_ID);
});

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

//Error Handler
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server Running in ${process.env.PORT}`));
