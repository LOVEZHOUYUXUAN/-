<template>
	<div style = "position: relative;left: 150px;  width: 800px;">
		<el-card shadow = "hover"   v-for="(item,index) of currentpage" style="cursor: pointer;" @click.native = "tohrpage(item.id)" >
			<div slot = "header" class = "clearfix" >
				
				<el-image :src = "item.company.headimage" style = "width: 50px; position: absolute;right: 20px;"></el-image>
				
				<div style = "width: 700px;">
				  <el-row style="color: #42B983;">
					  <el-col :span = '5'>{{item.positonname}} </el-col>
					  <el-col :span = '8'>[{{item.location}}]</el-col>
					  <el-col :span = '11'>{{item.company.name}}</el-col>
					  
				  </el-row>
				  <el-row style = "margin-top: 10px;">
					  <el-col :span = "4" style = "color: red;">{{item.pay instanceof Array ? item.pay[0]+'·'+item.pay[1]:item.pay }}</el-col>
					  <el-col :span = "5" style = "font-size: small;margin-top: 4px;"><span v-for = "(ite,index) in item.require">{{index == 0?ite:' | '+ite}}</span></el-col>
					  <el-col :span = "4" :key = "index">
						 
						  <span  :style = "style1"  >  <!-- 这里跳转到聊天页面 -->
						<i class = "el-icon-chat-dot-square" style = "margin-left: 5px;font-size: smaller;" @mouseover="changes($event)" @mouseleave="back($event,index)"  @click.stop = "tochat($store.state.userId,item.hrid)">{{'      '+item.hr}}</i>
						 </span> 
						
						
							 
						
							  </el-col>   <!-- 画胶囊 使radius等于高度一半 -->
					  <el-col :span = "11"	>
					  <span>{{item.company.field}}</span>
					  <el-divider direction="vertical"></el-divider>
					  <span>{{item.company.finance}}</span>
					  <el-divider direction="vertical"></el-divider>
					  <span>{{item.company.scale}}</span>
					  </el-col>	  
					 <!-- <el-col :span = "12" -->
				</el-row>
				  </div> 
				 
			</div>
			<div>
				<el-row>
					<el-col :span = "12"><el-tag size="mini" style = "margin-left: 5px;" v-for = "ite in item.keyword ">{{ite}}</el-tag>
					</el-col>
					<el-col :span = "12">{{item.company.welfare}}</span></el-col>
				</el-row>   
			</div>
		</el-card>
		<div style ="margin-top: 30px;margin-left: 50px;">
			<el-pagination
			background 
			layout="prev, pager, next"
			:total="pages"
			 @current-change ="changepages"></el-pagination>
		</div>
	</div>
</template>

<script>
	
	export default {
		props:['message'],
		data(){
			return {
				currentpage:this.message.filter(function(item,index){
					
					return index<15
				}),
				style1:{
					display: "inline-block",
					width: "90px",
					height: "20px",
					border: "1px solid antiquewhite",
					borderRadius:"10px",
					
				},
				style2:{
					display: "inline-block",
					width: "90px",
					height: "20px",
					border: "1px solid antiquewhite",
					borderRadius:"10px",
					backgroundColor: "aqua"
				}
				
			}
		},
		watch:
		{
			message:{
				handler(newV,oldV)
				{
					this.currentpage = this.message.filter(function(item,index){
						return index<15
					})
				},
				deep:true
			}
		},
		computed:
		{
			//用computed,去接受值，当传经来的值改变时，视图就会改变，
			//在本页面修改，发现计算失败
			positionMassage()
			{   
				console.log(2222,'该百年2')
				return this.message
			},
			pages()
			{
				
				let pages =parseInt( this.message.length/15);
				
				pages = this.message.length%15 == 0?pages:pages+1
				return pages*10
			}
		},
		methods:{
			tohrpage(id)
			{
				this.$router.push({name:'hrpage',params:{id:id}})
			},
			changepages(page)
			{
				
				this.currentpage =  this.positionMassage.filter(function(item,index)
				{
					
					return index>=(page-1)*15&&index<page*15
				})
			},
			changes(event)
			{
				  // let mid = this.style1
				  // this.style1 = this.style2
				  // this.style2  = mid;
				  
				  let span = event.target.parentNode
				 span.style.backgroundColor  =  "aqua"
				 span.style.cursor = "pointer"
			       event.target.innerText = "立即沟通"	
			},
			back(event,index)
			{   
				let span = event.target.parentNode
				span.style.backgroundColor  = ""
				event.target.innerText = this.currentpage[index].hr
			},
			tochat(id,hrid)
			{
				this.$router.push('../chat/'+id+'/'+hrid)
			}
		}
		
	}
</script>

<style scoped>
	.clearfix:before,
	  .clearfix:after {
	    display: table;
	    content: "";
	  }
	  .clearfix:after {
	    clear: both;
		
		
		}
</style>
