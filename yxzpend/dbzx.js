var sql =  require('mssql');

var config = {
	user:'sa',
	password:'123',
	server:'localhost',
	database:'yxzp',
	pool: {
	  min: 0,
	  max: 10,
	  idleTimeoutMillis: 3000
	}
}



var db = {};
db.cc = async function(sqls,callback){
	try{
		await sql.connect(config)
		
		let result = await sql.query(sqls)
		callback(result);
		
	}catch(err){
		console.log(err);
	}
	
}
module.exports = db;
