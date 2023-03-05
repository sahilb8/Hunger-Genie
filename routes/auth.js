const express = require('express');
const router = express.Router();
const authContoller = require('../controller/authController');

router.get('/login', authContoller.getLogin);
router.post('/login', authContoller.postLogin);
router.post('/logout', authContoller.postLogout);

module.exports = router;