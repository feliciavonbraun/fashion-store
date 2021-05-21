const express = require('express');
const deliveryRouter = require("./resources/deliveryResource/deliveryRouter");
const productRouter = require('./resources/productResource/productRouter');
const orderRouter = require('./resources/orderResource/orderRouter');
const userRouter = require('./resources/userResource/userRouter');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
require('express-async-errors');

const PORT = 4000;
const app = express();

app.use(express.json());
app.use(
	cookieSession({
		name: "session",
		secret: "aV3ryS3cr3tK3y",
		secure: false,
		httpOnly: true,
	})
);
/* ALL ROUTES */
app.use(productRouter);
app.use(orderRouter);
app.use(userRouter);
app.use(deliveryRouter);



/* ERROR HANDLING */
app.use((req, res) => {
    res.status(404).json('Wrong')
})
app.use((err, req, res) => {
    console.error(err);
    res.status(500).json(err.message);
});

/* CONNECT TO DATABASE */
(async function run() {
	try {
		await mongoose.connect(
			"mongodb+srv://fashionstore:fashionstore@fashionstore.gsvdx.mongodb.net/fashionStore?retryWrites=true&w=majority",
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false,
			}
		);
		console.log("database is connected");
	} catch (error) {
		console.log(error);
	}

	/* START APPLICATION */
	app.listen(PORT, () => {
		console.log(`server is running at http://localhost:${PORT}`);
	});
})();
