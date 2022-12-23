const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminRouter = require('./routes/admin');
const restaurantRouter = require('./routes/restaurant');

const app = express();

app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname,'public')));

app.use('/admin',adminRouter);
app.use(restaurantRouter);

app.use((req,res,next) =>{
  res.status(404).sendFile(path.join(__dirname,'views','404.html'));
});

app.listen(3000);