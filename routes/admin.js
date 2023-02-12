const express = require('express');
const router = express.Router();

const adminController = require('../controller/adminController');

router.get('/add-dish',adminController.getAddDish);
 
router.post('/add-dish',adminController.postAddDish);

router.get('/dishes',adminController.getDishes);

router.get('/edit-dish/:dishId',adminController.getEditDish);

router.post('/edit-dish',adminController.postEditDish);

router.post('/delete-dish',adminController.postDeleteDish);



module.exports  = router;
