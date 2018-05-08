<template>
  <div class="dashboard-container">

    <el-row >
      <!-- 样本信息 -->
        <el-col :span="6"></el-col>
        <el-col :span="12">
          <div>
            <el-form
              :model="deviceShapeForm"
              ref="deviceShapeComponent"
              label-width="100px" >

              <el-form-item label="装置名称" prop="sname">
                <el-input v-model="deviceShapeForm.sname" clearable></el-input>
              </el-form-item>

              <el-form-item label="装置编号" prop="sampleID">
                <el-input v-model="deviceShapeForm.sampleID" clearable></el-input>
              </el-form-item>

              <el-form-item label="处理人员编号" prop="user_id">
                <el-input v-model="deviceShapeForm.user_id" clearable></el-input>
              </el-form-item>

              <el-form-item label="录入时间" prop="inputDate">
                <el-date-picker 
                  v-model="deviceShapeForm.inputDate"
                  type="datetime"
                  placeholder="请输入录入时间"
                  style="width: 100%;">
                </el-date-picker>
              </el-form-item>

              <el-form-item label="厂家" prop="mrfs">
                <el-input v-model="deviceShapeForm.mrfs" clearable></el-input>
              </el-form-item>

              <el-form-item label="型号" prop="model">
                <el-input v-model="deviceShapeForm.model" clearable></el-input>
              </el-form-item>

              <el-form-item label="商标" prop="trademark">
                <el-input v-model="deviceShapeForm.trademark" clearable></el-input>
              </el-form-item>

              <el-form-item label="功能" prop="function">
                <el-input v-model="deviceShapeForm.function" clearable></el-input>
              </el-form-item>

              <el-form-item label="所属装置" prop="belongTo">
                <el-input v-model="deviceShapeForm.belongTo" clearable></el-input>
              </el-form-item>

              <el-form-item label="样本图片" prop="originalUrl">
                <el-upload 
                  class=""
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :before-upload="beforeAvatarUpload"
                  >
                  <img v-if="deviceShapeForm.originalUrl" :src="deviceShapeForm.originalUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon avatar-uploader"></i>
                </el-upload>
              </el-form-item>

              <el-form-item label="备注" prop="note">
                <el-input type="textarea" v-model="deviceShapeForm.note" clearable></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="warning" @click="resetForm('deviceShapeComponent')" plain>重置样本信息</el-button>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm('deviceShapeComponent')">全部提交</el-button>
                <el-button type="" @click="goBack()">取消</el-button>
              </el-form-item>

            </el-form>
          </div>
        </el-col>
        <el-col :span="6"></el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'addDeviceShape',

  computed: {
    ...mapGetters([
      'name'
    ])
  },

  data() {
    return {
      deviceShapeForm: {
        id: null,
        sname: '',
        sampleID: '',
        isCircuit: null,
        user_id: '',
        inputDate: null,
        mrfs: '',
        model: '',
        trademark: '',
        function: '',
        belongTo: '',
        originalUrl: null,
        originalResolution: null,
        nomUrl: null,
        nomResolution: null,
        note: ''
      }
    }
  },

  mounted() {
    this.deviceShapeForm.inputDate = new Date()
    this.deviceShapeForm.user_id = this.name
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      console.log(this.$refs)
      this.$refs[formName].resetFields()
    },
    goBack() {
      this.$router.go(-1)
    },

    beforeAvatarUpload(file) {
      console.log('--- beforeAvatarUpload', file)
      window.URL = window.URL || window.webkitURL
      this.deviceShapeForm.originalUrl = window.URL.createObjectURL(file)
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

.people {
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
    width: 400px;
    height: 300px;
    display: block;
  }
</style>
