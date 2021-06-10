const db = require('../dbzx.js')
const common = require('../common.js')
const Token = require('./token.js')
 const TOKEN_EXPRIRE_SENCOND = 3600
let exportObj = {
	login,
	register,
	registerCompany
}
function login(req,res)
{
	  //在设置了fetch的headers为applicatino:json后(跨域也要检查，看是否是proxy的功劳) 可以看懂body;e1
	var username = req.body.username;
	var password = req.body.password;
	let type= req.body.type
	
	let message = {}
	if(type == 0)
	{db.cc(`select * from employee where Euser = '${username}' `,(result)=>{
	  if(result.recordset.length == 0  )
	  {
		  
		  message.code = 102
		  res.json(message)      
		 
	  }else{
		 
		   for(let item in result.recordset[0])
		   {
			   if( typeof (result.recordset[0][item]) == 'string')
			   {
				   message[item] = result.recordset[0][item].trimRight()
			   }else{
				   message[item] = result.recordset[0][item]
			   }
		   }
		 
		  // let index = result.recordset[0].Epassword.indexOf(' ');
		  // let Epass  =  result.recordset[0].Epassword.slice(0,index)
		  if(password == message.Epassword) 
		  {
			   
			  
			  console.log("登录成功")
			  //将字符串的空格去除
			  let userInfo = {
				  id:message.id
			  }
			  let token = Token.encrypt(userInfo,TOKEN_EXPRIRE_SENCOND)
			  message.token = token
			  message.code = 202
			  message.who = "employee"
			  res.json(message)
			 
		  }else{
			  
			  //code:101代表失败
			  res.json({code:101})
			  
		  }}
		 
	  })
	  }else{
		  db.cc(`select * from registerper where Huser = '${username}'`,(result)=>{
		    if(result.recordset.length == 0  )
		    {
		  	  
		  	  message.code = 102
		  	  res.json(message)      
		  	 
		    }else{
		  	 
		  	   for(let item in result.recordset[0])
		  	   {
		  		   if( typeof (result.recordset[0][item]) == 'string')
		  		   {
		  			   message[item] = result.recordset[0][item].trimRight()
		  		   }else{
		  			   message[item] = result.recordset[0][item]
		  		   }
		  	   }
		  	  
		  	  // let index = result.recordset[0].Epassword.indexOf(' ');
		  	  // let Epass  =  result.recordset[0].Epassword.slice(0,index)
		  	  if(password == message.Hpassword) 
		  	  {
		  		   
		  		  
		  		  //将字符串的空格去除
		  		  let userInfo = {
		  			  id:message.Hregisterper
		  		  }
		  		  let token = Token.encrypt(userInfo,TOKEN_EXPRIRE_SENCOND)
		  		  message.token = token
		  		  message.code = 202
				  
		  		  res.json(message)
		  		 
		  	  }else{
		  		 
		  		  //code:101代表失败
		  		  res.json({code:101})
		  		  
		  	  }}
		  	 
		    })
	  }
		  
	  

}

function register(req,res)
{	
	
	if(req.body.check == true&&req.body.who == "employee")
	{
		//检查是否重用户名
		let username = req.body.username;
		let password = req.body.password
		let message = {}
		db.cc(`select * from employee where Euser = '${username}'`,result=>{
			if(result.recordset.length == 0)
			{
					 //没有重名的
					 
					  message.code = 200
					  console.log(message)
					  res.json(message)      
					 //增加一个hr登录情况
			}else{
				//有重名的
				 message.code = 101
				 console.log(message)
				res.json(message)
			}
		})
	}else if(req.body.check == true&&req.body.who == "hr")
	{
		let username = req.body.username;
		let password = req.body.password;
		let message = {}
		db.cc(`select * from registerper where Huser = '${username}'`,result=>{
			if(result.recordset.length == 0)
			{
					 //没有重名的
					 
					  message.code = 200
					  console.log(message)
					  res.json(message)      
					 //增加一个hr登录情况
			}else{
				//有重名的
				 message.code = 101
				 console.log(message)
				res.json(message)
			}
		})
	}else if (req.body.who == "employee")
	{
		console.log('re')
		var username = req.body.username;
	    var password = req.body.password;
	    var name =  req.body.realname;
	    var age = req.body.age;
	    var education  = req.body.education;
	    var target = req.body.position;
	    var pay = req.body.pay;
		var workplace = req.body.workplace;
		var phone = req.body.phone;
		var email = req.body.email;
	    console.log(username,password,name,age,education,target,pay,workplace,phone,email)
	// db.cc(`select * from worker where Euser = '${username}'`,(result)=>{
	// 	console.log(result);
	// 	if(result.recordset.length == 0)
	// 	{
		try{
			db.cc(`insert into employee (Euser,Eage,Eeducation,Etarget,Epay,Epassword,Ename,Ephone,Elocation,Email) 
			values('${username}','${age}','${education}','${target}','${pay}','${password}','${name}','${phone}','${workplace}','${email}') `,(result)=>{
				if(result){res.json({code:200,
				                     message:'注册成功'})}
									 }
									 )
									 }catch(err){
										 res.status(500)
									 }
	}else if(req.body.who = "hr")
	{
		let username = req.body.username
		let password = req.body.password
		let companyname = req.body.companyname
		let realname = req.body.realname
		let position = req.body.position
		let needposition = req.body.needposition
		let requirement  = req.body.requirement
		let condition = req.body.condition
		let workdescibe = req.body.workdescibe
		let	keywords = req.body.keywords
		let Zlocation = req.body.Zlocation
		let Zpay = req.body.Zpay
		let fuli = req.body.fuli
		let locationdetail = req.body.locationdetail
		let headimage = 'hrheadimage'+parseInt(Math.random()*20+1)+'.png'
		//首先先写入hr
		try{
			db.cc(`select * from company where companyname = '${companyname}'`,result=>{
				if(result.recordset.length == 0)
				{
				  //没有当前公司,要注册公司
				  //返回一个信号，弹出注册框
				  res.json({message:'需要注册该公司'})
				}else{
					db.cc(`insert into registerper (Huser,Hpassword,Hname,Hposition,headimage)
					    values('${username}','${password}','${realname}','${position}','${headimage}')`,result=>{
							db.cc(`select Hregisterper from registerper where Huser = '${username}'`,result=>{
								let hrid = result.recordset[0].Hregisterper
								//加入职位
								db.cc(`insert into position (Bcompany,Blocation,Bposition,Bregisterper,Bwage,Bfuli,Bpostintroduce,Bpostrequirement,keyword,condition,positiondetial)
								       values('${companyname}','${Zlocation}','${needposition}','${hrid}','${Zpay}','${fuli}','${workdescibe}','${requirement}','${req.body.keywords}','${condition}','${locationdetail}')`,result=>{
										   res.json({message:"注册成功"})
									   })
							})
						})
					//加入该职位
					
					
				}
			})
			
			
			//加入职位
			// db.cc(`select id from registerper where Huser = '${username}'`,result=>{
			// 	console.log(result)
			// 	// hrid = result.recordset[0].id
			// })
			
			// db.cc(`insert into position (Bcompany,Blocation,Bposition,Bregisterper,Bwage,Bfuli,Bpostintroduce,Bpostrequirement,keyword,condition) 
			//       values('${companyname}')`)
				}catch(err)
				{
					console.log(err)
					res.json({messgae:err})
				}
	}
	
}
function registerCompany(req,res)
{   
	console.log(11111)
	let companyname = req.body.companyname
	let field = req.body.field
	let finance = req.body.finance 
	let scale = req.body.scale 
	let introduction = req.body.introduction
	console.log(companyname,field,finance,scale,introduction)
	db.cc(`insert into company (companyname,field,finance,scale,introduction) 
	       values('${companyname}','${field}','${finance}','${scale}','${introduction}')`,result=>{
			   res.json({code:200})
		   }) 
	       
	 
}
module.exports = exportObj;