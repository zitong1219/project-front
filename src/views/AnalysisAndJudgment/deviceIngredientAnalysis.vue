<template>
  <div class="app-container">
    <div>爆炸装置成分匹配结果</div>

    <div>
      <el-table
        :data="matchDataItems"
        border fit highlight-current-row stripe
        style="width: 601px; margin-top: 20px;">

        <el-table-column
          prop="exploEvi_id"
          label="exploEvi_id"
          align="center"
          width="150">
        </el-table-column>

        <el-table-column
          prop="exploSample_id"
          label="exploSample_id"
          align="center"
          width="150">
        </el-table-column>

        <el-table-column
          prop="matchType"
          label="matchType"
          align="center"
          width="150">
        </el-table-column>

        <el-table-column
          prop="matchDegree"
          label="matchDegree"
          align="center"
          width="150">
        </el-table-column>
      </el-table>
    </div>

    <el-button 
      style="margin-top:30px;"
      @click="goBack">
      返回
    </el-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getExlpoMatch } from '@/api/table'

export default {
  name: 'deviceIngredientAnalysis',

  computed: {
    ...mapGetters([])
  },

  data() {
    return {
      matchDataItems: []
    }
  },

  created() {
    this.fetchData()
  },

  methods: {
    fetchData() {
      getExlpoMatch().then(response => {
        this.matchDataItems = response.data.items
      })
    },

    goBack() {
      this.$router.go(-1)
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
