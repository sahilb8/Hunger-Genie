const express = require('express');
const router = express.Router();
const authContoller = require('../controller/authController');

const isAuth = require('../middleware/is-auth');

router.get('/login', authContoller.getLogin);
router.post('/login', authContoller.postLogin);
router.post('/logout', authContoller.postLogout);
router.post('/logout', authContoller.postLogout);
router.post('/logout', authContoller.postLogout);
router.post('/signup', authContoller.postSignup);
router.get('/signup', authContoller.getSignup);

module.exports = router;