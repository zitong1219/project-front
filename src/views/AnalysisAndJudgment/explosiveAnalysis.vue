<template>
  <div class="app-container">
    <div>炸药与原材料分析匹配结果</div>

    <div>
      <el-table
        :data="matchDataItems"
        border fit highlight-current-row stripe
        style="width: 801px; margin-top: 20px;">

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

        <el-table-column
          align="center"
          fixed="right"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="drawChart(scope.$index, scope.row)">
              绘图
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div 
      id="highChart" 
      v-if="drawChartFlag" 
      style="width: 100%; height: 600px; background: #EFEFEF; margin-top: 50px">
      <!-- {{ drawExploSampleID }} -->
      <xrd-component :styles="styles" ref="simpleChart"></xrd-component>
    </div>

    <div
      id="highChart_xrf"
      v-if="drawChartFlag"
      style="width: 100%; height: 600px; background: #EFEFEF; margin-top: 50px">
      <!-- {{ drawExploSampleID }} -->
      <xrf-component :stylesxrf="styles_xrf" ref="simpleChart"></xrf-component>    
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
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';

HighchartsMore(Highcharts)

import XrdComponent from './XrdHighchartsComponent.vue';
import XrfComponent from './XrfHighchartsComponent.vue'

export default {
  name: 'explosiveAnalysis',

  computed: {
    ...mapGetters([])
  },

  data() {
    return {
      matchDataItems: [],
      drawChartFlag: false,
      drawExploSampleID: null,

      styles: {
        width: 1100,
        height: 600
      },

      styles_xrf: {
        width: 1100,
        height: 600
      },

      
    }
  },
  components: {
    XrdComponent,
    XrfComponent
  },

  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      getExlpoMatch().then(response => {
        this.matchDataItems = response.data.items
      })
    },

    drawChart(index, row) {
      console.log('--- drawChart: ', index, row)
      this.drawChartFlag = true
      this.drawExploSampleID = row.exploSample_id
    },

    goBack() {
      this.$router.go(-1)
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
