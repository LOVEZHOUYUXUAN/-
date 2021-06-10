<template>
	<div>
	<el-row>
		<!-- <el-col :span = '2'></el-col> -->
	<el-col :span='4' :offset='4'>
		 <el-cascader
		    v-model="value"
		    :options="options"
		    placeholder="职位类型"
			:show-all-levels="false"
			clearable></el-cascader>
	</el-col>
	<el-col :span='12'>	<el-input v-model = "input" placeholder="请输入职位,公司"></el-input>
		</el-col>
	<el-col :span = '4'> <el-button icon="el-icon-search" circle @click.native = "search"></el-button> </el-col>
	 </el-row>
	<el-row  type = 'flex' justify="start"   style = 'margin-top: 50px' ><!-- //直接给class 不好使，在控制台有显示，但是不出效果 -->
	        <el-col :span='2'></el-col>
			<el-col :span ='2'></el-col>
			<el-col :span='2'>热门职位:</el-col>
			<el-col :span='2' v-for = "item in hotPosition"><el-tag size ="medium">{{item.Bposition}}</el-tag></el-col>
			<!-- <el-col :span='2'><el-tag size="medium">{{}}</el-tag></el-col>
			<el-col :span='2'><el-tag size="medium">{{1}}</el-tag></el-col>
			<el-col :span='2'><el-tag size="medium">{{1}}</el-tag></el-col>
			<el-col :span='2'><el-tag size="medium">{{1}}</el-tag></el-col>
			<el-col :span='2'><el-tag size="medium">{{1}}</el-tag></el-col>
			<el-col :span='2'><el-tag size="medium">{{1}}</el-tag></el-col> -->
			
	</el-row> 
	</div>
</template>

<script>
	import common from '../common.js'
	export default  {
	data(){
	return {
					hotPosition:[],
					input :'',
					value:'',
					options:[{
						value:'后端开发',
						label:'后端开发',
						children:[{
							value:'python',
							label:'python'
						},
						{
							value:'c/c++',
							label:'c/c++'
						},
						{
							value:'hadoop',
							label:'hadoop'
						},
						{
							value:'node.js',
							label:'node.js'
						},
						{
							value:'java',
							label:'java',
							
						},
						{
							value:'php',
							label:'php'
						},
						{
							value:'golang',
							label:'golang'
						}
						]
					},
					{
						value:'移动开发',
						label:'移动开发',
						children:[{value:'android',
						            label:'android',
								    },
									{
										value:'ios',
										label:'ios'
									},
									{
										value:'html5',
										label:'html5'
									},
									{
										value:'移动web前端',
										label:'移动web前端'
									},
									
									]
					},
					{
						value:'测试',
						label:'测试',
						children:[{
							value:'移动端测试',
							label:'移动端测试'
						},
						{
							value:'游戏测试',
							label:'游戏测试'
							},
						{
							value:'软件测试',
							label:'软件测试',
							
						},
						{
							value:'测试开发',
							label:'测试开发',
							}
						]
					},
					{
						value:'运维',
						label:'运维',
						children:[{
							value:'运维工程师',
							label:'运维工程师',
							
						},
						
						{
						  value:'网络工程师',
						  label:'网络工程师'
						},
						{
							value:'系统管理员',
							label:'系统管理员'
						}
							
						]
					},
					{
						value:'数据',
						label:'数据',
						children:[{
							value:'数据架构师',
							label:'数据架构师',
							
						},
						{
						  value:'数据分析师',
						  label:'数据分析师'
						},
						{
						   value:'数据挖掘',
						   label:'数据挖掘'
						}
						]
					},
					{
						value:'前端开发',
						label:'前端开发',
						children:[{
							value:'web前端',
							label:'web前端',
							
						}
						
						]
					},
					{
						value:'人工智能',
						label:'人工智能',
						children:[{
							value:'机器学习',
							label:'机器学习',
						},
						{
							value:'计算机视觉',
							label:'计算机视觉'
						},
						{
							value:'自然语言处理',
							label:'自然语言处理'
						},
						{
							value:'语音识别',
							label:'语音识别'
						},
						{
							value:'算法研究员',
							label:'算法研究员',
						},
						{
						   value:'深度学习',
						   label:'深度学习'
						},
						{
							value:'搜索算法',
							label:'搜索算法'
						}
						]
					}
					]
				}
			},
			methods:{
				search()
				{
				
					//如果两个都选择，则是1职位+公司 2职位+职位
					//逻辑：后面的在公司名称里挑选，如果没找到，就直接用第一个找，如果找到了就返回联合查询的东西
					//如果只选择一个，直接先检查是否是职位，如果不是，就查询公司，返回公司所有的职位信息
					//只有一个，后面的也有公司和职位在一起的，这是如果前两者都没找到就慢慢缩减到最后一个字母
					let data = {message1:this.value,
					            message2:this.input}
					
					this.$store.dispatch('fetpositionbyser',data)
					
				}
			},
			created(){
				//获取前8名的热招岗位,直接调用后端接口
				
				fetch("http://localhost:3000/position/hotpositionforseven").then(res=>{
					return res.json()
				}).then(resjson=>{
					
					this.hotPosition = resjson
				})
			
			}
			}
</script>

<style>
</style>
