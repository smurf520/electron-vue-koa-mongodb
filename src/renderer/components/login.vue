<template>
  <div id="login">
    <el-input
      placeholder="请输入内容"
      v-model="loginValue"
      clearable
    >
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      loginValue: ''
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
</style>

