<template>
	<div style = "position: absolute;width: 300px;right: 40px;">
		<el-card>
			<div style = "text-align: center;">
			<span>看过的职位</span>
			</div>
		</el-card>
		<el-card>
			<div>
				<el-row>
					<el-col :span = "12">前端开发实习生</el-col>
					<el-col :span = "12" style = "color:red">50万</el-col>
				</el-row>
				<el-row style= "margin-top: 5px;">tensflow公司</el-row>
			</div>
		</el-card>
	</div>
</template>

<script>
	//看过的职位的处理逻辑：将看过的职位信息储存在store里，并且是最近的5个，然后储存在数据库，并且展示
</script>

<style scoped>
</style>
