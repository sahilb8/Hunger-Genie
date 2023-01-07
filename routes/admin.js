const express = require('express');
const router = express.Router();

const adminController = require('../controller/adminController');

router.get('/add-dish',adminController.getAddBiryani);
 
router.post('/add-dish',adminController.postAddBiryani);

router.get('/dishes',adminController.getDishes);


module.exports  = router;
