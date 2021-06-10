import Vue from 'vue'
import Vuex from 'vuex'
import common  from "../common.js"
import Router from "../router/index.js"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	  token:'',//初始化token
	  showNav:false,
	  username:'',
	  target:'',
	  userId:'',
	  location:'',
	  positionMessage:{},
	  phone:'',
	  age:'',
	  education:'',
	  positions:'',
	  closetotouch:'',
	  
	  Hregisterper:'',
	  Huser:'',
	  Hpassword:'',
	  Hname:'',
	  Hposition:'',
	  headimage:'',
	  Hcompany:'',
	  
	  
  },
  mutations: {
	  //设置从后台传入的token
	  setToken(state,token){
		  state.token = token
		  localStorage.token  = token;
	  },
	  changeShowNav(state)
	  {
		  state.showNav = !state.showNav;
	  },
	  //设置用户的参数
	  setUser(state,userobj)
	  {
		  state.username = userobj.Ename;
		  state.target = userobj.Etarget;
		  state.userId = userobj.id;
		  state.location = userobj.Elocation;
		  state.phone = userobj.Ephone;
		  state.age = userobj.Eage;
		  state.education = userobj.Eeducation
	  },
	  setposition(state,positionbysearch)
	  {
		 
		 
		  state.positions = positionbysearch
		  Router.push('../position')
		 
	  },
	  setpostionsecond(state,positionbysearch)
	  {
		  console.log(positionbysearch)
		  state.positions = positionbysearch
		  
	  },
	  setclosetotouch(state,hrs)
	  {
		  for(let item of hrs)
		  {
			  item ==''?item = item :item.textList = []
		  }
		  state.closetotouch = hrs
		  console.log(hrs)
	  },
	  setHr(state,hrobj)
	  {
		  state.Hregisterper = hrobj.Hregisterper
		  state.Huser = hrobj.Huser
		  state.Hpassword = hrobj.Hpassword
		  state.Hname = hrobj.Hname
		  state.headimage = hrobj.headimage
		  state.Hcompany = hrobj.Hcompany
		   state.Hposition = hrobj.Hposition
		   
	  },
	  settextlist(state,data)
	  {
		  
		  for(let item of state.closetotouch)
		  {
			  if(item != '' && item.id == data.id)
			  {
				  console.log(item,555)
				  item.textList.push(data.obj1)
			  }
		  }
	  }
	 
  },
  getters:{
	  //获取token
	  getToken(state){
		  if(!state.token)
		  {
			  state.token = localStorage.getItem('token');
			  
		  }
		  return state.token
	  }
  },
  actions: {
	  fetpositionbyser(context,data)
	  {
		  let message
		  if(data.message1 == '' &&data.message2 == '')
		  {return } //这里有直接return的，最后要把职业加满
		  if(data.message1 !=''&&data.message2 !='')
		  {
			   message = {
				  position:data.message1[1],
				  company:data.message2
			  }
			  
			  
		  }
		  if(data.message1 != ''&&data.message2 == '')
		  {
			  message = {position:data.message1[1]}
		  }
		  if(data.message1 == ''&&data.message2 !='')
		  {
			  message  = {positionOrcompany:data.message2}
		  }
		  common.fet("http://localhost:3000/position/searchfisrtpage",{
		  				  method:'POST',
		  				  obj:message,
		  }).then(res=>{
			 
		  		context.commit('setposition',res)
		  })
		 
	  },
	  fetpositionbyser2(context,data)
	  {
		  let message
		  if(data.input != '')
		  {
			  //输入条不为零，则只取输入条内容和地址
			   message = {location:data.location,
			                 input:data.input   }
		  }else{
			   message = {
				  location:data.location,
				  positiontype :data.positiontype,
				  company:data.company
			  }
		  }
		  common.fet("http://localhost:3000/position/searchsecondtpage",{
		  				  method:'POST',
		  				  obj:message,
		  }).then(res=>{
		  			 
		  		context.commit('setpostionsecond',res)
		  })
	  },
	  getcloseto(context,data)
	  {   
		  console.log(data, 11111111)
		  fetch(`http://localhost:3000/chat/${data.employeeid}/${data.hrid}`).then(res=>{
			  return   res.json()
		  }).then(resjson=>{
			  context.commit('setclosetotouch',resjson)
		  })
	  },
	  getclosetoo(context,data)
	  {
		  fetch(`http://localhost:3000/chat/${data.employeeid}`).then(res=>{
		  			  return   res.json()
		  }).then(resjson=>{
		  			  context.commit('setclosetotouch',resjson)
		  })
	  }
	  
  },
  modules: {
  }
})
