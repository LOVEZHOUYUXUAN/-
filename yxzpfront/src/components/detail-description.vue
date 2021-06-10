<template>
	<div style = "margin-top: 5px;margin-left: 20px;margin-right: 400px;margin-bottom: 200px;">
		<el-row style = "margin-top: 20px;">
			<el-col :span = '5' style=";background-color: #ffffff;">
				<el-avatar :size = '50' :src = "hr.headimage" style = "vertical-align: middle;"></el-avatar>
				<span style = "">hr<span style = "font-family: Hiragino Sans GB;font-size: 40px;color: #FF8C00;">{{hr.name}} </span></span>
			</el-col>
		</el-row>
		<template v-if = "hr.Jobdescription.teamDescription != null">
		<el-row>
			<span style = "font-weight: 500;">团队介绍</span>
		</el-row>
		<el-row style = "margin-top: 10px;">
			<div style = "height: 1px;width: 100px;border: solid #42B983 1px;background-color: #42B983;"></div>
		</el-row>
		<el-row>
			{{hr.Jobdescription.teamDescription}}
		</el-row>
		</template>
		<template v-if = "hr.Jobdescription.positionDescription != undefined">
		<el-row>
			<span style = "font-weight: 500;">职位描述</span>
		</el-row>
		<el-row style = "margin-top: 10px;">
			<div style = "height: 1px;width: 100px;border: solid #42B983 1px;background-color: #42B983;"></div>
		</el-row>
		<el-row v-for = "(item,index) in hr.Jobdescription.positionDescription">
			{{index+1}}·{{item}}
		</el-row>
		</template>
		<template v-if = "hr.Jobdescription.positonRequire != undefined">
		<el-row>
			<span style = "font-weight: 500;">岗位要求</span>
		</el-row>
		<el-row style = "margin-top: 10px;">
			<div style = "height: 1px;width: 100px;border: solid #42B983 1px;background-color: #42B983;"></div>
		</el-row>
		<el-row v-for = "(item,index) in hr.Jobdescription.positonRequire">
			{{index+1}}·{{item}}
		</el-row>
		</template>
		<template v-if = "hr.companydescription != undefined">
		<el-row>
			<span style = "font-weight: 500;">公司介绍</span>
		</el-row>
		<el-row style = "margin-top: 10px;">
			<div style = "height: 1px;width: 100px;border: solid #42B983 1px;background-color: #42B983;"></div>
		</el-row>
		<el-row>
			{{hr.companydescription}}
		</el-row>
		</template>
		
		<el-row>
			<span style = "font-weight: 500;">工作地点</span>
		</el-row>
		<el-row style = "margin-top: 10px;">
			<div style = "height: 1px;width: 100px;border: solid #42B983 1px;background-color: #42B983;"></div>
		</el-row>
		<el-card style = "width: 600px;">
			<div slot = "header">
				<span class = 'el-icon-location'>{{hr.Jobdescription.locationdetail}}</span>
			</div>
			<div id = "container" style = "width: 600px;height: 300px;">
				
			</div>
		</el-card>
		
		
		
		<!-- <div id = "container" style = "width: 500px;height: 300px;">
			
		</div> -->
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		props:['positionMessage'],
		data()
		{
			return {
				hr: this.positionMessage,
				key:'9be6ba897d74280959b5756ace365559',
				locationjw:''
			}
		},
		methods:{
			// address()
			// {
			// 	// 这里使用箭头函数,不绑定this,使this指向vue,箭头函数不会创建自己的this,它只会从自己的作用域链的上一层继承this
			// 	axios.get(`https://restapi.amap.com/v3/geocode/geo?key=${this.key}&address=${this.hr.Jobdescription.locationdetail}`).then(function(response) {
			// 		console.log(response.data)
			// 		console.log(this)
			// 	})
			// 	{
					
			// 	}
			// }
			
			 address()
			{
				
				let url = `https://restapi.amap.com/v3/geocode/geo?key=${this.key}&address=${this.hr.Jobdescription.locationdetail}`
				fetch(url).then(response=>
				{
				   
					return response.json();
				}).then(myjson=>
				{
					this.locationjw = myjson['geocodes'][0]['location'].split(',').map(function(item){
						return parseFloat(item) 
					})
					let AMap =  window.AMap;
					let map  = new AMap.Map('container',{
						center:this.locationjw,
						resizeEnabel:true,
						zoom:100
					})
					
					let marker = new AMap.Marker({
						position:new AMap.LngLat(...this.locationjw),
						titile:'A'				
					})
					map.add(marker);
					 
				})
			},
			
			
		},
		mounted()
		{
			
			this.address();
			// let AMap =  window.AMap;
			// let map  = new AMap.Map('container',{
			// 	center:this.locationjw,
			// 	resizeEnabel:false,
			// 	zoom:100
			// })
			
			// let marker = new AMap.Marker({
			// 	position:new AMap.LngLat(this.locationjw),
			// 	titile:'A'				
			// })
			// map.add(marker);
			
		}
		
	}
</script>

<style scoped>
	.el-row{
		margin-top: 20px;
		
	}
</style>
