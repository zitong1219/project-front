<template>
  <div class="app-container">
    <div>deviceIngredientAnalysis</div>
    <el-button @click="goBack">返回</el-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'deviceIngredientAnalysis',

  computed: {
    ...mapGetters([])
  },

  data() {
    return {
      
    }
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    goBack() {
      this.$router.go(-1)
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
