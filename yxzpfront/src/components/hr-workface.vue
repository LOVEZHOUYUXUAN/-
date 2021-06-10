<template>
	
	<div class="workface" >
	<div class = "dr"></div>
	<div class = "drag">
	<el-row style= "margin-bottom: 5px;"><span style="font-weight:100;font-size:small;">招聘中</span></el-row>
	<el-row >
		<el-col :span = '5' style = "font-size:xx-large;color:#FAEBD7;">{{work.workname}}</el-col>
		<el-col :span = '11' style = "font-size:xx-large;color:red;">{{work.pay}}*{{work.howmany+'薪'}}</el-col>
		<el-col :span = '3'><el-button type  = 'danger' style = "width: 200px;" @click.prevent = "dialogVisible = true">立即沟通</el-button>
		</el-col>
	</el-row>
	<el-row style = "margin-top: 5px;">
		{{work.location}}
		<template v-for="item in work.require">
			·{{item}}
		</template>
		
	</el-row>
	<el-row style = "margin-top: 5px;">  <!-- 奖金福利 -->
	    
		<template v-for = "item in work.welfare">
			<el-tag  :hit = "true" type="warning" style = "margin-right: 10px; border-radius: 20%; width: 100px;text-align: center;">{{item}}</el-tag>
		</template>
	</el-row>
	</div>
	
	<el-dialog  :visible.sync="dialogVisible" width="500px"  append-to-body >
		<div  style ="display: flex;background-color: burlywood;margin :0;height: 50px;">
			<div><el-avatar :src = "hrheadimage" style = "vertical-align: middle;"></el-avatar></div> 
			<div><span style = "display: inline-block;">{{hrname}}</span><br>
			     <span>{{work.companyDescription.name}}·{{hrposition}}</span></div>
		</div>
		<div style=" height: 300px;border :1px solid #42B983;padding: 10px;overflow-y:auto" id = 'message'>
			<el-row type = "flex"  v-for = "item in textList" :justify = "item[1]" >
			<div style ="background-color:#FF8C00;padding: 5px;border-radius: 5%;margin-bottom: 5px;" >
				<span v-for="ite in item[0]">{{ite}}<br></span>
			 </div>
			</el-row>
			<!-- <el-row type = "flex" justify="start" v-for = "item in chatList" >
			<div style ="background-color:#FF8C00;padding: 5px;border-radius: 5%;margin-bottom: 5px;" >
				<span v-for="ite in item">{{ite}}<br></span>
			 </div>
			</el-row> -->
		</div>
		<!-- <div slot = "footer" > -->
		<div style = "position: relative;">
			
			<el-button style = "position: absolute;right:5px; bottom: 10px; z-index: 1;" size ="mini" @click = "sendMessage(text)">发送</el-button>
			
			<div >
			<el-input style = "z-index: 0;" type = "textarea" v-model="text"  :rows = "5" >	
			</el-input>
			</div>
			</div>
		<!-- </div> -->
	</el-dialog>
	
	</div>
</template>

<script>
	export default {
		props:['positionMessage','hrname','hrheadimage','hrid','hrposition','hrid'],
		
		data(){
			return {
				work:this.positionMessage,
				dialogVisible :false,
				text :'',
				textList:[],
				chatList:[]
			}
		},
		// sockets:{
		// 	监听socket事件消息
		// 	连接后台socket
		// 	// connect(){
		// 	// 	console.log('连接成功')
				
		// 	// },
		// 	// connecting(){
		// 	// 	console.log('正在连接')
		// 	// },
		// 	// disconnect(){
		// 	// 	console.log('断开连接')
		// 	// },
		// 	// sendMessage(data){
		// 	// 	console.log(data);
				
				
		// 	// } ,
			
		// // 	//用户后台调用，打印数据
		// // 	receivemsg(data)
		// // 	{
		// // 		console.log('receivemsg',data)
		// // 		let arr = data.msg.split('\n')
		// // 		this.chatList.push(arr)
		// // 	}
			
			
		// // },
		sockets:{
			receivmsg(data)
			{
				console.log('接受到了私发信息')
				if(this.dialogVisible == true)
				{
					let obj = {0:[data.msg] ,
					           1:'start'}
					this.textList.push(obj)
				}
			}
		},
		methods:{
			//私发消息
			sendmsg(){
				this.$socket.emit('sendmsg',{
					
					usermessage:{
						education:this.$store.state.education,
						target:this.$store.state.target,
						name:this.$store.state.username,
						id:this.$store.state.userId
					},
					ToHrid:this.hrid,
					msg :this.text
				})
			},
			//将自己的id号加入，这里要区别以下worker和register的号码
			sendMessage(text)
			{
				let arr  = text.split('\n')
				let obj = {0:arr,
				           1:'end'}
				this.sendmsg()
				this.textList.push(obj);
				this.text = ''
			},
		},
		mounted() {
			// this.sockets.subscribe('receivemsg',data=>{
			// 	console.log('接受到了私发信息',data,this);
			// })
		}
	}
</script>

<style scoped>
	.workface{
		/* border-color:darkslateblue;
		background-color:slategrey;
		background-image: url(../assets/hr-workpage1.jpg) ;
		background-repeat:repeat-x ;
		background-position: 100% 0%; */
		/* filter: blur(2px); */
		height: 150px;
		position: sticky; /* 父元素的overflow要为 visiv */
		top:0px;
		
	}
	.dr{
		height: 150px;
		float:left;
		width: 100%;
		background-image: url(../assets/hr-workpage1.jpg) ;
		background-repeat:repeat-x ;
		background-position: 100% 0%;
		filter: blur(2px);
	}
	.drag{
		position: absolute;
        top:10px;
		left: 50px;
		width: 90%;
	}
	
</style>
