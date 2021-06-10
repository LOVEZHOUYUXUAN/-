import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'  //vue-socket.io的socket.io-client版本太低 

Vue.config.productionTip = false
Vue.use(new VueSocketIO({
	debug:true,
	connection:'ws://localhost:3000',
	
}))

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App),
  sockets:{
  	//监听socket事件消息
  	//连接后台socket
  	connect(){
  		console.log('连接成功')
  		
  	},
  	connecting(){
  		console.log('正在连接')
  	},
  	disconnect(){
  		console.log('断开连接')
  	},
  	sendMessage(data){
  		console.log(data);
  	},
	// receivmsg(data)
	// {
	// 	console.log('接受到了私法信息')
	// 	console.log(data)
	// }
	},
	
}).$mount('#app')
