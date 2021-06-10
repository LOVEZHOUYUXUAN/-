<template>
	<!-- //面板介绍，跟着固定在屏幕的最上面 -->
	<div style = "position: relative;">
	<hr-work-face :position-message = "work" :hrname = "hr.name" :hrheadimage = "hr.headimage" :hrid = "hr.id" :hrposition= "hr.position"  style = "z-index: 1;"></hr-work-face>
	
	
	<!-- //职位描述 -->
	<!-- <div style="height: 1000px;"></div> -->
	
		<!-- <div style="margin-right: 400px;height: 200px;background-color: #FF8C00;"></div>
		<div style = "width: 400px;position: absolute;top:100px;height: 200px;right:0px; background-color: blueviolet;"></div> -->
	<detail-description :position-message = "hr"></detail-description>
	<!-- //公司介绍 -->
	<div style = "width: 400px;position: absolute;right: 0px;top:150px;height: 500px;background-color: #FF8C00;">
		<el-card>
			<div slot = "header" class = "clearfix">
			<el-avatar style = "vertical-align:middle;"  shape = "square" :size = "80" :src = "work.companyDescription.headimage"></el-avatar>	
			<span >{{work.companyDescription.name}}</span>
			</div>
			<div style="margin-bottom: 20px;">
				<i class = "el-icon-s-data"><span>{{work.companyDescription.information[0]}}</span></i>
			</div>
			<div style="margin-bottom: 20px;">
				<i class= "el-icon-s-custom">{{work.companyDescription.information[1]}}</i>
			</div>
			<div style="margin-bottom: 20px;">
				<i class ="el-icon-cpu">{{work.companyDescription.information[2]}}</i>
			</div>
			<p style="text-align: center;">该公司其他职位</p>
			<div v-for = "item in otherPosition" class = "other">
				<router-link :to = "'/hr/'+item.id">{{item.workname}}</router-link>
				<p style  = "color: red;">{{item.pay}}|{{item.location}}</p>
			</div>
		</el-card>
	
	
	</div>
	</div>
</template>

<script>
	import hrWorkFace from '../components/hr-workface.vue'
	import detailDescription from '../components/detail-description.vue'
	import a from '../components/search.vue'
	export default {
		components:{
			hrWorkFace,
			detailDescription
			
		},
		data()
		{ 
			return {
				work:'',
				otherPosition:[],
				hr:'',
			//   work:{
			// 	  id:1,
			// 	workname:'java高级工程师',
			// 	minpay:'10k',
			// 	maxpay:'20k',
			// 	howmany:16,
			// 	welfare:['3餐餐补','公司股票'],
			// 	require:['聪明',"中专"],
			// 	location:'青岛',
			// 	companyDescription:{
			// 		id:'1',
			// 		name:'阿里巴巴',
			// 		headimage:require('../assets/hr-workpage2.jpg'),
			// 		information:['已上市','2000人','互联网']
					
			// 	},
				
				
			// },
			// otherPosition :[{
			// 	id:2,
			// 	workname:'大数据挖掘',
			// 	minpay:'10k',
			// 	maxpay:'20k',
			// 	location:'杭州',
			// 	companyname:'阿里巴巴'
			// },
			//               {
			// 				  id:3,
			// 				  workname:'c++工程师',
			// 				  minpay:'12k',
			// 				  maxpay:'22k',
			// 				  location:'北京'
			// 			  },
			// 			  {
			// 				  id:4,
			// 				  workname:'web前端工程师',
			// 				 minpay:'13k',
			// 				 maxpay:'23k',
			// 				 location:'上海'
			// 			  }],
			// hr:{
			// 	id:2,
			// 	name:'阿周',
			// 	// headimage:'1',
			// 	headimage:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',  //这里填写资源定位符
			// 	Jobdescription:{
			// 		   teamDescription:`CCO技术部旨在建立更高的客户服务标准，让客户在阿里享受到最'爽'的
			// 		   服务,，为阿里经济体提供一站式服务解决方案。通过我们的产品、数据、技术去提升阿里集团服务客户的
			// 		   能力，提升全网客户体验。国际化服务部门聚焦在飞速发展的国际化业务上，为AE、Lazada
			// 		   、Daraz等海外业务提供国际化的服务产品。期待打造全球服务体验生态基础设施，成为极致服务
			// 		   体验创新的引领者！`,
			// 		   positionDescription:['负责商家服务赋能和客户体验相关的产品研发','深入发掘和分析业务需求，撰写技术方案和系统设计','核心代码编写、指导和培训工程师、不断进行系统优化','参与或领导跨团队的研发项目'],
			// 		   positonRequire:['JAVA基础扎实，理解io、多线程、集合等基础框架，对JVM原理有一定的了解','丰富的JAVA开发经验，对于用过的开源框架，能了解到它的原理和机制；对Spring,ibatis,struts等开源框架熟悉'
			// 		   ,'熟悉分布式系统的设计和应用，熟悉分布式、缓存、消息等机制；能对分布式常用技术进行合理应用，解决问题','掌握多线程及高性能的设计与编码及性能调优；有高并发应用开发经验'
			// 		   ,'掌握Linux 操作系统和大型数据库（Oracle、MySql）；对sql优化有丰富的经验',' 学习能力强，适应能力好；具备耐心/细心的品质',
			// 		   '喜欢去看及尝试最新的技术，追求编写优雅的代码，从技术趋势和思路上能影响技术团队'],
			// 		   locationdetail:'青岛李沧淘宝城8号'
					   
			// 	},
			// 	// 先判断是否有团队介绍,再职位描述,再职位要求
			// 	companydescription:'阿里巴巴集团的使命是让天下没有难做的生意。\n我们旨在赋能企业改变营销、销售和经营的方式。我们为商家、品牌及其他企业提供基本的互联网基础设施以及营销平台，让其可借助互联网的力量与用户和客户互动。我们的业务包括核心电商、云计算、数字媒体和娱乐以及创新项目和其他业务。我们并通过子公司菜鸟网络及所投资的关'
				
			// }
			// }
			}
		},
		created()
		{
			fetch(`http://localhost:3000/position/hrpage/${this.$route.params.id}`).then(res=>{
				return res.json()
			}).then(resjson=>{
			 this.work = {
								 id:resjson[0].id,
								workname:resjson[0].Bposition,
								pay:resjson[0].Bwage,
								howmany:16,
								welfare:resjson[0].Bfuli.split(','),
								require:resjson[0].condition.split('|'),
								location:resjson[0].Blocation,
								companyDescription:{
									id:'1',
									name:resjson[0].Bcompany,
									headimage:require('../assets/'+resjson[0].imageurl),
									information:[resjson[0].finance,resjson[0].scale,resjson[0].field]
									
					},
					}
			  for(let i = 1; i<7;i++)
				 {
					  this.otherPosition.push(
					  {
						  id:resjson[i].id,
						  workname:resjson[i].Bposition,
						  pay:resjson[i].Bwage,
						  location:resjson[i].Blocation,
						  companyname:resjson[i].Bcompany,
					  })
				  }
				this.hr = {
					id:resjson[0].hrid,
					name:resjson[0].hrname,
					position:resjson[0].hrposition,
					headimage:require('../assets/hrheadimage/'+resjson[0].hrheadimage),
					Jobdescription:{
						   teamDescription:resjson[0].teamtrodition,
						   positionDescription:resjson[0].Bpostintroduce.split('|'),
						   positonRequire:resjson[0].Bpostrequirement.split(' '),
						   locationdetail:resjson[0].positiondetial
						   
					},
					// 先判断是否有团队介绍,再职位描述,再职位要求
					companydescription:resjson[0].introduce
				}
			})
			
			
		}
	}
</script>

<style scoped>
	
	.clearfix ::after,.clearfix::before{
		display: table;
		content: "";
	}
	.clearfix::after{
		clear: both;
	}
	.other{
		height: 100px;
	}
</style>
