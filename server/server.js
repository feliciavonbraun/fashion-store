const express = require('express');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
require('express-async-errors');
const PORT = 4000;
const app = express();


app.use(express.json())
app.use(cookieSession({
    name: 'session',
    secret: 'aV3ryS3cr3tK3y',
    secure: false,
    httpOnly: true
}));

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json(err.message);
});

/* CONNECT TO DATABASE */
(async function run() {
    try {
        await mongoose.connect('mongodb+srv://fashionstore:fashionstore@fashionstore.gsvdx.mongodb.net/test',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            }
        );
        console.log('database is connected')
    } catch (error) {
        console.log(error)
    }

    /* START APPLICATION */
    app.listen(PORT, () => {
        console.log(`server is running at http://localhost:${PORT}`)
    })
})();



