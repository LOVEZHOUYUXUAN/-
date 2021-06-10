//公共方法
const exprotObj = {
	clear,
	checkParams
}

module.exports = exprotObj;

/* 检验参数全局方法
@param params 请求参数集
@param checkArr 需要验证的参数
@param cb 回调 */

function checkParams (params,checkArr)
{
	let flag  = true;
	console.log(params);
	checkArr.forEach(function(item)
	{
		if(params[item] == undefined){
			console.log(flag);
			flag=  false;
		}
	})
	
	return  flag;
}
function clear(obj)
{
	
	for(let item of obj)
	{
		for(let ite in item)
		  { if( typeof (item[ite]) == 'string')
		   {
		    item[ite] =   item[ite].trimRight()
		  }
		  }
	}
	return obj
}