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

    goBack() {
      this.$router.go(-1)
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
