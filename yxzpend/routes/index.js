var express = require('express');
var router = express.Router();

//登录注册路由
/* GET home page. */
const IndexController   = require('../controller/index');
router.post('/loginfor',IndexController.login);

router.post('/register', IndexController.register);
router.post('/registercompany', IndexController.registerCompany);
module.exports = router;
