<template>
  <div>
  	deviceShapeOperation

  	<div id="OperationArea">
  		
  	</div>

  	<div>
  	  <el-button type="primary" @click="">保存</el-button>
  	  <el-button @click="goBack">返回</el-button>
  	</div>

  </div>
</template>

<script>

export default {
  name:'deviceShapeOperation',

  methods: {
  	goBack() {
  	  this.$router.go(-1)
  	}
  }

}

</script>

<style type="text/css">
#OperationArea {
  width: 800px;
  height: 600px;
  background-color: #EFEFEF;
}

</style>
