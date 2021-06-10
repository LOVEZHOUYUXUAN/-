<template>
	<el-container>
	<el-header  v-show = 'showNav'>
		<el-menu 
		:default-active="activeIndex"
		mode ="horizontal"
		background-color="#42B983"
		text-color="#fff"
		active-text-color="#ffd04b"
		:router="true"
		>
		  <el-menu-item index= "/">首页</el-menu-item>
		  <el-menu-item @click.native = "topositonzore">职位</el-menu-item>  <!-- //根据根路径进行跳转，否则是相对路径 -->
		  <!-- <el-menu-item index="3">公司</el-menu-item> -->
		  <el-menu-item index="../login" style = 'float:right' @click.native ="loginout" >退出</el-menu-item>
		  <el-menu-item index="../person" style = 'float:right'>你好，{{username}}<el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar></el-menu-item>
		  <el-menu-item @click.native = "chatto" style = 'float:right'><i class = 'el-icon-chat-dot-square' style = "color: black;"></i></el-menu-item>
		</el-menu>
		
  <!-- <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
	 </div> -->
	 
	 </el-header>
	
	 <el-container>
	<el-aside style = "width: 100px;" v-show = 'showNav'>
	</el-aside>
	 <el-main>
	<router-view></router-view>
   </el-main>
   </el-container>
  </el-container>
</template>

<script>
	module.exports = {
		data(){
			return {
				activeIndex:'1',
				
			}
			
		},
		computed:{
			showNav(){
				return this.$store.state.showNav;
			},
			username()
			{
				return this.$store.state.username;
			},
			target(){
				return this.$store.state.target;
			}
		},
		methods:{
			   loginout()
			   {
				   this.$store.commit('changeShowNav');
			   },
			   topositonzore()
			   {
				   
				   let message = {target:this.$store.state.target,
				                  location:this.$store.state.location}
				   fetch(`http://localhost:3000/position/frompage/${message.target}/${message.location}`).then(res=>{
				   	return res.json()
				   }).then(resjson=>{
				   	
					this.$store.commit('setposition',resjson)
				   })
			   },
			   chatto()
			   {
				   this.$router.push('/chat/'+this.$store.state.userId)
			   }
			   
		},
		
		mounted()
		{ 
			// join()//进入首页就将自己注册到
			
			if(!this.$store.state.token)
		   {
			  
			  
			   this.$router.push('login');
			   }else{
				   this.$store.commit('changeShowNav');
			   }
			
		},
		
	}
</script>
<style>
	
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
	html,body{
		  height: 100%;
	}
.el-header{
	/* //通过开发者工具看其class 名称来改变样式,如果没有data属性,则要使用穿刺 */
	 background-color:#42B983;
}
.el-aside{
	
	background-color:darkorange;
}
.el-container{
	background-color:#fff;
	
	
}

.el-main{
		padding: 0px;
		/* height: 500px; */ /* 内容比高度高就会有滚动条,overflow的形式决定是否可以滚动,以及怎样滚动 */
		overflow: visible;
	}
/* .a{
	margin-top: 0px ;
	/* 通过style,class 都可以控制组件的行为 
	   如果组件的属性是在style上写的，就得在style上改*/
	
</style>
