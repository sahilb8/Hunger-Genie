const express = require('express');
const router = express.Router();

const adminController = require('../controller/adminController');
const isAuth = require('../middleware/is-auth');

router.get('/add-dish',isAuth, adminController.getAddDish);
 
router.post('/add-dish',isAuth, adminController.postAddDish);

router.get('/dishes',isAuth, adminController.getDishes);

router.get('/edit-dish/:dishId',isAuth, adminController.getEditDish);

router.post('/edit-dish',isAuth, adminController.postEditDish);

router.post('/delete-dish',isAuth, adminController.postDeleteDish);



module.exports  = router;
