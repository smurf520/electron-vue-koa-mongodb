<template>
  <div class="register">
    <div class="registBox">
      <div class="box">
        <div class="label">用户名:</div>
        <div class="value">
          <el-input
            placeholder="请输入用户名"
            v-model="nameValue"
            clearable
          >
          </el-input>
        </div>
      </div>
      <div class="box">
        <div class="label">密码:</div>
        <div class="value">
          <el-input
            placeholder="请输入密码是"
            v-model="pwValue"
            type="password"
            clearable
          >
          </el-input>
        </div>
      </div>
      <div class="box">
        <div class="label">确认密码:</div>
        <div class="value">
          <el-input
            placeholder="请输入密码"
            v-model="rePwValue"
            type="password"
            clearable
          >
          </el-input>
        </div>
      </div>
      <div class="box">
        <div
          class="btn"
          @click="refresh"
        >重置</div>
        <div
          class="btn"
          @click="register"
        >注册</div>
      </div>
    </div>
  </div>
</template>
<script>
import axiosApi from './../axiosApi.js'

export default {
  name: 'register',
  data () {
    return {
      nameValue: '',
      pwValue: '',
      rePwValue: ''
    }
  },
  methods: {
    refresh () {
      this.nameValue = ''
      this.pwValue = ''
      this.rePwValue = ''
    },
    register () {
      this.$http.post(axiosApi.REGISTER, {
        name: this.nameValue,
        pass: this.pwValue,
        checkPass: this.rePwValue
      }).then(({ data }) => {
        console.log('=====data', data)
      }).catch((err) => {
        console.log('=====err', err)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.register {
  display: flex;
  justify-content: center;
  .registBox {
    width: 500px;
    height: 300px;
    margin-top: 300px;
    .box {
      display: flex;
      flex-direction: row;
      margin-top: 20px;
      .label {
        height: 40px;
        line-height: 40px;
        width: 100px;
        text-indent: 20px;
      }
      .value {
        height: 40px;
        line-height: 40px;
        flex: 1;
      }
      .btn {
        width: 100px;
        height: 40px;
        border: 1px solid #dcdfe6;
        line-height: 40px;
        color: #606266;
        text-align: center;
        margin-left: 100px;
        margin-top: 20px;
        cursor: pointer;
        border-radius: 4px;
        &:hover {
          color: #409eff;
          border: 1px solid #409eff;
        }
      }
    }
  }
}
</style>


