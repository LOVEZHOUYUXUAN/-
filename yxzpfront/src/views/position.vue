<template>
	<div>
		<!-- 筛选及搜索栏 -->
		<search-and-filter></search-and-filter>
		<relate-position></relate-position>
		<list-position :message = "positions"></list-position>
		<!-- 有时间就写个搜索记录，再有时间就写个相关推荐 -->
		
	</div>
</template>

<script>
	//该页面逻辑
	// 点进来是什么都不选的状态，地点是个人资料里面的意愿地点，职位是意愿职位，这是默认展示的，搜索和筛选分为两部分
	// 根据stroe里的个人数据资料进行搜索并展示
	// 工作地点比较重要 工作地点筛选条件再前,再选其他的选项,不过每选一项都可以触发搜索
	import searchAndFilter from '../components/posipage-searchAndfilter.vue'
	import listPosition from '../components/posipage-listposi.vue'
	import relatePosition from '../components/relateposition.vue'
	export default {
		components:{
			searchAndFilter,
			listPosition,
			relatePosition
			
		},
		computed:{
			positions()
			{   
				console.log('有改变')
				if(this.$store.state.positions == '')
				{
					
					return this.positionMassage
				}
				else {
				let positionmessage = []
				for(let item  of this.$store.state.positions)
				{
					
					let obj = {
						id:item.id,
						positonname :item.Bposition,
					   location :item.Blocation,
					   pay : item.Bwage,
					   require :item.condition != undefined ? item.condition.split('|'):item.condition,
					   hr : item.hrname,
					   hrid:item.hrid,
					   keyword :item.keyword != undefined ? item.keyword.split(' '):item.keyword,
					   company : {name:item.Bcompany,
					              field:item.field,
								  finance:item.finance,
								  scale:item.scale,
								  headimage:require('../assets/'+item.imageurl),//这里要填写的是一个路径而不是字符串，也就是说要用有路径拼接的过程
								  welfare:item.Bfuli}, //福利不要作改动，用，加入数据库
								  
					   }
					 positionmessage.push(obj)
				}
				
				return positionmessage
			 }
			}
			
		},
		data()
		{
			return {
				positionMassage:[
					// {positonname:'web前端',
					//  location:'杭州',
					//  pay:'120-150/天',
					//  require:['4天/周','3个月','本科'],
					//  hr:'阿周',
					//  keyword:['前端开发','vue.js','react.js','node.js'],
					//  company:{name:'海康威视',
					//           field:'计算机软件',
					// 		  finance:'已上市',
					// 		  scale:'10000人以上',
					// 		  headimage:require('../assets/positionpage19.png'),
					// 		  welfare:['五险一金','医疗保险','节日福利','股票期权',]
					// 		  },
					// },
					// {positonname:'前端开发工程师',
					//  location:'杭州',
					//  pay:'250-300/天',
					//  require:['4天/周','3个月','本科'],
					//  hr:'阿林',
					//  keyword:['web端','小程序','移动端','javascript','css3'],
					//  company:{name:'蚂蚁集团',
					//           field:'互联网',
					// 		  finance:'D轮及以上',
					// 		  scale:'10000人以上',
					// 		  headimage:require('../assets/positionpage2.jpg'),
					// 		  welfare:[]
					// 		  },},
					// {positonname:'java(实习)',
					//  location:'杭州',
					//  pay:'150-300/天',
					//  require:['4天/周','3个月','本科'],
					//  hr:'阿林',
					//  keyword:['spring','大数据','java','服务端开发','软件开发工程师'],
					//  company:{name:'阿里集团',
					//           field:'移动互联网',
					// 		  finance:'已上市',
					// 		  scale:'10000人以上',
					// 		  headimage:require('../assets/positionpage12.jpg'),
					// 		  welfare:[]
					// 		  },},
					// {positonname:'前端开发工程师',
					//  location:'杭州',
					//  pay:'250-300/天',
					//  require:['4天/周','3个月','本科'],
					//  hr:'阿林',
					//  keyword:['web端','小程序','移动端','javascript','css3'],
					//  company:{name:'蚂蚁集团',
					//           field:'互联网',
					// 		  finance:'D轮及以上',
					// 		  scale:'10000人以上',
					// 		  headimage:require('../assets/positionpage2.jpg'),
					// 		  welfare:['补充医疗保险','餐补','零食下午茶','定期体检','通讯补贴']
					// 		  },},
					// {positonname:'云平台研发实习生',
					//  location:'杭州',
					//  pay:'100-200/天',
					//  require:['5天/周','4个月','大专'],
					//  hr:'许敏',
					//  keyword:['实施工程师/顾问'],
					//  company:{name:'网易',
					//           field:'互联网',
					// 		  finance:'已上市',
					// 		  scale:'10000人以上',
					// 		  headimage:require('../assets/positionpage9.jpg'),
					// 		  welfare:['五险一金','住房补贴','节日福利','零食下午茶','年终奖']
					// 		  },},
					// {positonname:'盒马春招',
					//  location:'杭州',
					//  pay:['15-30k','16薪'],
					//  require:['在校/应届','本科'],
					//  hr:'李乐',
					//  keyword:['自动化测试','软件测试','python','java','计算机软件'],
					//  company:{name:'盒马生鲜',
					//           field:'o2o',
					// 		  finance:'不需要融资',
					// 		  scale:'10000人以上',
					// 		  headimage:require('../assets/positionpage10.jpg'),
					// 		  welfare:['五险一金','住房补贴','节日福利','带薪年假','年终奖']
					// 		  },}, 
					// {positonname:'测试开发实习',
					//  location:'杭州',
					//  pay:'400-450/天',
					//  require:['3天/周','2个月','本科'],
					//  hr:'况女士',
					//  keyword:['python','java','c/c++'],
					//  company:{name:'今日头条',
					//           field:'移动互联网',
					// 		  finance:'D轮及以上',
					// 		  scale:'10000人以上',
					// 		  headimage:require('../assets/positionpage13.jpg'),
					// 		  welfare:['节日福利','住房补贴','节日福利','零食下午茶','年终奖']
					// 		  },},	
					// {positonname:'NLP算法实习生',
					//  location:'杭州',
					//  pay:'250-400/天',
					//  require:['4天/周','3个月','本科'],
					//  hr:'冯先生',
					//  keyword:['自然语言处理','深度学习算法','推荐算法','搜索算法'],
					//  company:{name:'网易',
					//           field:'移动互联网',
					// 		  finance:'已上市',
					// 		  scale:'10000人以上',
					// 		  headimage:require('../assets/positionpage9.jpg'),
					// 		  welfare:['节日福利','住房补贴','节日福利','零食下午茶','年终奖']
					// 		  },},	
					// {positonname:'测试开发实习',
					//  location:'杭州',
					//  pay:'400-450/天',
					//  require:['3天/周','2个月','本科'],
					//  hr:'况女士',
					//  keyword:['python','java','c/c++'],
					//  company:{name:'今日头条',
					//           field:'移动互联网',
					// 		  finance:'D轮及以上',
					// 		  scale:'10000人以上',
					// 		  headimage:require('../assets/positionpage9.jpg'),
					// 		  welfare:['节日福利','住房补贴','节日福利','零食下午茶','年终奖']
					// 		  },},
					// {positonname:'盒马春招',
					//  location:'杭州',
					//  pay:['15-30k','16薪'],
					//  require:['在校/应届','本科'],
					//  hr:'李乐',
					//  keyword:['自动化测试','软件测试','python','java','计算机软件'],
					//  company:{name:'盒马生鲜',
					//           field:'o2o',
					// 		  finance:'不需要融资',
					// 		  scale:'10000人以上',
					// 		  headimage:require('../assets/positionpage10.jpg'),
					// 		  welfare:['五险一金','住房补贴','节日福利','带薪年假','年终奖']
					// 		  },},
					
					// 	{positonname:'web前端',
					// 	 location:'杭州',
					// 	 pay:'120-150/天',
					// 	 require:['4天/周','3个月','本科'],
					// 	 hr:'阿周',
					// 	 keyword:['前端开发','vue.js','react.js','node.js'],
					// 	 company:{name:'海康威视',
					// 	          field:'计算机软件',
					// 			  finance:'已上市',
					// 			  scale:'10000人以上',
					// 			  headimage:require('../assets/positionpage6.jpg'),
					// 			  welfare:['五险一金','医疗保险','节日福利','股票期权',]
					// 			  },
					// 	},
					// {positonname:'前端开发工程师',
					//  location:'杭州',
					//  pay:'250-300/天',
					//  require:['4天/周','3个月','本科'],
					//  hr:'阿林',
					//  keyword:['web端','小程序','移动端','javascript','css3'],
					//  company:{name:'蚂蚁集团',
					//           field:'互联网',
					// 		  finance:'D轮及以上',
					// 		  scale:'10000人以上',
					// 		  headimage:require('../assets/positionpage2.jpg'),
					// 		  welfare:[]
					// 		  },},
					// {positonname:'java(实习)',
					//  location:'杭州',
					//  pay:'150-300/天',
					//  require:['4天/周','3个月','本科'],
					//  hr:'阿林',
					//  keyword:['spring','大数据','java','服务端开发','软件开发工程师'],
					//  company:{name:'阿里集团',
					//           field:'移动互联网',
					// 		  finance:'已上市',
					// 		  scale:'10000人以上',
					// 		  headimage:require('../assets/positionpage12.jpg'),
					// 		  welfare:[]
					// 		  },},			  
					// {positonname:'前端开发工程师',
					//  location:'杭州',
					//  pay:'250-300/天',
					//  require:['4天/周','3个月','本科'],
					//  hr:'阿林',
					//  keyword:['web端','小程序','移动端','javascript','css3'],
					//  company:{name:'蚂蚁集团',
					//           field:'互联网',
					// 		  finance:'D轮及以上',
					// 		  scale:'10000人以上',
					// 		  headimage:require('../assets/positionpage2.jpg'),
					// 		  welfare:['补充医疗保险','餐补','零食下午茶','定期体检','通讯补贴']
					// 		  },},	
					// {positonname:'前端开发工程师',
					//  location:'杭州',
					//  pay:'250-300/天',
					//  require:['4天/周','3个月','本科'],
					//  hr:'阿林',
					//  keyword:['web端','小程序','移动端','javascript','css3'],
					//  company:{name:'蚂蚁集团',
					//           field:'互联网',
					// 		  finance:'D轮及以上',
					// 		  scale:'10000人以上',
					// 		  headimage:require('../assets/positionpage2.jpg'),
					// 		  welfare:['补充医疗保险','餐补','零食下午茶','定期体检','通讯补贴']
					// 		  },},
					// {positonname:'前端开发工程师',
					//  location:'杭州',
					//  pay:'250-300/天',
					//  require:['4天/周','3个月','本科'],
					//  hr:'阿林',
					//  keyword:['web端','小程序','移动端','javascript','css3'],
					//  company:{name:'蚂蚁集团',
					//           field:'互联网',
					// 		  finance:'D轮及以上',
					// 		  scale:'10000人以上',
					// 		  headimage:require('../assets/positionpage2.jpg'),
					// 		  welfare:['补充医疗保险','餐补','零食下午茶','定期体检','通讯补贴']
					// 		  },},
					// {positonname:'后端开发工程师',
					//  location:'杭州',
					//  pay:'250-300/天',
					//  require:['4天/周','3个月','本科'],
					//  hr:'阿林',
					//  keyword:['web端','小程序','移动端','javascript','css3'],
					//  company:{name:'蚂蚁集团',
					//           field:'互联网',
					// 		  finance:'D轮及以上',
					// 		  scale:'10000人以上',
					// 		  headimage:require('../assets/positionpage2.jpg'),
					// 		  welfare:['补充医疗保险','餐补','零食下午茶','定期体检','通讯补贴']
					// 		  },},							  
				]
			}
		},
		created()
		{
			// if(this.$route.params.where == 0)
			// {
			// 	console.log(77777)
			// 	let message = {target:this.$store.state.target,
			// 	               location:this.$store.state.location}
			// 	fetch(`http://localhost:3000/position/frompage/${message.target}/${message.location}`).then(res=>{
			// 		return res.json()
			// 	}).then(resjson=>{
					
			// 		this.positionMassage  = resjson
			// 	})
			// }
			//默认加载的数据
		},
		methods:{
			//监视子组件的自定义事件，并且传出的信息，根据这个信息去搜索相关职位的信息，得到信息后把信息
			//传递给下一个子组件，并展示，下一个组件接受prop值用compute去初始化值
			tosearch()
			{
				
			}
		}
	}
</script>

<style scoped>
</style>
