<template>
  <div class="app-container">

    <div style="width: 100%;">

      <!-- 搜索输入框 -->
      <el-input 
        placeholder="请输入搜索内容" 
        v-model="searchInput" 
        style="width: 500px;"
        class="input-with-select">
        <el-button 
          slot="append" 
          icon="el-icon-search"
          @click = "handleSearch()" >
        </el-button>
      </el-input>

      <!-- 下载按钮 -->
      <el-button 
        type="" 
        style="margin-left: 20px;"
        @click = "handleDownloadList()"
        round>
        数据导出
      </el-button>

    </div>

    <!-- 数据表格 -->
    <el-table 
      :data="currentList" 
      v-loading.body="listLoading" 
      element-loading-text="载入中..." 
      style="width: 100%; margin-top: 20px;" 
      border fit highlight-current-row stripe>

      <el-table-column
        align="center"
        type="index"
        :index="startIndex"
        fixed="left"
        width="50">
      </el-table-column>

      <el-table-column 
        align="center" 
        label="sampleID" 
        fixed="left"
        width="100">
        <template slot-scope="scope">
          <span>{{scope.row.sampleID}}</span>
        </template>
      </el-table-column>

      <el-table-column 
        align="center" 
        label="sname" 
        width="150">
        <template slot-scope="scope">
          <span>{{scope.row.sname}}</span>
        </template>
      </el-table-column>

      <el-table-column 
        align="center" 
        label="inputDate" 
        width="150">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.inputDate}}</span>
        </template>
      </el-table-column>

      <el-table-column 
        align="center" 
        label="sampleState" 
        width="150">
        <template slot-scope="scope">
          <span>{{scope.row.sampleState}}</span>
        </template>
      </el-table-column>

      <el-table-column 
        align="center" 
        label="sampleOrigin" 
        width="150">
        <template slot-scope="scope">
          <span>{{scope.row.sampleOrigin}}</span>
        </template>
      </el-table-column>

      <el-table-column 
        align="center" 
        label="sampleType" 
        width="150">
        <template slot-scope="scope">
          <span>{{scope.row.sampleType}}</span>
        </template>
      </el-table-column>

      <el-table-column 
        align="center" 
        label="sampleMake" 
        width="150">
        <template slot-scope="scope">
          <span>{{scope.row.sampleMake}}</span>
        </template>
      </el-table-column>

      <el-table-column 
        align="center" 
        label="sampleDraw" 
        width="150">
        <template slot-scope="scope">
          <span>{{scope.row.sampleDraw}}</span>
        </template>
      </el-table-column>

      <el-table-column 
        align="center" 
        label="sampleAnalyse" 
        width="150">
        <template slot-scope="scope">
          <span>{{scope.row.sampleAnalyse}}</span>
        </template>
      </el-table-column>

      <el-table-column 
        align="center" 
        label="analyseCondition" 
        width="150">
        <template slot-scope="scope">
          <span>{{scope.row.analyseCondition}}</span>
        </template>
      </el-table-column>

      <el-table-column 
        align="center"
        fixed="right"
        label="操作"
        width="250">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="dialogShowVisible = true">
            <!-- @click="handleEdit(scope.$index, scope.row)" -->
            最新分析结果
          </el-button>

          <el-button
            size="mini"
            type="primary"
            @click="analysis(scope.$index, scope.row)">
            分析处理
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[10, 20, 50]"
        :page-size="pageSize"
        :total="listLength"
        layout="total, sizes, prev, pager, next, jumper"
        background>
      </el-pagination>
    </div>

    <!-- 弹出框 详细展示 -->
    <el-dialog title="详细展示" :visible.sync="dialogShowVisible">

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleDownload()">导出</el-button>
        <el-button type="" @click="dialogShowVisible = false">返回</el-button>
      </div>

    </el-dialog>

  </div>
</template>

<script>
import { getDataList } from '@/api/table'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      searchInput: '',
      list: [],
      listLength: 0,
      listLoading: false,
      startIndex: 1,
      currentList: [],
      currentPage: 1,
      pageSize: 10,
      dialogFormVisible: false,
      dialogShowVisible: false,
      formLabelWidth: '120px'
    }
  },

  computed: {
    ...mapGetters([
      'roles'
    ])
  },

  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },

  created() {
    this.fetchData()
    // console.log('--- PersonnelManagement this.$route: ', this.$route)
    // console.log('--- PersonnelManagement this.$router: ', this.$router)
  },

  methods: {
    fetchData() {
      this.listLoading = true
      getDataList().then(response => {
        this.list = response.data.items
        this.listLoading = false
        this.handleCurrentChange(1)
        // console.log('--- PersonnelManagement List: ', this.list)
      })
    },

    handleSearch() {
      alert('Search: ' + this.searchInput)
    },

    handleDownloadList() {
      alert('已导出！')
    },

    analysis(index, row) {
      console.log('--- analysis: ', index, row, this.roles)
      this.$router.push('/AnalysisAndJudgment/explosiveAnalysis')
    },

    handleDownload() {
      alert('已导出！')
    },

    /* 分页 */
    handleSizeChange(newPageSize) {
      this.pageSize = newPageSize
      if (this.currentPage === 1) {
        this.handleCurrentChange(1)
      } else {
        this.currentPage = 1
      }
    },

    handleCurrentChange(currentPageNum) {
      this.currentList = []
      this.listLength = this.list.length

      const residueItemNum = this.listLength - (currentPageNum - 1) * this.pageSize
      let newItemIndex = (currentPageNum - 1) * this.pageSize
      this.startIndex = newItemIndex + 1
      for (let i = 0; i < this.pageSize && i < residueItemNum; i++) {
        this.currentList[i] = this.list[newItemIndex]
        newItemIndex++
      }
    }

  }
}
</script>
