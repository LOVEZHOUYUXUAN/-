var express = require('express');
var router = express.Router();

const workControll =  require('../controllers/worker');

router.get('/',workControll.list)//返回当前用户人信息
router.put('/',workControll.updata)//更新当前用户人信息
router.post('/',workControll.add)//上传简历

module.exports = router;