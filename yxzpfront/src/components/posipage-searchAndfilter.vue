<template>
	<div style= "padding: 15px;">
	   <!-- 搜索框 -->
	   <el-row type="flex" justify="center" >
	  <el-input placeholder="请输入职位,公司" v-model="companyOrposition" class="input-with-select">
	    <!--  <el-select v-model="select1" slot="prepend" placeholder="请选择" @focus="dialogVisible = true">
	        
	      </el-select> -->
		<el-button slot = "prepend" @click.native = "dialogVisible = true">{{select1}}<i class= "el-icon-arrow-down"></i></el-button>
		  <el-select v-model="select2"  slot = "append" placeholder="职位类型">
			  <el-option 
			    v-for ="item in option1"
				 :key = "item.value"
				 :label = "item.label"
				 :value="item.value"></el-option>
		  </el-select>
		  <el-select v-model="select3"  slot = "append" placeholder="公司" style = "margin-left: 10px;margin-right: 5px;">
		<el-option 
		   v-for = "item in option2"
		    :key = "item.value" 
			:label = "item.label" 
			:value="item.value"></el-option>	  
		  </el-select>
	     <el-button slot="append" icon="el-icon-search" style = "width: 100px;" @click.stop = "search" ></el-button>
	    </el-input>
	   </el-row>
	   
	  <!-- 上面的搜索功能和下面的筛选功能分开 -->
	<!--  筛选，一进来根据个人信息里面的意愿工作地点进行默认搜索 -->
	   <!-- 地址选择条 -->
	   <el-row style = "margin-left: 150px;margin-top: 20px;">
	   <el-col  :span = '3' style = "font-size: smaller;">{{condition.location}}</el-col>
	   <el-col  :span = '2' style="font-size: smaller;">热门城市:</el-col>
	   <el-col  class = "clicktochange" :span = "1" v-for = "item in cityName[0]" style="font-size:smaller;" @click.native = 'condition.location = item'>{{item}}</el-col>
	   <el-col    :span = "2" style="font-size: smaller; cursor: pointer;" @click.native = "dialogVisible = true;issecondeone = true">全部城市</el-col>
	   </el-row>
	   <div style ="width: 1000px;margin: 0 auto;">
	  <el-divider ></el-divider>
	  <el-row >
		 
	  		   <el-col :span = '4'>
				   <el-select clearable size="medium"  v-model="select4" class = "select-in-select" placeholder="工作经验" >
					   <el-option v-for = "item in option3"
					     :key = "item.value"
						 :label = "item.label"
						 :value = "item.value"></el-option>
				   </el-select> 
			   </el-col>
				   
			   <el-col :span = "4">
				   <el-select clearable size = "medium" v-model = "select5" class = "select-in-select" placeholder="学历要求">
				   <el-option v-for = "item in option4"
				   :key = "item.value"
				   :label = "item.label"
				   :value = "item.value"></el-option>	   
				   </el-select>
			   </el-col>
			   
			   <el-col :span = "4">
			   				   <el-select clearable size = "medium" v-model = "select6" class = "select-in-select" placeholder="薪资要求">
			   				   <el-option v-for = "item in option5"
			   				   :key = "item.value"
			   				   :label = "item.label"
			   				   :value = "item.value"></el-option>	   
			   				   </el-select>
			   </el-col>
			   <el-col :span = "4">
			   				   <el-select clearable size = "medium" v-model = "select7" class = "select-in-select" placeholder="公司规模">
			   				   <el-option v-for = "item in option6"
			   				   :key = "item.value"
			   				   :label = "item.label"
			   				   :value = "item.value"></el-option>	   
			   				   </el-select>
			   </el-col>
                  
				  <el-col :span = "4">
				  				   <el-select clearable size = "medium" v-model = "select8" class = "select-in-select" placeholder="融资阶段">
				  				   <el-option v-for = "item in option7"
				  				   :key = "item.value"
				  				   :label = "item.label"
				  				   :value = "item.value"></el-option>	   
				  				   </el-select>
				  </el-col>
				  
				  <el-col :span = "4" @click.native = "clickToclear" style ="font-size: small;font-weight: 500;color: red; margin-top: 10px;cursor: pointer;">清空筛选条件</el-col>
	  </el-row>
	   </div>
	   
	   
	   <el-dialog :visible.sync = "dialogVisible" title = "请选择城市">
		   <el-tabs  v-model="activeName" :stretch = "true" tab-position="top"  >
			   <el-tab-pane  label = "热门城市" name = "1">热门城市</el-tab-pane>
			   <el-tab-pane  label = "ABCDE"   name  = "2">ABCDE</el-tab-pane>
			   <el-tab-pane  label = "FGHJ"  name = "3">FGHJ</el-tab-pane>
			   <el-tab-pane  label = "KLMN"    name = "4">KLMN</el-tab-pane>
			   <el-tab-pane  label ="PQRST"   name = "5">PQRST</el-tab-pane>
			   <el-tab-pane  label = "WXYZ"   name = "6">WXYZ</el-tab-pane>
		   </el-tabs>
		  <template>
			   <div v-if  = "activeName == '1'">
				   <el-row type="flex" justify="center" v-for = "(item , index )  of zhuangzaishuju">
					   <el-col class = "clicktochange" :span = '4' v-for = "ite in item  " @click.native = "clicktochange(ite,$event)">{{ite}}</el-col>
				   </el-row>
			   </div>
			   <div v-else>
				  <div v-for = "(item,index) of zhuangzaishuju " style = "margin-bottom: 30px;">
					  <span style = "float: left;font-weight: 600;color:#42B983">{{label[index]}}</span>
					  <el-row   style="margin-left: 200px;" type="flex" justify="start" v-for = "ite of item">
						  <el-col class = "clicktochange" :span = '4' v-for = "it in ite  " @click.native = "clicktochange(it,$event)">{{it}}</el-col>
					  </el-row>
					  
				  </div>
			   </div>
		   </template>
	   </el-dialog>
	</div> 
</template>

<script>
	
	
	export default {
		data(){
			return {
				label:'热门城市',
				activeName:'1',
				dialogVisible:false,
				issecondeone:false,    //判断是不是第2个全部城市
				companyOrposition:'',
				select1:this.$store.state.location,
				select2:'',
				select3:'',
				select4:'',
				select5:'',
				select6:'',
				select7:'',
				select8:'',
			    cityName :[['全国','北京','上海','广州','深圳','杭州','天津','西安','苏州','武汉','厦门','长沙','成都','郑州','重庆'],
				[['澳门','鞍山','安康'],['北京','保定','毕节','巴中'],['重庆','长春','长沙','成都'],['大连','德州','东莞'],['鄂州']],
				[['福州','佛山'],['赣州','贵阳','广州','桂林'],['哈尔滨','葫芦岛','汉中','黄冈'],['鸡西','吉林','济宁','济南','九江','焦作','荆州','荆门']],
				[['昆明','开封'],['辽阳','临沂','兰州','丽江'],['牡丹江','马鞍山'],['南京','南宁','南昌']],
				[['攀枝花','萍乡'],['齐齐哈尔','泉州','青岛','秦皇岛'],['日照','日喀则'],['上海','沈阳','苏州','十堰','汕头','深圳','三亚'],['太原','天津','泰安','台湾']],
				[['潍坊','威海','武汉','无锡'],['西安','咸阳','信阳','襄阳','厦门','香港'],['烟台','宜昌','岳阳'],['淄博','郑州','珠海']]],
				option1:[{value:'前端开发',label:'前端开发'},
				           {value:'后台开发',label:'后台开发'},
						   {value:'大数据开发',label:'大数据开发'},
						   {value:'移动开发',label:'移动开发'},
						   {value:'测试',label:'测试'},
						   {value:'运维',label:'运维'},
						   {value:'人工智能',label:'人工智能'}],
				option2:[{value:'阿里巴巴',label:'阿里巴巴'},
				          {value:'百度',label:'百度'},
						  {value:'腾讯',label:'腾讯'},
						  {value:'商汤',label:'商汤'},
						  {value:'字节跳动',label:'字节跳动'},
						  {value:'美团',label:'美团'},
						  {value:'滴滴',label:'滴滴'},
						  {value:'华为',label:'华为'},
						  {value:'海康威视',label:'海康威视'},
						  {value:'酷家乐',label:'酷家乐'},
						  {value:'shopee',label:'shopee'},
						  {value:'旷世',label:'旷世'}
						  ],
				option3:[{value:'1',label:'不限'},
				          {value:'2',label:'在校生'},
						  {value:'3',label:'应届生'},
						  {value:'4',label:'1年以内'},
						  {value:'5',label:'1-3年'},
						  {value:'6',label:'3-5年'},
						  {value:'7',label:'10年以上'}],
				option4:[{value:'1',label:'不限'},
				          {value:'2',label:'初中及以下'},
						  {value:'3',label:'中专/中技'},
						  {value:'4',label:'高中'},
						  {value:'5',label:'大专'},
						  {value:'6',label:'本科'},
						  {value:'7',label:'硕士'},
						  {value:'8',label:'博士'}],
				option5:[{value:'1',label:'3k以下'},
				          {value:'2',label:'3-5k'},
						  {value:'3',label:'5-10k'},
						  {value:'4',label:'10-15k'},
						  {value:'5',label:'15-20k'},
						  {value:'6',label:'20-30k'},
						  {value:'7',label:'30-50k'},
						  {value:'8',label:'50k以上'}],
				option6:[{value:'1',label:'不限'},
				          {value:'2',label:'0-20人'},
						  {value:'3',label:'20-99人'},
						  {value:'4',label:'100-499人'},
						  {value:'5',label:'500-999人'},
						  {value:'6',label:'1000-9999人'},
						  {value:'7',label:'10000人以上'},
						  ],
						  
				option7:[{value:'1',label:'不限'},
				          {value:'2',label:'未融资'},
						  {value:'3',label:'天使轮'},
						  {value:'4',label:'A轮'},
						  {value:'5',label:'B轮'},
						  {value:'6',label:'C轮'},
						  {value:'7',label:'D轮及以上'},
						  {value:'8',label:'不需要融资'},
						  {value:'9',label:'已上市'}
						  ],
				condition:{
					location:this.$store.state.location,
					
				}
			}
		},
	    computed:{
			//计算属性只有被使用的时候才会计算
			zhuangzaishuju()
			{
				
				let arr = this.cityName[Number(this.activeName)-1]
				let arr1 = []
				if(!(arr[0] instanceof Array))
				{
					let num = arr.length/5+1;
					
					for(let i = 0; i<num ;i++)
					{
						if(arr[i*5] == undefined ){break}
						 arr1[i]  =  [] 
						for(let x = 0;x<5;x++)
						{    
							if(arr[i*5+x])
							{
								arr1[i][x] = arr[i*5+x]
							}
						}
					}
				}	
				 else{
				 	 //arr[[[sss],[ssss],[ssssss]],[]]
					 switch (this.activeName){
						 case '2':
						 this.label = "ABCDE"
						  arr1  =[[],[],[],[],[]] 
						  arr.forEach((item,index)=>{
							  let num = item.length/5+1
							  for(let i = 0;i<num;i++)
							  {
								  if(item[i*5] == undefined ){break}
								  arr1[index][i] = []
								  for(let x = 0;x<5;x++)
								  {   
									  if(item[i*5+x])
									  {
										  arr1[index][i][x] = item[i*5+x]
									  }
								  }
							  }
						  })
						  break;
						case '3':
						  this.label = 'FGHJ'
						  arr1  =[[],[],[],[]] 
						  arr.forEach((item,index)=>{
							  let num = item.length/5+1
							  for(let i = 0;i<num;i++)
							  {
								  if(item[i*5] == undefined ){break}
								  arr1[index][i] = []
								  for(let x = 0;x<5;x++)
								  {   
									  if(item[i*5+x])
									  {
										  arr1[index][i][x] = item[i*5+x]
									  }
								  }
							  }
						  })
						  break;
						  case '4':
						  this.label = 'KLMN'
						  arr1  =[[],[],[],[]]
						  arr.forEach((item,index)=>{
						  							  let num = item.length/5+1
						  							  for(let i = 0;i<num;i++)
						  							  {
						  								  if(item[i*5] == undefined ){break}
						  								  arr1[index][i] = []
						  								  for(let x = 0;x<5;x++)
						  								  {   
						  									  if(item[i*5+x])
						  									  {
						  										  arr1[index][i][x] = item[i*5+x]
						  									  }
						  								  }
						  							  }
						  })
						  break;
						  case '5' :
						  this.label = 'PQRST'
						  arr1  =[[],[],[],[],[]]
						  arr.forEach((item,index)=>{
						  							  let num = item.length/5+1
						  							  for(let i = 0;i<num;i++)
						  							  {
						  								  if(item[i*5] == undefined ){break}
						  								  arr1[index][i] = []
						  								  for(let x = 0;x<5;x++)
						  								  {   
						  									  if(item[i*5+x])
						  									  {
						  										  arr1[index][i][x] = item[i*5+x]
						  									  }
						  								  }
						  							  }
						  })
						  break;
						  case '6':
						  this.label = 'WXYZ'
						 	arr1  =[[],[],[],[]]
						 	arr.forEach((item,index)=>{
						 								  let num = item.length/5+1
						 								  for(let i = 0;i<num;i++)
						 								  {
						 									  if(item[i*5] == undefined ){break}
						 									  arr1[index][i] = []
						 									  for(let x = 0;x<5;x++)
						 									  {   
						 										  if(item[i*5+x])
						 										  {
						 											  arr1[index][i][x] = item[i*5+x]
						 										  }
						 									  }
						 								  }
						 	})
						 	break;			
						  
					 }
				 }
				
				return arr1
			},
			
			
		},
		methods:{
			// zhuangzai(tab,event)
			// {
			// 	console.log(this.zhuangzaishuju)
			// 	console.log(this.select1)
			// },
			clicktochange(ite,event)
			{   
				if(this.issecondeone == false)
				{this.select1 = ite;
				this.dialogVisible = false
				}else{
					this.condition.location = ite;
					this.dialogVisible = false
				}
				
			},
			search()
			{
				let data = {
					location:this.select1,
					positiontype:this.select2,
					company:this.select3,
					input:this.companyOrposition
				}
				this.$store.dispatch('fetpositionbyser2',data)
				
			},
			clickToclear()
			{
				this.select4 = ''
				this.select5 =''
				this.select6 =''
				this.select7 = ''
				this.select8 =''
			}
			
		},
		mounted()
		{
			// console.log(this.select1)
			// console.log(this.zhuangzaishuju)
		}
		
	}
</script>

<style scoped>
	.el-tab-pane{
		display: none;
	}
   .input-with-select>>>	 .el-select .el-input {
	    width: 110px;
	  }
	  .el-input{
		  width: 600px;
	  }
	  .input-with-select{
		  width: 1000px;
	  }
	  .input-with-select>>> .el-input-group__prepend {
	     background-color: #fff;
	    }
		.clicktochange{
			cursor: pointer;
			
		}
		.clicktochange:hover{
			color: aqua;
		}
		.select-in-select{
			width: 150px;
			font-weight: 500;
		}
		.select-in-select>>>.el-input .el-input__inner{
			border: 0;
		}
		
		.el-divider--horizontal {
		    display: block;
		    height: 1px;
		    width: 100%;
		    margin: 15px 0;
		}
</style>
