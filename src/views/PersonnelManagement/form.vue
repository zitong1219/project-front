<template>
  <div class="dashboard-container dashboard-text">

    <el-row :gutter="60">

      <el-col :span="12">

        <div style="">

          <el-form 
            :model="peopleInfoForm" 
            :rules="rules" 
            ref="peopleInfoComponent" 
            label-width="100px" 
            class="">

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
                  <el-option v-if = "superPermission" label="Admin" value="1"></el-option>
                  <el-option label="User" value="2"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="备注" prop="note">
                <el-input type="textarea" v-model="peopleInfoForm.note"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm('peopleInfoComponent')">确定</el-button>
                <el-button type="warning" @click="resetForm('peopleInfoComponent')" plain>重置</el-button>
                <el-button type="" @click="goBack()">取消</el-button>
              </el-form-item>
          </el-form>

        </div>

      </el-col>

      <el-col :span="12">

        <div>

          <div class="dashboard-text">
            照片上传
          </div>

          <el-upload 
            class=""
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon avatar-uploader"></i>
          </el-upload>

        </div>

      </el-col>

    </el-row>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'addPeople',

  computed: {
    ...mapGetters([
      'roles'
    ])
  },

  data() {
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.peopleInfoForm.checkPassword !== '') {
          // console.log('--- validatePassword this.$refs: ', this.$refs)
          // console.log('--- validatePassword this.peopleInfoForm: ', this.peopleInfoForm)
          this.$refs.peopleInfoComponent.validateField('checkPassword')
        }
        callback(console.log('--- validatePassword is OK'))
      }
    }

    const validateCheckPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.peopleInfoForm.password) {
        callback(new Error('两次输入不一致'))
      } else {
        callback(console.log('--- validateCheckPassword is OK'))
      }
    }

    const validateRole = (rule, value, callback) => {
      if (value === '1') {
        if (this.roles.indexOf('superAdmin') === -1) {
          callback(new Error('无权限设置此用户为管理员'))
        } else {
          callback(console.log('--- validateRole is OK - 注意：此用户将被设置为管理员'))
        }
      } else {
        callback(console.log('--- validateRole is OK'))
      }
    }

    return {
      imageUrl: '',
      superPermission: false,
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
          { validator: validatePassword, required: true, trigger: 'blur' }
        ],
        checkPassword: [
          { validator: validateCheckPassword, required: true, trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        role: [
          { validator: validateRole, required: true, trigger: 'blur' }
        ]
      }
    }
  },

  mounted() {
    if (this.roles.indexOf('superAdmin') >= 0) {
      this.superPermission = true
    }
  },

  methods: {
    handleAvatarSuccess(res, file) {

    },
    beforeAvatarUpload(file) {

    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        console.log('--- peopleInfoForm: ', this.peopleInfoForm)
        if (valid) {
          console.log('submit!')
        } else {
          console.log('error submit!')
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
    font-size: 18px;
    line-height: 20px;
  }
}

  .avatar-uploader {
    border: 2px dashed #e9e9e9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-top: 10px;
  }
  .avatar-uploader:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 200px;
    height: 200px;
    line-height: 200px;
    text-align: center;
  }

  .avatar {
    width: 200px;
    height: 200px;
    display: block;
  }

</style>
