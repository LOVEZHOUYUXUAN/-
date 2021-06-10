<template>
	<div style="margin: 20px;">
 <Search></Search>
 <show-position></show-position>
 <Hotlist></Hotlist>
 </div>
</template>

<script>
// @ is an alias to /src

import Search from '../components/search.vue'
import ShowPosition from '../components/ShowPosition.vue'
import Hotlist from '../components/hotlist.vue'
export default {
  name: 'Home',
  components: {
	Search,
	ShowPosition,
	Hotlist
  },
  methods:{
	  
  },
  mounted()
  {
	 
  }
}
</script>
