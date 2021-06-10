<template>
	<div>
	<div id = "ll"> 
   <el-form :rules="rules" status-icon  ref = "loginform" :model="loginform" label-width="100px"  ><!-- model做验证用 -->
    <h3 style= 'text-align: center;'><i class= "el-icon-menu"></i>宇轩招聘个人登录</h3>
	<el-button style= "margin-bottom: 10px;margin-left: 160px;" @click.native= "logintype">招聘类型点击切换:<span id = "s5">应聘者</span></el-button>
	<el-form-item label="用户名"  prop="user">
		<el-input  clearable size = "medium" v-model="loginform.user"  placeholder="请输入用户名" prefix-icon = "el-icon-user" type="text"></el-input>
	</el-form-item>
	<el-form-item label = "密码" prop ="password">
		<el-input  v-model = "loginform.password" placeholder="请输入密码"  prefix-icon ="el-icon-lock" show-password></el-input>
	</el-form-item>
	<el-form-item>
		<el-button type="primary" @click="submitForm('loginform')">登录</el-button>
		<el-button type ="primary" @click = "turntoRegister">没有账号，立即注册</el-button>
	</el-form-item>
   </el-form>
   
   </div>
  <svg height="100%" width="100%" id="svg" viewBox="0 0 1440 500" xmlns="http://www.w3.org/2000/svg" class="transition duration-300 ease-in-out delay-150"><defs><linearGradient id="gradient"><stop offset="5%" stop-color="#fcb90088"></stop><stop offset="95%" stop-color="#32ded488"></stop></linearGradient></defs><path d="M 0,500 C 0,500 0,166 0,166 C 42.58991778794049,147.91568637817548 85.17983557588099,129.83137275635096 131,125 C 176.820164424119,120.16862724364906 225.87057548441663,128.59019535277167 285,151 C 344.12942451558337,173.40980464722833 413.3378624864523,209.8078458325623 457,196 C 500.6621375135477,182.1921541674377 518.7779745697745,118.17842131697904 558,108 C 597.2220254302255,97.82157868302096 657.5502392344497,141.47846889952152 714,151 C 770.4497607655503,160.52153110047848 823.0210684924266,135.90770308493487 867,136 C 910.9789315075734,136.09229691506513 946.3654867958444,160.8907187607391 986,176 C 1025.6345132041556,191.1092812392609 1069.5169843241958,196.5294218721087 1129,190 C 1188.4830156758042,183.4705781278913 1263.5665759073727,164.9915937508261 1318,159 C 1372.4334240926273,153.0084062491739 1406.2167120463137,159.50420312458695 1440,166 C 1440,166 1440,500 1440,500 Z" stroke="none" stroke-width="0" fill="url(#gradient)" class="transition-all duration-300 ease-in-out delay-150"></path><defs><linearGradient id="gradient"><stop offset="5%" stop-color="#fcb900ff"></stop><stop offset="95%" stop-color="#32ded4ff"></stop></linearGradient></defs><path d="M 0,500 C 0,500 0,333 0,333 C 53.07520685188612,333.1333765100849 106.15041370377224,333.26675302016974 154,337 C 201.84958629622776,340.73324697983026 244.47355203679723,348.066364429406 294,361 C 343.52644796320277,373.933635570594 399.9553781490391,392.4677892622062 451,392 C 502.0446218509609,391.5322107377938 547.7049353670465,372.06247852176904 583,353 C 618.2950646329535,333.93752147823096 643.2248803827752,315.2822966507177 694,308 C 744.7751196172248,300.7177033492823 821.395543101853,304.8083348753601 872,299 C 922.604456898147,293.1916651246399 947.1929472098125,277.4843638478416 996,281 C 1044.8070527901875,284.5156361521584 1117.8326680588966,307.2542097332734 1172,325 C 1226.1673319411034,342.7457902667266 1261.476380554601,355.4"none" stroke-width="0" fill="url(#gradient)" class="transition-all duration-300 ease-in-out delay-150"></path></svg>
  </div>
</template>

<script>
	import {isvalidPhone,isvalidPass,isvalidUser} from "../../validator.js"
 export default {
	 data(){
		  
		 var validateUser = (rule,value,callback)=>{
			 
			 if(!isvalidUser(value))
			 {
				 callback(
				    new Error('用户名要求数字，字母，下划线的组合，数字字母必须存在，长度在4-15个字符')
				 )
			 }else{
				 callback();
			 }
			 
		 }
		 var validatePass = (rule,value,callback)=>{
			 if(!isvalidPass(value))
			 {
				 callback(new Error('以字母开头，长度在4~20之间，只能包含字母，数字和下划线'))
			 }else{
				 callback();
			 }
		 }
		 return {
			loginform:{ user:'',
			 password:'',
			 type :0
			 },
			 rules:{
				 user:[
					 { required :true,message:'请输入用户名',trigger:'blur'},
					 {validator:validateUser,trigger:"blur"}
					 
				 ],
				 password:[
					 {required:true,message:'请输入密码',trigger:'blur'},
					 {validator:validatePass,trigger:'blur'}]
			 }
		 }
	 },
	 methods:{
		 join()
		 {
			 let data
			 if(this.loginform.type ==0)
			 {
			 		 data = {userid:this.$store.state.userId}
			 }else{
			 	  data	=	{ hrid:this.$store.state.Hregisterper}
			 }
		 this.$socket.emit("join",data)
		 
		 console.log('正在连接join')
		 },
		 logintype()
		 {	 
			 if(this.loginform.type ==0)
			 {
				document.getElementById("s5").innerText = "招聘者"
				 this.loginform.type =1
			 }else{
				 document.getElementById("s5").innerText = "应聘者"
				 this.loginform.type = 0 
			 }
			
		 },
		 turntoRegister(){
			 this.$router.push('register');
		 },
		 submitForm(formname)
		 {
			 
			 this.$refs[formname].validate((valid)=>{
				 if(valid)
				 {
					 
					 fetch("http://localhost:3000/loginfor",{
						 method:'POST',
						 body:JSON.stringify({username:this.loginform.user,
						                      password: this.loginform.password,
											  type:this.loginform.type
											  }),
						 // mode:"no-cors",//默认是cors的
						 headers: new Headers({
						    'Content-Type': 'application/json'
						  })
						 
					 }).then(response =>{
						  return response.json()
					 }).then( resjson=>{
						 if(resjson.code == 202)
					  {	
						  if(this.loginform.type == 0)
						{ console.log(resjson)
						this.$store.commit('setUser',resjson)
						this.$store.commit('setToken',resjson.token)
						this.$message({
							 message:'恭喜你，登陆成功',
							 type:'success',
						 })
						 this.join();//join也要分hr和employee
						 this.$router.push('/');
						 this.$store.commit('changeShowNav');
						 }else{
							 //hr登录逻辑
							 this.$store.commit('setHr',resjson)
							 this.$store.commit('setToken',resjson.token)
							 this.$message({
							 	 message:'恭喜你，登陆成功',
							 	 type:'success',
							  })
							 this.join();
							 this.$router.push('/hrchat')
						 }
						 
						
						 
					 }else if(resjson.code == 101){
						 this.$message({
						 	 message:'密码错误',
						 	 type:'error',
						  })
					 }else if(resjson.code == 102)
					 {
						 this.$message({
						 	 message:'用户名不存在',
						 	 type:'error',
						  })
					 }
					 })  
				 }else{
					 alert('error submit')
					 return false;
				 }
			 })
		 },
		 
		 
	 }
	 
		
	}
</script>

<style scoped>
	#ll{
		margin: 0 auto;
		margin-top: 40px;
		width: 500px;
		height: 200px;
	}
</style>