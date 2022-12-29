const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminRouter = require('./routes/admin');
const restaurantRouter = require('./routes/restaurant');

const error = require('./controller/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views','views');

app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname,'public')));

app.use('/admin',adminRouter);
app.use(restaurantRouter);

app.use(error.get404);

app.listen(3000);