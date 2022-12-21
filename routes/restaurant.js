const express = require("express");
const path = require('path');

const routeDir = require('../utils/path');
const router = express.Router();

router.get('/',(req,res,next) => {
res.sendFile(path.join(routeDir,'views/restaurant.html'));
});

module.exports = router;