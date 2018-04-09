<template>
  <div class="dashboard-container">
    <el-form 
      :model="peopleInfoForm" 
      :rules="rules" 
      ref="peopleInfoForm" 
      label-width="100px" 
      class="demo-peopleInfoForm">

      <el-form-item label="人员编号" prop="userId">
        <el-input v-model="peopleInfoForm.userId"></el-input>
      </el-form-item>

      <el-form-item label="人员姓名" prop="name">
        <el-input v-model="peopleInfoForm.name"></el-input>
      </el-form-item>

      <el-form-item label="选择器" prop="isManager">
        <el-select v-model="peopleInfoForm.isManager" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="单选框" prop="gender">
        <el-radio-group v-model="peopleInfoForm.gender">
          <el-radio label="Left"></el-radio>
          <el-radio label="Right"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="文本域" prop="desc">
        <el-input type="textarea" v-model="peopleInfoForm.desc"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('peopleInfoForm')">确定</el-button>
        <el-button type="warning" @click="resetForm('peopleInfoForm')" >重置</el-button>
        <el-button type="" @click="goBack()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'test',

  computed: {
    ...mapGetters([
      'name'
    ])
  },

  data() {
    return {
      peopleInfoForm: {
        userId: '',
        name: '',
        password: '',
        isManager: '',
        gender: '',
        phone: '',
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
      }
    }
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit! ')
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
