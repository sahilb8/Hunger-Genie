const express = require('express');
const router = express.Router();

const productController = require('../controller/dishes');

router.get('/add-dish',productController.getAddBiryani);
 
router.post('/add-dish',productController.postAddBiryani);

module.exports  = router;
