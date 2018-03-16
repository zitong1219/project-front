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
          icon="el-icon-search">
        </el-button>
      </el-input>

      <!-- 新增按钮 -->
      <el-button 
        type="primary" 
        style="margin-left: 30px;"
        round>
        新增人员
      </el-button>

      <!-- 下载按钮 -->
      <el-button 
        type="primary" 
        style="margin-left: 20px;"
        round>
        数据导出
      </el-button>

    </div>

    <!-- 数据表格 -->
    <el-table 
      :data="list" 
      v-loading.body="listLoading" 
      element-loading-text="Loading" 
      style="width: 100%; margin-top: 20px;" 
      border fit highlight-current-row stripe>

      <el-table-column 
        align="center" 
        label='ID' 
        fixed="left" 
        width="100">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>

      <el-table-column 
        align="center" 
        prop="created_at" 
        label="Display_time" 
        width="250">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.display_time}}</span>
        </template>
      </el-table-column>

      <el-table-column 
        align="center" 
        label="Author" 
        width="150">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>

      <el-table-column 
        align="center" 
        label="Infomation">
        <template slot-scope="scope">
          <span>{{scope.row.title}}</span>
        </template>
      </el-table-column>

      <el-table-column 
        align="center"
        class-name="status-col" 
        label="Status" 
        width="150" >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column 
        align="center"
        fixed="right"
        label="操作"
        width="300">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">
            详 细
          </el-button>
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">
            编 辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">
            删除
          </el-button>
      </template>
    </el-table-column>

    </el-table>

  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  data() {
    return {
      searchInput: '',
      list: null,
      listLoading: true
    }
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
    console.log('Router: ', this.$route)
  },

  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.items
        this.listLoading = false
        console.log('List: ', this.list)
      })
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    }
  }
}
</script>
