<template>
	<div>
	<el-row   type = 'flex' justify="center"style= "margin-top: 100px;">职位推荐</el-row>
	<el-row :gutter="30" style="margin-top: 20px;" v-for  = "item in 3">
		<el-col :span = '8' v-for = "ite in hotposi[item-1] ">
			<el-card class = "box-card">
				<div slot = "header" class = "clearfix">
					<el-button type="text" style="padding: 3px 0" size="medium" @click = "changeroute(ite.id)" >{{ite.Bposition}}</el-button>
					<!-- <router-link to ="{name =  'hrpage',params :{id:}}"></router-link> -->
					<span style = "float: right;font-size:13px;">{{ite.Bwage}}</span>
				</div>
				<div>
					{{ite.Bcompany}}|{{ite.Blocation}}|{{ite.condition}}
				</div>
			</el-card>
		</el-col>
	</el-row>
	<el-row  type = 'flex' justify="center"style= "margin-top: 10px;">
		<el-pagination small
		 layout="prev,pager,next"
		 :total="20"
		 @current-change="handleCurrentChange"
		
		></el-pagination>
	</el-row>
	   
	</div>
</template>

<script>
	export default {
	data(){
		return {
			hotposi:[[],[],[],[],[],[]],//根据用户填写的期望工作地点，岗位，公司，工资进行智能推荐，从后端返回数据
			page: 1,
			messageAll:''
		}
	},
	mounted(){
	    fetch(`http://localhost:3000/position/recommend/${this.$store.state.target}`).then(res=>{
			return res.json()
		}).then(resjson=>{
			
			this.messageAll = resjson
			for(let v= 0;v<6;v++ )
			{
				for(let i=0;i<3;i++)
				{
					this.hotposi[v].push(resjson[3*v+i])
					
				}
			}
			
		})
		
		//post2页数变化时应该自动加载
	  
	},
	methods:{
		handleCurrentChange(page)
		{
			this.hotposi.reverse()
			
		},
		changeroute(workid){
			this.$router.push({name:'hrpage',params:{id:workid}})
		}		
		
	}
			
	}
</script>

<style>
	.box-card {
		height: 110px;
	}
	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}
	
	.clearfix:after{
		clear: both;
		
	}
</style>
