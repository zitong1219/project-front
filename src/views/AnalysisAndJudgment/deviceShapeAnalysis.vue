<template>
  <div class="app-container">
    <div>爆炸装置形态匹配结果</div>

    <div v-show="false">
      <el-table
        :data="matchDataItems"
        border fit highlight-current-row stripe
        style="width: 601px; margin-top: 20px;">

        <el-table-column
          prop="devShapeEvi_id"
          label="devShapeEvi_id"
          align="center"
          width="150">
        </el-table-column>

        <el-table-column
          prop="devShapeSample_id"
          label="devShapeSample_id"
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

    <!-- <div id="canvas" @mousemove="updateXY" @click="recordXY">
      X: {{ currentXY.x }} -- Y: {{ currentXY.y }}
    </div> -->

    <div>
      <el-button type="primary" @click="switchFunction(1)" plain>背景框</el-button>
      <el-button type="primary" @click="switchFunction(2)" plain>前景框</el-button>
      <el-button type="primary" @click="switchFunction(3)" plain>手动标背景</el-button>
      <el-button type="primary" @click="switchFunction(4)" plain>手动标前景</el-button>
      <el-button type="primary" @click="switchFunction(5)" plain>手动标PCB版</el-button>
      <el-button type="primary" @click="switchFunction(6)" plain>手动标元器件</el-button>
      <el-button type="warning" @click="recall" >撤销</el-button>
    </div>

    <div id="canvas">
      <canvas id="operatePic" 
        width="800" 
        height="600" 
        style="border:1px solid #d3d3d3; background: #FEFEFE;"
        @mousemove="updateXY" 
        @click="functionSelector">
      </canvas>
    </div>

    <div>
      coordinate-->  X: {{ currentXY.x }}  Y: {{ currentXY.y }}
      <ul>
        <li v-for="XY in dotXY">
          X: {{ XY.x }} -- Y: {{ XY.y }}
        </li>
      </ul>
      <!-- {{ dotXY }} -->
      <!-- {{ dotXYLength }} -->
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
import { getDevCompMatch } from '@/api/table'

export default {
  name: 'deviceShapeAnalysis',

  computed: {
    ...mapGetters([])
  },

  data() {
    return {
      matchDataItems: [],
      color: ['#000000', '#0018ba', '#ffc200', '#f32f15', '#cccccc', '#5ab639'],
      currentColor: '',
      backgroundBox: {
        name: 'backgroundBox',
        setFlag: false,
        coordinate: []
      },
      foregroundBox: {
        name: 'foregroundBox',
        setFlag: false,
        coordinate: []
      },
      backgroundDot: {},
      foregroundDot: {},
      PCBDot: {},
      ComponentsDot: {},

      context: {},

      coordinateAry: [],

      /* 存储当前表面状态数组-上一步 */
      preDrawAry: [],
      /* 存储当前表面状态数组-下一步 */
      nextDrawAry: [],
      /* 中间数组 */
      middleAry: [],

      currentXY: {
        x: 0,
        y: 0
      },

      rectFlag: 1,
      rectXY: {
        startXY: {
          x: 0,
          y: 0
        },
        endXY: {
          x: 0,
          y: 0
        }
      },
      dotXY: [],
      dotXYLength: 0,
      functionFlag: 0
    }
  },

  created() {
    this.fetchData()
  },

  mounted() {
    const canvas = document.getElementById('operatePic')
    this.context = canvas.getContext('2d')
    this.initDraw()
  },

  methods: {
    fetchData() {
      getDevCompMatch().then(response => {
        console.log(' --- deviceShapeAnalysis response', response)
        this.matchDataItems = response.data.items
      })
    },

    /* 空绘图区进栈 */
    initDraw() {
      const initData = this.context.getImageData(0, 0, 800, 600)
      this.middleAry.push(initData)
    },

    updateXY(event) {
      this.currentXY.x = event.offsetX
      this.currentXY.y = event.offsetY
    },

    switchFunction(switchFunctionFlag) {
      this.functionFlag = switchFunctionFlag
    },

    functionSelector(event) {
      switch (this.functionFlag) {
        case 0:
          console.log(' --- NO function!', event)
          break
        case 1:
          this.currentColor = this.color[0]
          this.drawBackgroundBox(event)
          break
        case 2:
          this.currentColor = this.color[1]
          this.foreGroundBox(event)
          break
        case 3:
          this.currentColor = this.color[2]
          this.recordXY(event)
          break
        case 4:
          this.currentColor = this.color[3]
          this.recordXY(event)
          break
        case 5:
          this.currentColor = this.color[4]
          this.recordXY(event)
          break
        case 6:
          this.currentColor = this.color[5]
          this.recordXY(event)
          break
        default:
          console.log(' --- Error!', event)
      }
    },

    recall() {
      console.log(' --- recall middleAry: ', this.middleAry)
      console.log(' --- recall coordinateAry: ', this.coordinateAry)
      if (this.middleAry.length > 1 && this.coordinateAry.length > 0) {
        this.coordinateAry.pop()
        this.middleAry.pop()
        const middleAryEnd = this.middleAry.length
        const contextData = this.middleAry[middleAryEnd - 1]
        this.context.putImageData(contextData, 0, 0)
      } else {
        alert('无操作')
      }
    },

    /* 绘制背景框 */
    drawBackgroundBox(event) {
      if (this.backgroundBox.setFlag) {
        alert('背景框已设置')
      } else {
        /* 起点、终点设置 */
        if (this.rectFlag % 2 === 1) {
          this.rectXY.startXY.x = event.offsetX
          this.rectXY.startXY.y = event.offsetY
          this.backgroundBox.coordinate.push(this.rectXY.startXY)
          console.log(' --- startXY:', this.rectXY.startXY)
        } else {
          this.rectXY.endXY.x = event.offsetX
          this.rectXY.endXY.y = event.offsetY
          this.backgroundBox.coordinate.push(this.rectXY.endXY)
          console.log(' --- endXY:', this.rectXY.endXY)
        }

        /* 绘制矩形框 */
        if (this.rectFlag % 2 === 0) {
          const rectWidth = this.rectXY.endXY.x - this.rectXY.startXY.x
          const rectHigh = this.rectXY.endXY.y - this.rectXY.startXY.y
          this.context.lineWidth = 1
          this.context.strokeStyle = this.currentColor
          this.context.strokeRect(this.rectXY.startXY.x, this.rectXY.startXY.y, rectWidth, rectHigh)
          // this.backgroundBox.setFlag = true

          const backgroundBoxData = this.context.getImageData(0, 0, 800, 600)
          this.middleAry.push(backgroundBoxData)
          this.coordinateAry.push(this.backgroundBox)
        }
        this.rectFlag++

        console.log(' --- backgroundBox: ', this.backgroundBox)
      }
    },

    /* 绘制前景框 */
    foreGroundBox(event) {
      if (this.foregroundBox.setFlag) {
        alert('前景框已设置')
      } else {
        /* 起点、终点设置 */
        if (this.rectFlag % 2 === 1) {
          this.rectXY.startXY.x = event.offsetX
          this.rectXY.startXY.y = event.offsetY
          this.foregroundBox.coordinate.push(this.rectXY.startXY)
          console.log(' --- startXY:', this.rectXY.startXY)
        } else {
          this.rectXY.endXY.x = event.offsetX
          this.rectXY.endXY.y = event.offsetY
          this.foregroundBox.coordinate.push(this.rectXY.endXY)
          console.log(' --- endXY:', this.rectXY.endXY)
        }

        /* 绘制矩形框 */
        if (this.rectFlag % 2 === 0) {
          const rectWidth = this.rectXY.endXY.x - this.rectXY.startXY.x
          const rectHigh = this.rectXY.endXY.y - this.rectXY.startXY.y
          this.context.lineWidth = 1
          this.context.strokeStyle = this.currentColor
          this.context.strokeRect(this.rectXY.startXY.x, this.rectXY.startXY.y, rectWidth, rectHigh)
          this.foregroundBox.setFlag = true

          const foregroundBoxData = this.context.getImageData(0, 0, 800, 600)
          this.middleAry.push(foregroundBoxData)
          this.coordinateAry.push(this.foregroundBox)
        }
        this.rectFlag++

        console.log(' --- foregroundBox: ', this.foregroundBox)
      }
    },

    /* 绘制打点 */
    recordXY(event) {
      const fixedXY = {
        x: 0,
        y: 0
      }
      fixedXY.x = event.offsetX
      fixedXY.y = event.offsetY
      this.dotXY.push(fixedXY)
      this.dotXYLength = this.dotXY.length
      // console.log(' --- recordXY: ', fixedXY)

      const c = document.getElementById('operatePic')
      const ctx = c.getContext('2d')
      ctx.lineWidth = 1
      ctx.strokeStyle = this.currentColor
      ctx.strokeRect(fixedXY.x, fixedXY.y, 1, 1)
    },

    goBack() {
      this.$router.go(-1)
    }
  }

}
</script>

<style rel="stylesheet/css" scoped>

/*#operatePic {
  width: 800px;
  height: 600px;
  border: 1px solid #E5E5E5;
  background: #EFEFEF;
}*/

</style>
