module.exports = function (server)
{
	let io = require('socket.io')(server,
	{ allowEIO3: true,cors:{                //vue-socket.io 版本过低，考虑使用socket.io-client
		origin:'http://localhost:8080',
		credentials:true
	}})
	let arrAllSocketforuser = {}
	let arrAllSocketforhr  = {}
	io.on('connection',(socket)=>{
		console.log('连接了')
		socket.on('join',(obj)=>{
			
			//保存链接的每一个客户端
			if(obj.userid){console.log('用户连接')}
			if(obj.hrid){console.log('hr连接')}
			if(obj.userid)
			{arrAllSocketforuser[obj.userid] = socket
			}else if(obj.hrid){
				arrAllSocketforhr[obj.hrid] = socket
			}
			
		})
		//私发消息
		socket.on('sendmsg',(data)=>{
			console.log('监听到了私发事件');
			if(data.ToHrid)
			{
			 
			if(arrAllSocketforhr[data.ToHrid] == undefined){return}
			let target = arrAllSocketforhr[data.ToHrid]
			
			target.emit('receivmsg',data)
			console.log('发送to hr')
			}else{
				if(arrAllSocketforuser[data.ToUserid] == undefined){return}
				let target = arrAllSocketforuser[data.ToUserid]
				
				target.emit('receivmsg',data)
				console.log('发送to user')
			}
		})
	})
}