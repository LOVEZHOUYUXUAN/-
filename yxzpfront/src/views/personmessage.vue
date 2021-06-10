<template>
	<div >
		<div style = "position: relative;left: 200px;top: 40px;width:700px;height: 950px;border: 1px  #FF8C00;" id = "s1">
			<el-card>
				<div slot = "header">
					在线简历
				</div>
				<div style = "cursor: pointer;" @click="replace(0)" v-if = "show[0] == false">
					<el-row style="font-size:200%;font-weight: 500;">
						<el-col :span = "20">
							周宇轩
						</el-col>
						<el-col :span = "4">
							<el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span = "9">
							<i class= "el-icon-s-cooperation">22年应届生</i>
							<el-divider direction="vertical"></el-divider>
							<i class=  "el-icon-reading">本科</i>
							<el-divider direction="vertical"></el-divider>
							<i class= "el-icon-user">在校</i>
							
						</el-col>
					</el-row>
					<el-row>
						<i class= "el-icon-phone-outline">17854285025</i>
						<el-divider direction="vertical"></el-divider>
						<i class = "el-icon-chat-dot-round">zyx11111</i>
					</el-row>
				</div>
				<div v-else style = "background-color: honeydew;">
					<span>编辑个人信息</span>
					<el-row style = "margin-top: 20px;">
						<el-col :span = "12">
							姓名
						</el-col>
						<el-col :span = "12">
							当前求职状态
						</el-col>
					</el-row>
					
					<el-row style = "margin-top: 10px;">
						<el-col :span = "12">
							<el-input v-model="name" style="width: 200px;"></el-input>
						</el-col>
						<el-col :span = "12">
							<el-select v-model="condition">
								<el-option  value="离校随时到岗"></el-option>
								<el-option  value = "在校不考虑"></el-option>
								<el-option  value = "在校考虑"></el-option>
								<el-option  value = "在校一个月到岗"></el-option>
							</el-select>
						</el-col>
						
					</el-row>
					<el-row v-if = "vali==false" style = "line-height: 5px;font-size: smaller;color: red;margin-top: 3px;">名字不能为空</el-row>
					<el-row style = "margin-top: 10px;">
						<el-col :span = "12">
							性别
						</el-col>
						<el-col :span = "12">
							电话号码
						</el-col>
					</el-row>
					<el-row style = "margin-top: 10px;">
						<el-col :span = "12">
							 <el-button style = "width: 100px;" @click.native = "sexy = '男'">男</el-button>
							  <el-button style = "width: 100px;" @click.native = "sexy = '女'">女</el-button>
						</el-col>
						<el-col :span = "12">
							<el-input v-model="phoneNumber"></el-input>
						</el-col>
					</el-row>
					<el-row style = "margin-top: 10px;">
						<el-col :span = "12">
							生日
						</el-col>
						<el-col :span = "12">
							邮箱
						</el-col>
					</el-row>
					<el-row>
						<el-col :span = "12">
							<el-date-picker
							      v-model="birth"
							      type="date"
							      placeholder="选择日期">
							    </el-date-picker>
						</el-col>
						<el-col :span = "12">
							<el-input v-model = "email"></el-input>     <!-- 这里要有对邮箱的验证 -->
						</el-col>
					</el-row>
					<el-row style = "margin-top:10px;" type = "flex" justify="end">
						<el-button @click.native = "cancle(0)">取消</el-button>
					<el-button type="success" @click.native = "submitzore">完成</el-button>
					</el-row>
				</div>
			</el-card>
			<el-card>
				<div style = "cursor: pointer;" @click="replace(1)" v-if = "show[1] == false">
					<div style = "vertical-align: middle; display: inline-block;width: 2px;height: 25px;background-color: aqua;"></div>
					个人优势
					<el-row style = "margin: 20px;">
						独立完成前端业务开发
					</el-row>
				</div>
				<div v-else style = "background-color: honeydew;">
					<el-row style="font-size: large;font-weight: 400;line-height: 50px;">
						编辑个人优势
					</el-row>
					<el-row style = "margin-top: 10px;">
						<el-input  spellcheck="false" type = "textarea" :rows = "8" v-model = "goodness" maxlength="100"
  show-word-limit></el-input>
					</el-row>
					<el-row type  = "flex" justify="end" style = "margin-top: 10px;">
					<el-button @click.native = "cancle(1)">取消</el-button>
					<el-button type="success" @click.native  = "submitone">完成</el-button>
					</el-row>
				</div>
			</el-card>
			<el-card>
				<div style = "cursor: pointer;" @click="replace(2)" v-if = "show[2] == false">
					<div style = "vertical-align: middle; display: inline-block;width: 2px;height: 25px;background-color: aqua;"></div>
					期望职位
					<el-row style = "margin: 20px;">
						<i class= "el-icon-s-promotion">web前端</i>
						<el-divider direction="vertical"></el-divider>
					    <i class = "el-icon-coin">5万</i>
						<el-divider direction="vertical"></el-divider>
						<i class = "el-icon-location-outline">杭州</i>
					</el-row>
				</div>
				<div v-else style = "background-color: honeydew;">
				  <el-row style="font-size: large;font-weight: 400;line-height: 50px;">
							编辑求职期望
					</el-row>
					<el-row style = "margin-top: 10px;">
					<el-col :span = "12">
						类型
					</el-col>
					<el-col :span = "12">
						工作城市
					</el-col>
					</el-row>
				<el-row type  = "flex" justify="end" style = "margin-top: 10px;">
					<el-col :span = "12">
						 <el-button style = "width: 100px;" @click.native = "positiontype = '全职'">全职</el-button>
						  <el-button style = "width: 100px;" @click.native = "positiontype = '实习'">实习</el-button>
					</el-col>
					<el-col :span = "12">
						 <el-cascader
						    v-model="location"
						    :options="locations"
						    :props="{ expandTrigger: 'hover' }"
						   >
						
							</el-cascader>
					</el-col>
				</el-row>
		        <el-row style = "margin-top: 10px;">
					<el-col :span = "12">
                        期望职位						
					</el-col>
					<el-col :span = "12">
						薪资要求
					</el-col>
				</el-row>
				<el-row style = "margin-top: 10px;">
					<el-col :span = "12">
						<el-input v-model="wantposition" style = "width: 300px;"></el-input>
					</el-col>
					<el-col :span = "12">
						<el-select v-model = "pay">
							<el-option value = "面议"></el-option>
							<el-option value = "1k"></el-option>
							<el-option value = "2k"></el-option>
							<el-option value = "3k"></el-option>
							<el-option value = "4k"></el-option>
							<el-option value = "5k"></el-option>
							<el-option value = "6k"></el-option>
							<el-option value = "7k"></el-option>
							<el-option value = "8k"></el-option>
							<el-option value = "9k"></el-option>
							<el-option value = "10k"></el-option>
							<el-option value = "11k"></el-option>
							<el-option value = "12k"></el-option>
							<el-option value = "13k"></el-option>
							<el-option value = "14k"></el-option>
							<el-option value = "15k"></el-option>
							<el-option value = "16k"></el-option>
							<el-option value = "17k"></el-option>
							<el-option value = "18k"></el-option>
							<el-option value = "19k"></el-option>
							<el-option value = "20k"></el-option>
							<el-option value = "30k"></el-option>
							<el-option value = "40k"></el-option>
							<el-option value = "50k"></el-option>
						</el-select>
					</el-col>
				</el-row>
				</el-row>
				<el-row type  = "flex" justify="end" style = "margin-top: 10px;">
				<el-button @click.native = "cancle(2)">取消</el-button>
				<el-button type="success" @click.native  = "submittwo">完成</el-button>
				</el-row>
				</div>
			</el-card>
			<el-card>
				<div style = "cursor: pointer;" @click="replace(3)" v-if = "show[3] == false">
					<div style = "vertical-align: middle; display: inline-block;width: 2px;height: 25px;background-color: aqua;"></div>
					实习经历
					<el-row style = "margin: 20px;">
						
					</el-row>
					</div>
					<div v-else style = "background-color: honeydew;">
						<span>添加实习经历</span>
						<el-row style = "margin-top: 20px;">
							<el-col :span = "12">
								实习公司名称
							</el-col>
							<el-col :span = "12">
								所属部门
							</el-col>
						</el-row>
						
						<el-row style = "margin-top: 10px;">
							<el-col :span = "12">
								<el-input v-model="intershipCompany" style="width: 200px;" placeholder="例如:北京中国人华公司"></el-input>
							</el-col>
							<el-col :span = "12">
							 <el-input v-model="department" placeholder="产品部"></el-input>
							</el-col>
							
						</el-row>
						
						<el-row style = "margin-top: 10px;">
							<el-col :span = "12">
								职位名称
							</el-col>
							
						</el-row>
						<el-row style = "margin-top: 10px;">
							<el-col :span = "8">
								<el-input v-model = "intershipposition" style = "width: 200px;"></el-input>
							</el-col>
							
						</el-row>
						<el-row style = "margin-top: 10px;">
							实习时间
							</el-row>
							<el-row style = "margin-top: 10px;">
								 <el-date-picker
								      v-model="intershipStart"
								      type="date"
								      placeholder="选择日期">
								    </el-date-picker>
									<span style= "margin-left:10px;margin-right: 10px;">至</span>
									 <el-date-picker
									      v-model="intershipEnd"
									      type="date"
									      placeholder="选择日期">
									    </el-date-picker>
								</el-row>
								<el-row style = "margin-top: 10px;">
									工作内容
								</el-row>
								<el-row style = "margin-top: 10px;">
									<el-input  spellcheck="false" type = "textarea" :rows = "10" v-model = "workthing" maxlength="300"
									show-word-limit></el-input>
								</el-row>
						<el-row style = "margin-top:10px;" type = "flex" justify="end">
							<el-button @click.native = "cancle(3)">取消</el-button>
						<el-button type="success" @click.native = "submitthree">完成</el-button>
						</el-row>
					</div>
				
			</el-card>
			<el-card>
				<div style = "cursor: pointer;" @click="replace(4)" v-if = "show[4] == false">
					<div style = "vertical-align: middle; display: inline-block;width: 2px;height: 25px;background-color: aqua;"></div>
					项目经历
					<el-row style = "margin: 20px;">
					
					</el-row>
					
				</div>
				<div v-else style = "background-color: honeydew;">
					项目描述
					<el-row style="margin-top: 10px;">
					
							<el-input  spellcheck="false" type = "textarea" :rows = "10" v-model = "projectDecription" maxlength="1000"
							show-word-limit></el-input>
						
					</el-row>
				<el-row style = "margin-top:10px;" type = "flex" justify="end">
					<el-button @click.native = "cancle(4)">取消</el-button>
				<el-button type="success" @click.native = "submitfour">完成</el-button>
				</el-row>
				</div>
			</el-card>
			<el-card >
				<div style = "cursor: pointer;" @click="replace(5)" v-if = "show[5] == false">
					<div style = "vertical-align: middle; display: inline-block;width: 2px;height: 25px;background-color: aqua;"></div>
					教育经历
					<el-row style = "margin: 20px;">
						<el-card>
							<el-row>
								<el-col :span = "9">
									中国海洋大学
								</el-col>
								<el-col :span = "4">
									2018-2022
								</el-col>
							</el-row>
							<el-row>
								
									计算机科学与技术
								
								<el-divider direction="vertical"></el-divider>
								
									本科
								
							</el-row>
						</el-card>
					</el-row>
				</div>
				<div v-else style = "background-color: honeydew;">
					<span>添加教育经历</span>
					<el-row style = "margin-top: 20px;">
						<el-col :span = "12">
							学校名称
						</el-col>
						<el-col :span = "12">
							学历
						</el-col>
					</el-row>
					
					<el-row style = "margin-top: 10px;">
						<el-col :span = "12">
							<el-input v-model="university" style="width: 200px;" placeholder=""></el-input>
						</el-col>
						<el-col :span = "12">
					    <el-select v-model="education">
							<el-option value = "初中及以下"></el-option>
							<el-option value = "中专/中技"></el-option>
							<el-option value = "高中"></el-option>
							<el-option value = "大专"></el-option>
							<el-option value = "大学"></el-option>
							<el-option value = "硕士"></el-option>
							<el-option value = "博士"></el-option>
						</el-select>
						</el-col>
						
					</el-row>
					
					<el-row style = "margin-top: 10px;">
						<el-col :span = "12">
							专业
						</el-col>
						
					</el-row>
					<el-row style = "margin-top: 10px;">
						<el-col :span = "8">
							<el-input v-model = "major" style = "width: 200px;"></el-input>
						</el-col>
						
					</el-row>
					<el-row style = "margin-top: 10px;">
					 时间段
						</el-row>
						<el-row style = "margin-top: 10px;">
							 <el-date-picker
							      v-model="schoolStart"
							      type="date"
							      placeholder="选择日期">
							    </el-date-picker>
								<span style= "margin-left:10px;margin-right: 10px;">至</span>
								 <el-date-picker
								      v-model="schoolEnd"
								      type="date"
								      placeholder="选择日期">
								    </el-date-picker>
							</el-row>
							<el-row style = "margin-top: 10px;">
								在校经历
							</el-row>
							<el-row style = "margin-top: 10px;">
								<el-input  spellcheck="false" type = "textarea" :rows = "10" v-model = "schoolExprience" maxlength="1000"
								show-word-limit></el-input>
							</el-row>
					<el-row style = "margin-top:10px;" type = "flex" justify="end">
						<el-button @click.native = "cancle(5)">取消</el-button>
					<el-button type="success" @click.native = "submitfive">完成</el-button>
					</el-row>
				</div>
			</el-card>
		</div>
		<div style = "width: 100px;left:150px;top:100px; position: fixed;">
			<el-menu active-text-color = "#409EFF" :default-active = activeItem>
				<el-menu-item   style = "font-weight: 600;">简历信息</el-menu-item>
				<el-menu-item  index = "0" @click = "change(0)">个人信息</el-menu-item>
				<el-menu-item  index = "1" @click = "change(1)">个人优势</el-menu-item>
				<el-menu-item  index = "2" @click = "change(2)">期望职位</el-menu-item>
				<el-menu-item  index = "3" @click = "change(3)"> 实习经历</el-menu-item>
				<el-menu-item  index = "4" @click = "change(4)">项目经历</el-menu-item>
				<el-menu-item  index = "5" @click = "change(5)">教育经历</el-menu-item>
			</el-menu>
		</div>
		
		
	</div>
</template>

<script>
	import locations from '../locationjson.js'
	export default{
          data()
		  {
			  return {
				 activeItem:"0",
				 show:[false,false,false,false,false,false],
				 name:'',
				 condition:'',
				 sexy:'',
				 phoneNumber:'',
				 birth:'',
				 email:'',
				 vali:true,
				 goodness:'',
				 positiontype:'',
				 location:'',
				 locations:locations,
				 wantposition:'',
				 pay:'',
				 intershipCompany:'',
				 department:'',
				 intershipStart:'',
				 intershipEnd:'',
				 workthing:'',
				 projectDecription:'',
				 university:'',
				 major:'',
				 education:'',
				 schoolStart:'',
				 schoolEnd:'',
				 schoolExprience:''
				  }
		  },
		  methods:{
			  change(index)  
			  {
				  let arr= Array.from(document.getElementById("s1").children)
				  for(let item = 0;item<6;item++)
				  if( item == index )
				  {
					  if(index == 0)
					  {arr[item].children[1].style.border = "0.5px solid #aaff7f"
					  }else{
						   arr[item].children[0].style.border = "0.5px solid #aaff7f"
					  } 
			      }else{
					  if(item == 0)
					  {arr[item].children[1].style.border = ""
					  }else{
	                      arr[item].children[0].style.border = ""
					  } 
				  }
				  window.scrollTo({
					  top:100*index,
					  behavior:'smooth'
				  })
			  },
			  replace(index)
			  {
				  
				  this.activeItem  = index+'';
				 this.show.splice(index,1,true) //这里处理数组的方法，不能直接赋值
				 if(index == 0)
				 {
					 
					 document.getElementById("s1").children[index].children[1].style.backgroundColor="honeydew"
				 }else{
					 document.getElementById("s1").children[index].children[0].style.backgroundColor="honeydew"
				 }
			  },
			  submitzore()
			  {
				  if(this.name == '')
				  {
					  this.vali = false
				  }else{
					  //在这里提交信息，并改变个人的信息，将信息提交到store里
					  //并改变页面信息
					  this.show.splice(0,1,false)
				  }
				  this.$nextTick(()=>{
					  document.getElementById("s1").children[0].children[1].style.backgroundColor="#fff"
				  })
			  },
			  submitone()
			  {
				  //提交个人优势
				  this.show.splice(1,1,false)
				  this.$nextTick(()=>{
				  	document.getElementById("s1").children[1].children[0].style.backgroundColor="#fff"
				  })
			  },
			  cancle(index)
			  {
				  //什么都不做，只关闭页面
				  this.show.splice(index,1,false)
				  if(index == 0)
				  {
				  		document.getElementById("s1").children[index].children[1].style.backgroundColor="#fff"
				  }else{
				  		document.getElementById("s1").children[index].children[0].style.backgroundColor="#fff"
				  }
			  },
			  submittwo()
			  {
				  this.show.splice(2,1,false)
				  this.$nextTick(()=>{
				  	document.getElementById("s1").children[2].children[0].style.backgroundColor="#fff"
				  })
			  },
			  submitthree()
			{
					this.show.splice(3,1,false)
					//将数据显式出来，并传个数据库
					this.$nextTick(()=>{
						document.getElementById("s1").children[3].children[0].style.backgroundColor="#fff"
					})
			},
			submitfour()
			{
				this.show.splice(4,1,false)
				//将数据显式出来，并传个数据库
				this.$nextTick(()=>{
					document.getElementById("s1").children[4].children[0].style.backgroundColor="#fff"
				})
			},
			submitfive()
			{
				this.show.splice(5,1,false)
				//将数据显式出来，并传个数据库
				this.$nextTick(()=>{
					document.getElementById("s1").children[5].children[0].style.backgroundColor="#fff"
				})
			}
		  },
		  mounted()
		  {
			  console.log(locations)
		  }
	}
</script>

<style scoped>
	#s>>>.el-card__body{
		border:1px solid #179A16;
	}
</style>
