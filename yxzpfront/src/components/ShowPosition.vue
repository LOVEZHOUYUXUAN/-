<template>
	<div>
		<el-row>
			<el-col :span='12'>
	<el-menu class = "el-menu-vertical-demo" :collapse="true">
		<el-submenu index = '1'>
			<template slot = "title">
				<ul class = "menu">
					<li><i><strong>后台开发</strong></i></li>
					<li><i>java</i></li>
					<li><i>node.js</i></li>
					<li><i>php</i></li>
				</ul>
				<span slot = "title">后台开发</span>
			</template>
			<el-menu-item-group title="后台开发">
				<el-menu-item index = '1-1' @click.native = "toposition($event)">
					java
				</el-menu-item>
				<el-menu-item index = '1-2' @click.native = "toposition($event)">
					node.js
				</el-menu-item>
				<el-menu-item index = '1-3' @click.native = "toposition($event)">
					python
				</el-menu-item>
				<el-menu-item index = '1-4' @click.native = "toposition($event)">
					php
				</el-menu-item>
				<el-menu-item index = '1-5' @click.native = "toposition($event)">
					hadoop
				</el-menu-item>
				<el-menu-item index = '1-6' @click.native = "toposition($event)">
					golang
				</el-menu-item>
			    <el-menu-item index = '1-7' @click.native = "toposition($event)">
				c/c++
			    </el-menu-item>
			</el-menu-item-group>
		</el-submenu>
		<el-submenu index = '2'>
			<template slot = "title">
				<ul class = "menu">
					<li style='text-decoration:blink;'><i><strong>移动开发</strong></i></li>
					<li><i>android</i></li>
					<li><i>ios</i></li>
					<li><i>html5</i></li>
				</ul>
				<span slot = "title">移动开发</span>
			</template>
			<el-menu-item-group title="移动开发">
				<el-menu-item index = '2-1' @click.native = "toposition($event)">
					android
				</el-menu-item>
				<el-menu-item index = '2-2' @click.native = "toposition($event)">
					ios
				</el-menu-item>
				<el-menu-item index = '2-3' @click.native = "toposition($event)">
					html5
				</el-menu-item>
				<el-menu-item index = '2-4' @click.native = "toposition($event)">
					移动web前端
				</el-menu-item>
			</el-menu-item-group>
		</el-submenu>
		<el-submenu index = '3'>
			<template slot = "title">
				<ul class = "menu">
					<li style='text-decoration:blink;'><i><strong>测试</strong></i></li>
					<li><i>移动端测试</i></li>
					<li><i>游戏测试</i></li>
					<li><i>软件测试</i></li>
				</ul>
				<span slot = "title">测试</span>
			</template>
			<el-menu-item-group title="测试">
				<el-menu-item index = '3-1' @click.native = "toposition($event)">
					移动端测试
				</el-menu-item>
				<el-menu-item index = '3-2' @click.native = "toposition($event)">
					游戏测试
				</el-menu-item>
				<el-menu-item index = '3-3' @click.native = "toposition($event)">
					软件测试
				</el-menu-item>
				<el-menu-item index = '3-4' @click.native = "toposition($event)">
					测试开发
				</el-menu-item>
			</el-menu-item-group>
		</el-submenu>
	  <el-submenu index = '4'>
	  	<template slot = "title">
	  		<ul class = "menu">
	  			<li style='text-decoration:blink;'><i><strong>运维</strong></i></li>
	  			<li><i>运维工程师</i></li>
	  			<li><i>网络工程师</i></li>
	  			<li><i>系统管理员</i></li>
	  		</ul>
	  		<span slot = "title">测试</span>
	  	</template>
	  	<el-menu-item-group title="运维">
	  		<el-menu-item index = '4-1' @click.native = "toposition($event)">
	  			运维工程师
	  		</el-menu-item>
	  		<el-menu-item index = '4-2' @click.native = "toposition($event)">
	  			网络工程师
	  		</el-menu-item>
	  		<el-menu-item index = '4-3' @click.native = "toposition($event)">
	  			系统管理员
	  		</el-menu-item>
	  		
	  	</el-menu-item-group>
	  </el-submenu>
	  <el-submenu index = '5'>
	  	<template slot = "title">
	  		<ul class = "menu">
	  			<li style='text-decoration:blink;'><i><strong>数据</strong></i></li>
	  			<li><i>数据架构师</i></li>
	  			<li><i>数据挖掘</i></li>
	  			<li><i>数据分析师</i></li>
	  		</ul>
	  		<span slot = "title">数据</span>
	  	</template>
	  	<el-menu-item-group title="数据">
	  		<el-menu-item index = '5-1' @click.native = "toposition($event)">
	  			数据架构师
	  		</el-menu-item>
	  		<el-menu-item index = '5-2' @click.native = "toposition($event)">
	  			数据挖掘
	  		</el-menu-item>
	  		<el-menu-item index = '5-3' @click.native = "toposition($event)">
	  			数据分析师
	  		</el-menu-item>
	  		
	  	</el-menu-item-group>
	  </el-submenu>
	  <el-submenu index = '6'>
	  	<template slot = "title">
	  		<ul class = "menu">
	  			<li style='text-decoration:blink;'><i><strong>人工智能</strong></i></li>
	  			<li><i>机器学习</i></li>
	  			<li><i>计算机视觉</i></li>
	  			<li><i>自然语言处理</i></li>
	  		</ul>
	  		<span slot = "title">数据</span>
	  	</template>
	  	<el-menu-item-group title="人工智能">
	  		<el-menu-item index = '6-1' @click.native = "toposition($event)">
	  			机器学习
	  		</el-menu-item>
	  		<el-menu-item index = '6-2' @click.native = "toposition($event)">
	  			计算机视觉
	  		</el-menu-item>
	  		<el-menu-item index = '6-3' @click.native = "toposition($event)">
	  			自然语言处理
	  		</el-menu-item>
	  		<el-menu-item index = '6-4' @click.native = "toposition($event)">
				语音识别
			</el-menu-item>
			<el-menu-item index = '6-5' @click.native = "toposition($event)">
				算法研究员
			</el-menu-item>
			<el-menu-item index = '6-6' @click.native = "toposition($event)">
				深度学习
			</el-menu-item>
			<el-menu-item index = '6-7' @click.native = "toposition($event)">
				搜索算法
			</el-menu-item>
	  	</el-menu-item-group>
	  </el-submenu>
	  <el-submenu index = '7'>
	  	<template slot = "title">
	  		<ul class = "menu">
	  			<li style='text-decoration:blink;'><i><strong>前端开发</strong></i></li>
	  			
	  			<li><i>web前端</i></li>
	  		</ul>
	  		<span slot = "title">数据</span>
	  	</template>
	  	<el-menu-item-group title="前端开发">
	  		
	  		<el-menu-item index = '7-1' @click.native = "toposition($event)">
	  			web前端
	  		</el-menu-item>
	  		
	  	</el-menu-item-group>
	  </el-submenu>
	</el-menu>
	</el-col>
	<el-col :span = '12'>
	<el-image style ='width: 522px; height: 226px; margin-top: 50px;'  :src = "require('../assets/firstpage1.jpg')">	
	</el-image>
	<el-image style ='width: 522px; height: 112px; margin-top: 0px;'  :src = "require('../assets/firstpage2.jpg')">
	</el-image> 
	</el-col>
	</el-row>
	
	<!-- <div style = "display: inline-block;">
		<el-image style ='width: 200px; height: 200px;' :fit= 'fit' :src = "require('../assets/firstpage1.jpg')">
			
		</el-image>
		</div> -->
	</div>
</template>

<script>
	export default {
		methods:{
			toposition(event)
			{
				
				let data = {message1:['',event.target.innerText],
				            message2:''}
				this.$store.dispatch('fetpositionbyser',data)
			}
		}
	}
</script>

<style>
	.el-menu-vertical-demo{
		margin-left: 50px;
		margin-top: 50px;
		width: 500px;
	}
	.menu{
		position :absolute;
		list-style-type: none;
		white-space: nowrap;
	}
	.menu li{
		float:left;
		/* 两项的最小间隔 */
		min-width: 100px;
	}
</style>
