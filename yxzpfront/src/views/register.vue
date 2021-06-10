<template>
	<div style = "padding: 10px; width: 500px;height: 700px;border: 1px solid #42B983;margin-top: 50px;margin-left: 500px;border-radius: 10px;">
		<div v-if = "step == 0">
		<el-row>
			<el-button style = "margin-left: 150px;" @click.native = "is = 0">我要找工作</el-button>
			<el-button style = "margin-right: 100px;" @click.native = "is = 1">我要招聘</el-button>
		</el-row>
		<el-row style = "margin-top: 50px;">
			<el-input style = "width: 300px;margin-left: 100px;" v-model = "username" placeholder="输入账号"></el-input>
		</el-row>
		<el-row style = "margin-top: 50px;">
			<el-input style = "width: 300px;margin-left: 100px;"  v-model = "password" placeholder="输入密码"></el-input>
		</el-row>
		<el-row style = "margin-top: 50px;" type="flex" justify="center">
			<el-button style= "width: 400px;background-color: #179A16;" @click.native = "check">注册</el-button>
		</el-row>
		</div>
		<div v-else-if="step == 1&&is == 0">
			<!-- 这是找工作的路径， -->
			<span style = "font-size: large; font-weight: 600;"> 请完成信息填写</span>
			<el-row style = "margin-top: 10px;">
				<el-input placeholder="填写真实姓名" v-model = "realname"></el-input>
			</el-row>
			<el-row style = "margin-top: 10px;">
				<el-input placeholder="年龄" v-model = "age"></el-input>
			</el-row>
			<el-row style = "margin-top: 10px;">
				<el-input placeholder="电话" v-model = "phone"></el-input>
			</el-row>
			<el-row style = "margin-top: 10px;">
				<el-input placeholder="邮箱" v-model = "email"></el-input>
			</el-row>
			<el-row style = "margin-top: 10px;">
				<el-input placeholder="期望职位" v-model = "wantposition"></el-input>
			</el-row>
			<el-row style = "margin-top: 10px;">
				<el-input placeholder="工作地点" v-model = "workplace"></el-input>
			</el-row>
			<el-row style = "margin-top: 10px;">
				<el-input placeholder="薪资" v-model = "pay"></el-input>
			</el-row style = "margin-top: 10px;">
			<el-row style = "margin-top: 10px;">
			<el-input placeholder="教育情况(几几年毕业,学历,是否考虑机会)" v-model = "education"></el-input>
			</el-row style = "margin-top: 10px;">
			 <!-- 首次注册随机简单头像，可在网页内更换 -->
			 <el-row type="flex" justify="center"> 
			 <el-button @click = "register">完成</el-button>
			 </el-row>
		</div>
		
		<div v-else-if="step == 1&& is == 1" >
			<!-- 这是招聘者路径 -->
			<el-row style = "margin-top: 10px;">
				<el-input placeholder="公司名称" v-model="companyname"></el-input>
			</el-row>
			<el-row style = "margin-top: 10px;">
				<el-input placeholder="你的姓名" v-model="Zrealname"></el-input>
			</el-row>
			<el-row style = "margin-top: 10px;">
				<el-input placeholder="你的职位" v-model="position"></el-input>
			</el-row>
			<el-row style = "margin-top: 10px;">
				<el-input placeholder="需求职位" v-model="needposition"></el-input>
			</el-row>
			<el-row style = "margin-top: 10px;">
				<el-input placeholder="职位要求的技能" type="textarea" v-model="requirement"></el-input>
			</el-row>
			<el-row style = "margin-top: 10px;">
				<el-input placeholder="small要求"  v-model="condition"></el-input>
			</el-row>
			<el-row style = "margin-top: 10px;">
				<el-input placeholder="岗位介绍" type = "textarea" v-model="workdescibe"></el-input>
			</el-row>
			<el-row style = "margin-top: 10px;">
				<el-input placeholder="关键词"  v-model="keywords"></el-input>
			</el-row>
			<el-row style = "margin-top: 10px;">
				<el-input placeholder="职位工作地点" v-model="Zlocation"></el-input>
			</el-row>
			<el-row style = "margin-top: 10px;">
				<el-input placeholder="薪资" v-model="Zpay"></el-input>
			</el-row>
			<el-row style = "margin-top: 10px;">
				<el-input placeholder="福利" v-model="fuli"></el-input>
			</el-row>
			<el-row style = "margin-top: 10px;">
				<el-input placeholder="具体地址" v-model="locaitondetail"></el-input>
			</el-row>
			<!-- 申请人头像和公司头像可以再写 -->
			<el-row type="flex" justify="center">
			<el-button @click = "register">完成</el-button>
			</el-row>
		</div>
		<el-dialog
		  title="注册公司"
		  :visible.sync="dialogVisible"
		  width="30%"
		  >
		  <el-input placeholder="公司领域" v-model="field"></el-input>
		  <el-input placeholder="公司融资" v-model="finance"></el-input>
		  <el-input placeholder="公司规模" v-model="scale"></el-input>
		  <el-input placeholder="公司介绍" v-model="introduciton"></el-input>
		  <span slot="footer" class="dialog-footer">
		    
		    <el-button type="primary" @click="registerCompany">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
	//注册页面步骤
	//1.选择注册的类型 招聘 或者应聘
	//2.填写用户名和密码
	//3.判断有没有重复的用户名 有就告知重复填
	//4.用户名，密码确定下来后，如果是招聘者，需要填写：
	//真实姓名，年龄，电话，邮箱，头像，
	//期望职位，工作地点，薪资
	//添加教育经历
	//如果是招聘者，需要填写：公司名称，出具公司证明，职位证明，电话，姓名，职位（可能有多个，薪金），工作地点，头像，公司地点，该申请人的职位，公司头像
	import common  from "../common.js"
	export default {
		data()
		{
			return {
				locaitondetail:'',
				field:'',
				finance:'',
				scale:'',
				introduciton:'',
				dialogVisible:false,
				username:'',
				password:'',
				is:0,
				step:0,
				realname:'',
				age:'',
				phone:'',
				email:'',
				wantposition:'',
				workplace:'',
				pay:'',
				education:'',
				companyname:'',
				Zrealname:'',
				position:'',
				needposition:'',
				Zlocation:'',
				Zpay:'',
				requirement:'',
				condition:'',
				workdescibe:'',
				keywords:'',
				fuli:''
				
				
			}
		},
		methods:{
			
			check()
			{
				//起检查作用，分别对hr和employee进行检查
				
						
						if(this.is == 0)
						{
							common.fet("http://localhost:3000/register",{
								 method:'POST',
								 obj:{username:this.username,
								                      password: this.password,
													  check:true,
													  who:'employee'},
								 // mode:"no-cors",//默认是cors的
						}).then( resjson =>{
							console.log(resjson)
							if(resjson.code == 200)
							{
								this.step = 1
							}else{
								this.$message({
									 message:'用户名重复',
									 type:'error',
								 })
							}
						})
					   }else{
						   common.fet("http://localhost:3000/register",{
						   		 method:'POST',
						   		 obj:{username:this.username,
						   		      password: this.password,
						   			  check:true,
						   			  who:'hr'},
						   		 // mode:"no-cors",//默认是cors的
						   }).then( resjson =>{
						   	console.log(resjson)
						   	if(resjson.code == 200)
						   	{
						   		this.step = 1
						   	}else{
						   		this.$message({
						   			 message:'用户名重复',
						   			 type:'error',
						   		 })
						   	}
						   })
					   }
				
			},
			register()
			{
				//这里是真正的注册
				if(this.is == 0)
				{
					
					common.fet("http://localhost:3000/register",{
							 method:'POST',
							 obj:{username:this.username,
							      password: this.password,
								  realname:this.realname,
								  age:this.age,
								  phone:this.phone,
								  email:this.email,
								  position:this.wantposition,
								  workplace:this.workplace,
								  pay:this.pay,
								  education:this.education,
								  check:false,
								  who:'employee'},
							 // mode:"no-cors",//默认是cors的
					}).then( resjson =>{
						console.log(resjson)
						if(resjson.code == 200)
						{
							this.$message({
								message:resjson.message,
								type:'success'
							})
							this.$router.push('./login')
						}
					})
			   }else{
				   console.log('hrregister')
				   common.fet("http://localhost:3000/register",{
				   		 method:'POST',
				   		 obj:{username:this.username,
				   		      password: this.password,
							  realname:this.Zrealname,
							  companyname:this.companyname,
							 position:this.position,
							 needposition:this.needposition,
							 requirement:this.requirement,
							 condition:this.condition,
							 workdescibe:this.workdescibe,
							 keywords:this.keywords,
							 Zlocation:this.Zlocation,
							 Zpay:this.Zpay,
							 fuli:this.fuli,
							 locationdetail:this.locaitondetail,
				   			 check:false,
				   			 who:'hr'},
				   		 // mode:"no-cors",//默认是cors的
				   }).then( resjson =>{
				   	console.log(resjson)
				       if (resjson.message == "需要注册该公司")
						{console.log(1)
				   		this.dialogVisible = true
				   	     }else if(resjson.message = "注册成功")
						 {
							 this.$router.push("./login")
						 }
				   })
			   }
		},
		registerCompany()
		{
			common.fet("http://localhost:3000/registercompany",{
				 method:'POST',
				 obj:{
					 companyname:this.companyname,
					 field:this.field,
					 finance:this.finance,
					 scale:this.scale,
					 introduction:this.introduciton
				 }
			}).then(res=>{
				this.$message({
					message:'公司成功注册',
					type:'success'
				})
				this.dialogVisible = false
			})
		}
		
	}
	}
</script>

<style scoped>
	
	
</style>
