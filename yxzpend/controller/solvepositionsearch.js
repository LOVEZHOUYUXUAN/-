const db = require('../dbzx.js')
const common = require('../common.js')
const exportobj = {
	searchfromfisrtpage,
	hotpositionforseven,
	recommendposition,
	frompageto,
	hrpage,
	searchfromsecondpage
}

function searchfromfisrtpage(req,res)
{   
	let data
    if(req.body.position != undefined &&req.body.company != undefined)
	{
	 //先查找公司，如果有的话就再在这些公司里面找
	 let companyname = req.body.company 
	 db.cc(`select * from company where companyname like '%${companyname}%'`  ,result=>{
		 if(result.recordset.length == 0)
		 {
			 //公司名无效
			 //直接搜索职位名称并返回所有数据
			 let position = req.body.position 
			 db.cc(`select * from position where Bposition like '%${position}%'`,result =>{
				 //在查询每个职位的公司信息
				 let data = result.recordset
				 data.forEach((item,index)=>
				 {                                    
					 db.cc(`select * from company where companyname = '${item.Bcompany}' `,result=>{
						 item.imageurl = result.recordset[0].imageurl
						 item.field = result.recordset[0].field
						 item.scale  = result.recordset[0].scale
						 item.finance = result.recordset[0].finance
						 item.introduce = result.recordset[0].introduction
						 
					 })                                                           //int类型也要用引号括起来作比较
					 db.cc(`select * from registerper where Hregisterper = '${item.Bregisterper}'`,result=>{
						 item.hrname =result.recordset[0].Hname
						 item.hrid = result.recordset[0].Hregisterper
						 if(index  == data.length-1)
						 {
						 	 
						 	let message = common.clear(data)
						 	
						 	res.json(message)
						 }
					 })
				 })
				
				 
			 })
		 }else{
			 //如果公司名有效
			 let position = req.body.position
			 
			 db.cc(`select * from position where Bcompany like '%${companyname}%' and Bposition like '%${position}%'`,result=>{
				 let data = result.recordset
				 data.forEach((item,index)=>
				 {                                    
				 					 db.cc(`select * from company where companyname = '${item.Bcompany}' `,result=>{
				 						 item.imageurl = result.recordset[0].imageurl
				 						 item.field = result.recordset[0].field
				 						 item.scale  = result.recordset[0].scale
				 						 item.finance = result.recordset[0].finance
				 						 item.introduce = result.recordset[0].introduction
				 						 
				 					 })                                                           //int类型也要用引号括起来作比较
				 					 db.cc(`select * from registerper where Hregisterper = '${item.Bregisterper}'`,result=>{
				 						 item.hrname =result.recordset[0].Hname
										 item.hrid = result.recordset[0].Hregisterper
				 						 if(index  == data.length-1)
				 						 {
				 						 	 
				 						 	let message = common.clear(data)
				 						 	
				 						 	res.json(message)
				 						 }
				 					 })
				 })
			 })
		 }
	 })
	}else if(req.body.position != undefined &&req.body.positionOrcompany == undefined)
	{
		//只需查询position即可
		let position = req.body.position
		db.cc(`select * from position where Bposition like '%${position}%'`,result=>{
			let data = result.recordset
			data.forEach((item,index)=>
			{                                    
								 db.cc(`select * from company where companyname = '${item.Bcompany}' `,result=>{
									 item.imageurl = result.recordset[0].imageurl
									 item.field = result.recordset[0].field
									 item.scale  = result.recordset[0].scale
									 item.finance = result.recordset[0].finance
									 item.introduce = result.recordset[0].introduction
									 
								 })                                                           //int类型也要用引号括起来作比较
								 db.cc(`select * from registerper where Hregisterper = '${item.Bregisterper}'`,result=>{
									 item.hrname =result.recordset[0].Hname
									 item.hrid = result.recordset[0].Hregisterper
									 if(index  == data.length-1)
									 {
									 	 
									 	let message = common.clear(data)
									 	
									 	res.json(message)
									 }
								 })
			})
		})
	}else if(req.body.positionOrcompany != undefined)
	{  
		let positionOrcompany = req.body.positionOrcompany.split(' ')[0]//优化一下
        //先在position里找，找不到再去公司里找
		
		db.cc(`select * from position where Bposition like '%${positionOrcompany}%'`,result=>{
			if(result.recordset.length == 0)
			{
				db.cc(`select * from position where Bcompany like '%${positionOrcompany}%'`,result=>{
					if(result.recordset.length == 0)
					{
						
						let message = ''
						res.json(message)
					}else{
						let data = result.recordset
						data.forEach((item,index)=>
						{                                    
											 db.cc(`select * from company where companyname = '${item.Bcompany}' `,result=>{
												 item.imageurl = result.recordset[0].imageurl
												 item.field = result.recordset[0].field
												 item.scale  = result.recordset[0].scale
												 item.finance = result.recordset[0].finance
												 item.introduce = result.recordset[0].introduction
												 
											 })                                                           //int类型也要用引号括起来作比较
											 db.cc(`select * from registerper where Hregisterper = '${item.Bregisterper}'`,result=>{
												 item.hrname =result.recordset[0].Hname
												 item.hrid = result.recordset[0].Hregisterper
												 if(index  == data.length-1)
												 {
												 	 
												 	let message = common.clear(data)
												 	
												 	res.json(message)
												 }
											 })
						})
					}
				})
			}else{
				
				let data = result.recordset
				data.forEach((item,index)=>
				{                                    
									 db.cc(`select * from company where companyname = '${item.Bcompany}' `,result=>{
										 item.imageurl = result.recordset[0].imageurl
										 item.field = result.recordset[0].field
										 item.scale  = result.recordset[0].scale
										 item.finance = result.recordset[0].finance
										 item.introduce = result.recordset[0].introduction
										 
									 })                                                           //int类型也要用引号括起来作比较
									 db.cc(`select * from registerper where Hregisterper = '${item.Bregisterper}'`,result=>{
										 item.hrname =result.recordset[0].Hname
										 item.hrid = result.recordset[0].Hregisterper
										 if(index  == data.length-1)
										 {
										 	 
										 	let message = common.clear(data)
										 	
										 	res.json(message)
										 }
									 })
				})
			}
		})
	}
	
}

function searchfromsecondpage(req,res)
{
	console.log(3333)
	console.log(req.body)
	if(req.body.input)
	{
		let positionOrcompany  = req.body.input 
		let location = req.body.location
		//首先有可能是职位
		if(location=='全国'){location = ''}
		db.cc(`select * from position where Blocation like '%${location}%' and Bposition like '%${positionOrcompany}%'`,result=>{
			if(result.recordset.length == 0)
			{
				db.cc(`select * from position where Blocation = '${location}' and Bcompany like '%${positionOrcompany}%'`,result=>{
					if(result.recordset.length == 0)
					{
						let message = ''
						res.json(message)
					}else{
						let data = result.recordset
						data.forEach((item,index)=>
						{                                    
											 db.cc(`select * from company where companyname = '${item.Bcompany}' `,result=>{
												 item.imageurl = result.recordset[0].imageurl
												 item.field = result.recordset[0].field
												 item.scale  = result.recordset[0].scale
												 item.finance = result.recordset[0].finance
												 item.introduce = result.recordset[0].introduction
												 
											 })                                                           //int类型也要用引号括起来作比较
											 db.cc(`select * from registerper where Hregisterper = '${item.Bregisterper}'`,result=>{
												 item.hrname =result.recordset[0].Hname
												 item.hrid = result.recordset[0].Hregisterper
												 if(index  == data.length-1)
												 {
												 	 
												 	let message = common.clear(data)
												 	
												 	res.json(message)
												 }
											 })
						})
					}
				})
			}else{
				let data = result.recordset
				data.forEach((item,index)=>
				{                                    
									 db.cc(`select * from company where companyname = '${item.Bcompany}' `,result=>{
										 item.imageurl = result.recordset[0].imageurl
										 item.field = result.recordset[0].field
										 item.scale  = result.recordset[0].scale
										 item.finance = result.recordset[0].finance
										 item.introduce = result.recordset[0].introduction
										 
									 })                                                           //int类型也要用引号括起来作比较
									 db.cc(`select * from registerper where Hregisterper = '${item.Bregisterper}'`,result=>{
										 item.hrname =result.recordset[0].Hname
										 item.hrid = result.recordset[0].Hregisterper
										 if(index  == data.length-1)
										 {
										 	 
										 	let message = common.clear(data)
										 	
										 	res.json(message)
										 }
									 })
				})
			}
		})
	}else{
		let location = req.body.location
		if(location=='全国'){location = ''}
		let positiontype = req.body.positiontype
		let company  = req.body.company
		if(positiontype == ''&&company=='')
		{   
			console.log('逻辑1')
			db.cc(`select * from position where Blocation like '%${location}%'`,result=>{
				if(result.recordset.length==0)
				{
					let message = ''
					res.json(message)
				}else{
					let data = result.recordset
					data.forEach((item,index)=>
					{                                    
										 db.cc(`select * from company where companyname = '${item.Bcompany}' `,result=>{
											 item.imageurl = result.recordset[0].imageurl
											 item.field = result.recordset[0].field
											 item.scale  = result.recordset[0].scale
											 item.finance = result.recordset[0].finance
											 item.introduce = result.recordset[0].introduction
											 
										 })                                                           //int类型也要用引号括起来作比较
										 db.cc(`select * from registerper where Hregisterper = '${item.Bregisterper}'`,result=>{
											 item.hrname =result.recordset[0].Hname
											 item.hrid = result.recordset[0].Hregisterper
											 if(index  == data.length-1)
											 {
											 	 
											 	let message = common.clear(data)
											 	
											 	res.json(message)
											 }
										 })
					})
				}
			})
		}else if(positiontype == ''){
			
			db.cc(`select * from position where Blocation like '%${location}%' and Bcompany like '%${company}%' `,result=>{
				if(result.recordset.length==0)
				{
					let message = ''
					res.json(message)
				}else{
					let data = result.recordset
					data.forEach((item,index)=>
					{                                    
										 db.cc(`select * from company where companyname = '${item.Bcompany}' `,result=>{
											 item.imageurl = result.recordset[0].imageurl
											 item.field = result.recordset[0].field
											 item.scale  = result.recordset[0].scale
											 item.finance = result.recordset[0].finance
											 item.introduce = result.recordset[0].introduction
											 
										 })                                                           //int类型也要用引号括起来作比较
										 db.cc(`select * from registerper where Hregisterper = '${item.Bregisterper}'`,result=>{
											 item.hrname =result.recordset[0].Hname
											 item.hrid = result.recordset[0].Hregisterper
											 if(index  == data.length-1)
											 {
											 	 
											 	let message = common.clear(data)
											 	
											 	res.json(message)
											 }
										 })
					})
				}
			})
		}else if(company=='')
		{
			db.cc(`select * from position where Blocation like '%${location}%' and Bposition like '%${positiontype}%' `,result=>{
				if(result.recordset.length==0)
				{
					let message = ''
					res.json(message)
				}else{
					let data = result.recordset
					data.forEach((item,index)=>
					{                                    
										 db.cc(`select * from company where companyname = '${item.Bcompany}' `,result=>{
											 item.imageurl = result.recordset[0].imageurl
											 item.field = result.recordset[0].field
											 item.scale  = result.recordset[0].scale
											 item.finance = result.recordset[0].finance
											 item.introduce = result.recordset[0].introduction
											 
										 })                                                           //int类型也要用引号括起来作比较
										 db.cc(`select * from registerper where Hregisterper = '${item.Bregisterper}'`,result=>{
											 item.hrname =result.recordset[0].Hname
											 item.hrid = result.recordset[0].Hregisterper
											 if(index  == data.length-1)
											 {
											 	 
											 	let message = common.clear(data)
											 	
											 	res.json(message)
											 }
										 })
					})
				}
			})
		}
	}
}
function hotpositionforseven(req,res)
{
	db.cc(`select Bposition,count(id) from position group by Bposition order by count(id) desc`,result=>{
		res.json(result.recordset.splice(0,7))
	})
}

function recommendposition(req,res)
{
	 let position  = req.params.position
	 db.cc(`select * from position where Bposition like '%${position}%' `,result=>{
		 if(result.recordset.length >18)  //应该再写一个工作类型表，然后把关键词储存起来，然后再用关键词去找同样类型的职位
		 {
			 
			 let data = result.recordset.splice(0,18)
			 data.forEach((item,index)=>
			 {                                    
			 					 db.cc(`select * from company where companyname = '${item.Bcompany}' `,result=>{
			 						 item.imageurl = result.recordset[0].imageurl
			 						 item.field = result.recordset[0].field
			 						 item.scale  = result.recordset[0].scale
			 						 item.finance = result.recordset[0].finance
			 						 item.introduce = result.recordset[0].introduction
			 						 
			 					 })                                                           //int类型也要用引号括起来作比较
			 					 db.cc(`select * from registerper where Hregisterper = '${item.Bregisterper}'`,result=>{
			 						 item.hrname =result.recordset[0].Hname
									 item.hrid = result.recordset[0].Hregisterper
			 						 if(index  == data.length-1)
			 						 {
			 						 	 
			 						 	let message = common.clear(data)
			 						 	
			 						 	res.json(message)
			 						 }
			 					 })
			 })
		 }else{
			 let data = result.recordset
			 let num = 18 - result.recordset.length
			 db.cc(`select * from position where Bposition not like '%${position}%'`,result=>{
				 let message = [...data,...result.recordset.splice(0,num)]
				 
				 message.forEach((item,index)=>
				 {                                    
				 					 db.cc(`select * from company where companyname = '${item.Bcompany}' `,result=>{
				 						 item.imageurl = result.recordset[0].imageurl
				 						 item.field = result.recordset[0].field
				 						 item.scale  = result.recordset[0].scale
				 						 item.finance = result.recordset[0].finance
				 						 item.introduce = result.recordset[0].introduction
				 						 
				 					 })                                                           //int类型也要用引号括起来作比较
				 					 db.cc(`select * from registerper where Hregisterper = '${item.Bregisterper}'`,result=>{
				 						 item.hrname =result.recordset[0].Hname
										 item.hrid = result.recordset[0].Hregisterper
				 						 if(index  == message.length-1)
				 						 {
				 						 	
				 						 	let message1 = common.clear(message)
				 						 	
				 						 	res.json(message1)
				 						 }
				 					 })
				 })
			 })
		 }
	 })
}
 
function frompageto(req,res)
{
	
	let massage = req.params
	
	db.cc(`select * from position where (Bposition like '%${massage.position}%' and Blocation  = '${massage.location}') or Bposition like '%${massage.position}%' or Blocation  = '${massage.location}'`,result=>{
		let data = result.recordset
		data.forEach((item,index)=>
		{                                    
							 db.cc(`select * from company where companyname = '${item.Bcompany}' `,result=>{
								 item.imageurl = result.recordset[0].imageurl
								 item.field = result.recordset[0].field
								 item.scale  = result.recordset[0].scale
								 item.finance = result.recordset[0].finance
								 item.introduce = result.recordset[0].introduction
								 
							 })                                                           //int类型也要用引号括起来作比较
							 db.cc(`select * from registerper where Hregisterper = '${item.Bregisterper}'`,result=>{
								 item.hrname =result.recordset[0].Hname
								 item.hrid = result.recordset[0].Hregisterper
								 if(index  == data.length-1)
								 {
								 	 
								 	let message = common.clear(data)
								 	
								 	res.json(message)
								 }
							 })
		})
	})
}

function hrpage(req,res)
{
	let id = req.params.id
	db.cc(`select * from position where id  = '${id}'`,result=>{
		let data2 = result.recordset
		let company = result.recordset[0].Bcompany
		db.cc(`select * from position where Bcompany = '${company}'`,result=>{
			
			let data1 = result.recordset.filter(item=>{
				return item.id != data2[0].id
			})
			data1 = data1.splice(0,6)
			let data = [...data2,...data1]
			
			data.forEach((item,index)=>
			{                                    
								 db.cc(`select * from company where companyname = '${item.Bcompany}' `,result=>{
									 item.imageurl = result.recordset[0].imageurl
									 item.field = result.recordset[0].field
									 item.scale  = result.recordset[0].scale
									 item.finance = result.recordset[0].finance
									 item.introduce = result.recordset[0].introduction
									 
								 })                                                           //int类型也要用引号括起来作比较
								 db.cc(`select * from registerper where Hregisterper = '${item.Bregisterper}'`,result=>{
									 item.hrname =result.recordset[0].Hname
									 item.hrid = result.recordset[0].Hregisterper
									 item.hrheadimage = result.recordset[0].headimage
									 item.hrposition = result.recordset[0].Hposition
									 if(index  == data.length-1)
									 {
									 	
									 	let message = common.clear(data)
									 	
									 	res.json(message)
									 }
								 })
			})
		})
	})
}
module.exports = exportobj