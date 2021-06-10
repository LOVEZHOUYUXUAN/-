const jwt  = require('jsonwebtoken');//引入jsonwebtoken包
const tokenKey = 'XfZEpWEn?ARD7rHBN'; //设置密钥

//定义一个对象

const Token = {
	/**
	 * Token 加密方法
	 * @param {加密方法在Token中的数据}
	   * @param {tiem Token 的过期时间，单位为s}
		 * @return {*} 返回一个token  
	 */
	encrypt:function(data,time){
		return jwt.sign (data,tokenKey,{expiresIn:time})
	},
	/**
	 * Token 解密方法
	 * @param token 加密之后的Token
	  * @return 返回对象
      * {{token:boolen(true表示token合法，false则表示不合法)，
	  *    data:*(解密出来的数据或错误信息)}}
	 */
	decrypt:function(token){
		try{
			let data = jwt.verify(token,tokenKey);
			return {
				token:true,
				data:data
			}
		}catch (e){
			return {
				token:false,
				data:e
			}
		}
	}
}
module.exports  = Token;
