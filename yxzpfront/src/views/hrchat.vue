<template>
	<div style = "width: 1206px;margin-left:40px;margin-top:30px;border: 1px solid #FFFFFF;">
		<div  class = "top0">
		<div class = "top1">
			<span>最近联系的人</span>
		</div>
		<div class = "top2">
			{{chating.name}}|{{chating.target}}
					</div>
		</div>
		<div>
		<div class = "left" id = 's1'>
			<div v-for="item in chattouserAll" class = "left-div" @click = "clickcard($event,item)">
				 <!-- <el-avatar size= "large" :src= 'require("../assets/hrheadimage/"+item.headimage)' style = "margin-top: 30px;margin-left: 50px;"></el-avatar> -->
				<div style = "font-size: smaller;float: right;width: 250px;margin-top: 30px;pointer-events: none;"  >{{item.name}}·正在线上</div>
				<div style = "font-size: smaller;float: right;width: 250px;margin-top: 0px;pointer-events: none;" >{{item.target}}</div>
				
			</div>
			<!-- <el-card v-for="item in talkedHr" class = "left-card" @click.native = "clickcard($event)">
				<el-image style = ";"></el-image>
				<span style = "vertical-align:middle;font-size: smaller;">hrname</span>
				<span style = "margin-left: 100px;">正在线上</span>
			</el-card> -->
			
		</div>
		<div class= "right">
			<div class= "right-top">
				<el-row type = "flex"  v-for = "item in chating.textList" :justify = "item[1]" >
				<div style ="background-color:#FF8C00;padding: 5px;border-radius: 5%;margin-bottom: 5px;" >
					<span v-for="ite in item[0]">{{ite}}<br></span>
				 </div>
				</el-row>
			</div>
			<div class= "right-bottom">
				<el-input
				  type="textarea"
				  :rows="9"
				  placeholder="请输入内容"
				  v-model="text"
				  spellcheck="false">
				</el-input>
	             <el-button round="" style ="position: absolute;right:500px;bottom: 60px;" @click.stop = "sendMessage(text)">发送</el-button>
			</div>
		</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
		return {
			textarea:'',
			text :'',
			eventcontorl:'',
			chating:{name:'',
			         education:'',
					 target:'',
					 id:'',
					 textList:[]},
			chattouserAll:[]
		}},
		watch:
		{   
			//看是不是就只监控了长度，而里面的textlist没有监控？
			chattouserAll()
			{
				this.$nextTick( ()=>{
					let divv = document.getElementById('s1')
					this.eventcontorl = divv.firstElementChild
					// console.log(divv.firstElementChild)
					divv.firstElementChild.style.backgroundColor = 'beige'
					
				})
			},
			chating()
			{
				console.log(this.chating)
			}
			
		},
		sockets:{
			//只能在接受消息后再发回去
			receivmsg(data)
			{
				console.log('接受到了私发信息')
				let obj = {0:[data.msg] ,
				           1:'start'}
				    
					
					let v  = true
					for(let i = 0;i<this.chattouserAll.length;i++)
					{
						if(this.chattouserAll[i].id == data.usermessage.id )
						{
							v = false
						}
					}
					if(v == true)
					{
						data.usermessage.textList = []
						
						this.chattouserAll.unshift(data.usermessage)
					}
					
					for(let i = 0;i<this.chattouserAll.length;i++)
					{
						if(this.chattouserAll[i].id == data.usermessage.id)
						{
							
							this.chattouserAll[i].textList.push(obj)
							this.chating =  this.chattouserAll[i]
							console.log(this.chating,11111)
						}
					}
					
					
				
			}
		},
		methods:{
			clickcard(event,item)
			{
				event.target.style.backgroundColor = "beige"
				if(this.eventcontorl == '')
				{
					
					this.eventcontorl = event.target
					this.chating.name = item.name
					this.chating.target = item.target
					this.chating.id = item.id
					this.chating.education = item.education
					this.chating.textList = item.textList
				}else if(this.eventcontorl == event.target)
				{
					
				}
				else{
					
					this.eventcontorl.style.backgroundColor = "#fff"
					this.eventcontorl= event.target
					this.chating.name = item.name
					this.chating.target = item.target
					this.chating.id = item.id
					this.chating.education = item.education
					this.chating.textList = item.textList
				}
				},
			
			sendmsg(){
				this.$socket.emit('sendmsg',{
					hrid:this.$store.state.Hregisterper,
					ToUserid:this.chating.id,
					msg :this.text
				})
			},
			sendMessage(text)
			{
				let arr  = text.split('\n')
				console.log(arr)
				let obj = {0:arr,
				           1:'end'}
				this.sendmsg()
				for(let t = 0;t<this.chattouserAll.length;t++)
				{
					if(this.chattouserAll[t].id == this.chating.id )
					{
						this.chattouserAll[t].textList.push(obj);
					}
				}
			    console.log(this.chating,22222)
				// this.chating.textList.push(obj);
				
				this.text = ''
			}
		},
		created()
		{
			//把最近联系的人的请求从数据库中请求过来，并显示是否在线
			//用队列实现最近联系的人
			
		}
		
	}
</script>

<style scoped>
	.top0{
		width: 1000px;
		border: 1px solid #FFFFFF;
		overflow: hidden;  /* 让父元素变为bfc,从而清除浮动  ，还可以通过clear 清楚浮动的影响*/
	}
	
	.top1{
		float: left;
		width: 400px;
		text-align: center;
		color: darkgray;
		height: 50px;
		background-color:antiquewhite;
		line-height:50px ;
		border: 1px solid #A9A9A9;
	}
	.top1::after{
		clear: both;
		display: block;
		content: ' ';
	}
	.top2{
		margin-left: 406px;
		width: 800px;
		text-align:start;
		color: darkgray;
		height: 50px;
		background-color:antiquewhite;
		line-height:50px ;
	}
	.left{
		float: left;
		width: 400px;
		height: 600px;
		overflow-y:scroll;
	}
	.left-div:hover{
		background-color:beige;
		cursor: pointer;
	}
	
	.left-div{
		height: 100px;
		border: 0.5px solid #F5F5DC;
	}
	.left-div-1{
		font-size: smaller;
		float: right;
		width: 250px;
		margin-top: 30px;
	}
	.left-div-1:hover{
		background-color:beige;
		cursor: pointer;
	}
	.left-div-2{
		font-size: smaller;
		float: right;
		width: 250px;
		margin-top: -10px;
	}
	.left-div-2:hover{
		background-color:beige;
		cursor: pointer;
	}
	.right{
		margin-left: 406px;
		width: 590px;
		height: 600px;
		
	}
	.right-top{
		height: 400px;
		border: 1px solid #BFBFBF;
		padding: 5px;
	}
	.right-bottom{
		height: 200px;
		border: #BFBFBF;
	}
	div::-webkit-scrollbar{
	  width:5px;
	  height:10px;
	  /**/
	}
	div::-webkit-scrollbar-track{
	  background: rgb(239, 239, 239);
	  border-radius:2px;
	}
	div::-webkit-scrollbar-thumb{
	  background: #bfbfbf;
	  border-radius:10px;
	}
	div::-webkit-scrollbar-thumb:hover{
	  background: #333;
	}
	div::-webkit-scrollbar-corner{
	  background: #179a16;
	}
</style>
