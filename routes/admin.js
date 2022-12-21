const path = require('path');

const express = require('express');
const router = express.Router();
const routeDir = require('../utils/path');

router.get('/add-biryani',(req,res,next) => {
    res.sendFile(path.join(routeDir,'views/add-biryani.html'));
});
 
router.post('/biryani',(req,res,next) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;