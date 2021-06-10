const Token  = require('../../controller/token.js');
const Constant = require('../../constant.js');
//中间键
const exportObj = {
	verifyToken
}

module.exports = exportObj;
function verifyToken(req,res,next){
	//验证token中间件
	//如果请求路径是/login ,跳过
	if(req.path === '/login') return next();
	let token  = req.headers.token;//从请求头中获取参数
	//调用解密方法，对token进行解密
	let tokenVerifyObj = Token.decrypt(token);
	if(tokenVerifyObj.token){
		next()
	}else{
		res.json(Constant.TOKEN_ERROR)
	}
}