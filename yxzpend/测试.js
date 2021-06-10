 var db = require('./dbzx.js')
 var username =  '1812';
 var password  = '827292250zyx';
 var name = '雷雨';
 var age  = '25';
 var education = '本科';
 var target =  'java工程师';
 var pay = '5000';
 
 
//  console.log(`insert into worker(Ename,Eage,Eeducation,Etarget,Epay,Euser,Epassword)
//  			values('${name}',${age},${education},${target},${pay},${username},${password})`);
// console.log("insert into worker(Ename,Eage,Eeducation,Etarget,Epay,Euser,Epassword) values(" +'name'+"," +age+ "," +education +"," +target +"," +pay +"," +username +"," +password +")")
   // db.cc(`select * from worker where Euser = ${username}`,(result)=>
   // {
	  // // if(result == undefined){console.log(result)};
	  //  // console.log(result);
	  //  console.log(result);
   // })
// function a(b)
// {
// 	try{
// 		throw 3;//抛出错误后后面的语句不会运行，catch中语句运行之后运行catch之后的语句，运行完程序；
// 		console.log(1);
// 	}catch(err)
// 	{
// 		console.log(err);
// 		}
// }
// a(1);
// console.log(4);

db.cc(`select Bposition, count(Bposition) from position group by Bposition order by count(Bposition) desc`,(result)=>{
	console.log(result.recordset.slice(0,7));
})