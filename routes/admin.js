const express = require('express');
const router = express.Router();

const productController = require('../controller/dishes');

router.get('/add-biryani',productController.getAddBiryani);
 
router.post('/add-biryani',productController.postAddBiryani);

module.exports  = router;
