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
        type="primary" 
        style="margin-left: 20px;"
        @click = "handleDownloadList()"
        round>
        数据导出
      </el-button>

    </div>

    <!-- 数据表格 -->
    <el-table 
      :data="list" 
      v-loading.body="listLoading" 
      element-loading-text="载入中..." 
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
            @click="dialogShowVisible = true">
            <!-- @click="handleEdit(scope.$index, scope.row)" -->
            详 细
          </el-button>
          <el-button
            size="mini"
            type="primary"
            @click="">
            分 析
          </el-button>
        </template>
      </el-table-column>

    </el-table>

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
import { getList } from '@/api/table'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      searchInput: '',
      list: null,
      listLoading: true,
      dialogFormVisible: false,
      dialogShowVisible: false,
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      },
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
      getList(this.listQuery).then(response => {
        this.list = response.data.items
        this.listLoading = false
        // console.log('--- PersonnelManagement List: ', this.list)
      })
    },

    handleSearch() {
      alert('Search:  ' + this.searchInput)
    },

    handleCreate() {
      this.$router.push('/PersonnelManagement/index/form')
    },

    handleDownloadList() {
      alert('已导出！')
    },

    handleEdit(index, row) {
      console.log('--- Edit: ', index, row)
      this.$router.push('/PersonnelManagement/index/form')
    },

    handleDelete(index, row) {
      console.log('--- Deleted: ', index, row, this.roles)
      if (this.roles.indexOf('superAdmin') >= 0) {
        alert('--- superAdmin权限 允许删除 ---')
      } else if (this.roles.indexOf('admin') >= 0) {
        alert('--- admin权限  可删除user ---')
      } else {
        alert('--- 无删除权限 ---')
      }
    },

    handleDownload() {
      alert('已导出！')
    }

  }
}
</script>
