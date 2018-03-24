<template>
  <div class="dashboard-container">
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

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
        <el-button type="warning" @click="resetForm('ruleForm')" >重置</el-button>
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
        }
      };
  },

  methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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
