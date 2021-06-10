//职位路由
var express = require('express');
var router = express.Router();

const posiControll =  require('../controller/solvepositionsearch');
router.get('/hotpositionforseven',posiControll.hotpositionforseven);;//定义职位路由，展示最需求职位
router.post('/searchfisrtpage',posiControll.searchfromfisrtpage);//定义公司路由，获取公司职位
router.post('/searchsecondtpage',posiControll.searchfromsecondpage);
router.get('/recommend/:position',posiControll.recommendposition);
router.get('/frompage/:position/:location',posiControll.frompageto);
router.get('/hrpage/:id',posiControll.hrpage);
// router.post('/position',posiControll.position);//定义职位路由，返回对应职位
// router.get('/:id',posiControll.view)//定义职位展示路由，返回职位的对应页面
module.exports = router;

