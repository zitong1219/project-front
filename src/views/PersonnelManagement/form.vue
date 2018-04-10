<template>
  <div class="dashboard-container">
    <el-form 
      :model="peopleInfoForm" 
      :rules="rules" 
      ref="peopleInfoComponent" 
      label-width="100px" 
      class="demo-peopleInfoForm">

      <el-form-item label="人员编号" prop="userID">
        <el-input v-model="peopleInfoForm.userID" clearable></el-input>
      </el-form-item>

      <el-form-item label="人员姓名" prop="name">
        <el-input v-model="peopleInfoForm.name" clearable></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input  
          v-model="peopleInfoForm.password" 
          type="password" 
          auto-complete="off" 
          clearable>
        </el-input>
      </el-form-item>

      <el-form-item label="确认密码" prop="checkPassword">
        <el-input 
          v-model="peopleInfoForm.checkPassword" 
          type="password" 
          auto-complete="off" 
          clearable>
        </el-input>
      </el-form-item>

      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="peopleInfoForm.gender">
          <el-radio label="1">Man</el-radio>
          <el-radio label="2">Woman</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="电话" prop="phone">
        <el-input v-model="peopleInfoForm.phone"></el-input>
      </el-form-item>

      <el-form-item label="权限" prop="role">
        <el-select v-model="peopleInfoForm.role" placeholder="请选择权限">
          <el-option label="Admin" value="1"></el-option>
          <el-option label="User" value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="备注" prop="note">
        <el-input type="textarea" v-model="peopleInfoForm.note"></el-input>
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
    let validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      }
      else {
        if ( this.peopleInfoForm.checkPassword !== '' ) {
          console.log('--- validatePassword this.$refs: ', this.$refs)
          // console.log('--- validatePassword this.peopleInfoForm: ', this.peopleInfoForm)
          this.$refs.peopleInfoComponent.validateField('checkPassword')
        }
        callback()
      }
    }

    let validateCheckPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      }
      else if (value !== this.peopleInfoForm.password) {
        callback(new Error('两次输入不一致'))
      }
      else {
        callback()
      }
    }

    return {
      peopleInfoForm: {
        userID: '',
        name: '',
        password: '',
        checkPassword: '',
        gender: '',
        phone: '',
        role: '2',
        note: ''
      },
      rules: {
        userID: [
          { required: true, message: '请输入人员编号', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入人员姓名', trigger: 'blur' },
          { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        checkPassword: [
          { validator: validateCheckPassword, trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ]
      }
    }
  },

  methods: {
    submitForm(formName) {
      // console.log(typeof(this.peopleInfoForm.gender)) 
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
