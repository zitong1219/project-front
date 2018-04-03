<template>
  <div class="">

    <div style="">
      <el-input></el-input>
      <el-button></el-button>
      <el-button></el-button>
    </div>

    <el-table></el-table>

    <el-dialog></el-dialog>

    <el-dialog></el-dialog>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {

    }
  },

  computed: {
    ...mapGetters([
      'roles'
    ])
  },

  filters: {

  },

  created() {

  },

  methods: {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
