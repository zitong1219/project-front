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

      <!-- 新增按钮 -->
      <el-button 
        type="primary" 
        style="margin-left: 30px;" 
        @click = "handleCreate()"
        round>
        新增人员
      </el-button>

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
      :data="currentList" 
      v-loading.body="listLoading" 
      element-loading-text="Loading......" 
      style="width: 100%; margin-top: 20px;" 
      border fit highlight-current-row stripe>

      <!-- <el-table-column 
        align="center" 
        label='ID' 
        fixed="left" 
        width="50">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column> -->

      <el-table-column
        align="center"
        type="index"
        :index="currentIndex"
        fixed="left"
        width="50">
      </el-table-column>

      <el-table-column 
        align="center" 
        label='userID' 
        fixed="left"
        width="100">
        <template slot-scope="scope">
          {{scope.row.userID}}
        </template>
      </el-table-column>

      <el-table-column 
        align="center" 
        label="name" 
        width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column 
        align="center" 
        label="gender" 
        width="100">
        <template slot-scope="scope">
          <span>{{scope.row.gender == "0" ? "Man" : "Woman"}}</span>
        </template>
      </el-table-column>

      <el-table-column 
        align="center" 
        label="phone">
        <template slot-scope="scope">
          <span>{{scope.row.phone}}</span>
        </template>
      </el-table-column>

      <el-table-column 
        align="center" 
        label="role">
        <template slot-scope="scope">
          <span>{{scope.row.role}}</span>
        </template>
      </el-table-column>

      <el-table-column 
        align="center"
        class-name="status-col" 
        label="isDelete" 
        width="150" >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.isDelete === 0 ? 'success' : 'danger'"
            close-transition>
            {{scope.row.isDelete === 0 ? "inservice " : "Dimission"}}
          </el-tag>
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
            @click="dialogFormVisible = true">
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

    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="listLength"
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

    <!-- 弹出框 编辑功能 -->
    <el-dialog title="编辑表单" :visible.sync="dialogFormVisible">

      <el-form 
        :model="ruleForm" 
        :rules="rules" 
        ref="ruleForm" 
        label-width="100px" 
        class="demo-ruleForm">

        <el-form-item label="输入框" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="选择器" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="日期与时间" required>
          <el-col :span="10">
           <el-form-item prop="date1">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
           </el-form-item>
          </el-col>

          <el-col class="line" :span="1">|</el-col>

          <el-col :span="10">
            <el-form-item prop="date2">
              <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="开关" prop="delivery">
          <el-switch v-model="ruleForm.delivery"></el-switch>
        </el-form-item>

        <el-form-item label="多选框" prop="type">
          <el-checkbox-group v-model="ruleForm.type">
            <el-checkbox label="A" name="type"></el-checkbox>
            <el-checkbox label="B" name="type"></el-checkbox>
            <el-checkbox label="C" name="type"></el-checkbox>
            <el-checkbox label="D" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="单选框" prop="resource">
          <el-radio-group v-model="ruleForm.resource">
            <el-radio label="Left"></el-radio>
            <el-radio label="Right"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="文本域" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">确定</el-button>
        <el-button type="warning" @click="resetForm('ruleForm')" >重置</el-button>
        <el-button type="" @click="dialogFormVisible = false">取消</el-button>
      </div>

    </el-dialog>

  </div>
</template>

<script>
import { getPeopleList } from '@/api/table'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      searchInput: '',
      list: [],
      listLength: 0,
      listLoading: false,
      currentIndex: 1,
      currentList: [],
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
    console.log('--- created fetchData')
    // console.log('--- PersonnelManagement this.$route: ', this.$route)
    // console.log('--- PersonnelManagement this.$router: ', this.$router)
  },

  mounted() {
    // this.handleCurrentChange(1)
    // console.log('--- mounted handleCurrentChange')
  },

  methods: {
    fetchData() {
      this.listLoading = true
      getPeopleList().then(response => {
        this.list = response.data.items
        this.listLength = this.list.length
        this.listLoading = false
        console.log('--- PersonnelManagement fetchData List: ', this.list.length)
        this.handleCurrentChange(1)
      })
    },

    handleSearch() {
      alert('Search:  ' + this.searchInput)
    },

    handleCreate() {
      this.$router.push('/PersonnelManagement/form')
    },

    handleDownloadList() {
      alert('已导出！')
    },

    handleEdit(index, row) {
      console.log('--- Edit: ', index, row)
      this.$router.push('/PersonnelManagement/form')
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
    },

    handleSizeChange(val) {
      // console.log('--- handleSizeChange 每页个数： ', val)
      this.pageSize = val
      /*
       * 默认当前页为1,在第一页改变pageSize,不会触发@current-change="handleCurrentChange"
       * 所以这里会对currentPage进行判断,若currentPage是1，则调用handleCurrentChange
       */
      if (this.currentPage === 1) {
        this.handleCurrentChange(1)
      } else {
        this.currentPage = 1
      }
    },

    handleCurrentChange(val) {
      console.log(`--- handleCurrentChange 当前页${val}`)
      console.log('--- pageSize: ', this.pageSize)
      this.currentList = []
      this.listLength = this.list.length

      const residueItemNum = this.list.length - (val - 1) * this.pageSize  // 剩余数据量
      let newItemIndex = (val - 1) * this.pageSize  // 当前数据列表的起始数据在原数据列表中的下标号
      this.currentIndex = newItemIndex + 1  // 当前数据列表的起始数据的序号

      /* 对当前数据列表赋值 */
      for (let i = 0; i < this.pageSize && i < residueItemNum; i++) {
        this.currentList[i] = this.list[newItemIndex]
        newItemIndex++
      }

      console.log('--- handleCurrentChange currentList: ', this.currentIndex, this.currentList)
    }
  }
}
</script>
