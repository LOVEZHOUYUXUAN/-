//no token verified
var express = require('express');
var router = express.Router();

const chatControl = require('../controller/chat.js');

router.get('/:employeeid/:hrid',chatControl.chatclose);
router.get('/:employeeid',chatControl.chatclosee);
 module.exports = router;