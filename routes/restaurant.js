const express = require("express");
const path = require('path');

const router = express.Router();

const productsController = require('../controller/dishes');

router.get('/',productsController.getDishes);

module.exports  = router;
