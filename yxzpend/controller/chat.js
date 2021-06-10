var db = require('../dbzx.js')
var common = require('../common.js')

var chatobj={
	chatclose,
	chatclosee
}


function chatclose(req,res)
{
	let emid = req.params.employeeid
	let hrid = req.params.hrid
	
	db.cc(`select *  from chat where employeeid = '${emid}'`,(result)=>{
             
		let message = []
		let obj = result.recordset[0]
		for(let item in obj)
		{
			 message.push(obj[item])
			
		}
		message.splice(0,1)
		if(message.indexOf(parseInt(hrid)) == -1 )
		{message.unshift(parseInt(hrid))
		message.pop()
	    for(let v = 0;v<message.length;v++)
		{
			message[v] == undefined?message[v] = 0:message[v]=message[v];
		}
		
		db.cc(`update chat set to1 = '${message[0]}' , to2 = '${message[1]}',to3 = '${message[2]}',
		       to4 = '${message[3]}', to5 = '${message[4]}',to6  = '${message[5]}',to7 = '${message[6]}',to8 = '${message[7]}'
			  where employeeid = '${emid}' `
		    ,result=>{
					    
	   })
		}else{
			let index  = message.indexOf(parseInt(hrid))
			let item = message.splice(index,1)
			message.unshift(item)
			for(let v = 0;v<message.length;v++)
			{
				message[v] == undefined?message[v] = 0:message[v] =message[v];
			}
			db.cc(`update chat set to1 = '${message[0]}' , to2 = '${message[1]}',to3 = '${message[2]}',
					       to4 = '${message[3]}', to5 = '${message[4]}',to6  = '${message[5]}',to7 = '${message[6]}',to8 = '${message[7]}'
						  where employeeid = '${emid}' `
					    ,result=>{
								   
			})
		}
		let tomessage = []
		
		message.forEach((item,index)=>{
			db.cc(`select * from registerper where Hregisterper = '${item}'`,result=>{
				
				if(result.recordset.length== 0){tomessage.push('')
				
				if(index == message.length-1)
				 {
					 
					 res.json(tomessage)
					
				 }
				 }else{
				tomessage.push({id:item,
				                headimage:result.recordset[0].headimage,
								name:result.recordset[0].Hname,
								position:result.recordset[0].Hposition,
								company:result.recordset[0].Hcompany
								}
								)
					if(index == message.length-1)	
					{   
						
						res.json(tomessage)
					}
					}
			})
			})
		})
		
	
}


function chatclosee(req,res)
{
	//只要查询8个聊天对象
	
	let emid = req.params.employeeid
	db.cc(`select * from chat where employeeid = '${emid}'`,result=>{
		let message = []
		let obj = result.recordset[0]
		for(let item in obj)
		{
			 message.push(obj[item])
			
		}
		message.splice(0,1)
		
		for(let v = 0;v<message.length;v++)
		{
			message[v] == undefined?message[v] = 0:console.log('没变')
		}
		
		let tomessage = []
		message.forEach((item,index)=>{
			db.cc(`select * from registerper where Hregisterper = '${item}'`,result=>{
				if(result.recordset.length == 0)	
				{
					tomessage.push('')
					if(index == message.length-1)
					{
						
						res.json(tomessage)
					}
				}else{
					tomessage.push({id:item,
					                headimage:result.recordset[0].headimage,
									name:result.recordset[0].Hname,
									position:result.recordset[0].Hposition,
									company:result.recordset[0].Hcompany
									}
									)
						if(index == message.length-1)	
						{   
							
							res.json(tomessage)
						}
				}
			})
		})
	})
}

module.exports = chatobj