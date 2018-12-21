<!--
    开发人:Victoria
-->
<template>
  <div class="chat">
    <el-input
      placeholder="请输入用户名"
      v-model="msg"
      clearable
    >
    </el-input>
    <div
      class="submit"
      @click="send"
    >发送</div>
    <div class="close">关闭</div>
    <div class="msg">{{chatMsg}}</div>
  </div>
</template>
<script>

export default {
  name: 'chat',
  data () {
    return {
      msg: '',
      websock: {},
      chatMsg: ''
    }
  },
  created () {
    // 实例化websoscket websocket有两种协议ws(不加密)和wss(加密)
    // let webSocket = new WebSocket('ws://localhost:8888')
    // console.log('==============webSocket', webSocket)
    // webSocket.onopen = function (evt) {
    //   // 一旦连接成功，就发送第一条数据
    //   webSocket.send('第一条数据')
    // }
    // webSocket.onmessage = function (evt) {
    //   // 这是服务端返回的数据
    //   console.log('服务端说' + evt.data)
    // }
    this.initWebSocket()
  },
  methods: {
    initWebSocket () {
      const wsuri = 'ws://localhost:8888'
      this.websock = new WebSocket(wsuri) // 这里面的this都指向vue
      this.websock.onopen = this.websocketopen
      this.websock.onmessage = this.websocketonmessage
      this.websock.onclose = this.websocketclose
      this.websock.onerror = this.websocketerror
    },
    send () {
      this.websock.send(this.msg)
    },
    websocketopen () { // 打开
      console.log('WebSocket连接成功')
    },
    websocketonmessage (e) { // 数据接收
      this.chatMsg = e.data
    },
    websocketclose () { // 关闭
      console.log('WebSocket关闭')
    },
    websocketerror () { // 失败
      console.log('WebSocket连接失败')
    }
  }
}
</script>
<style lang="less" scoped>
</style>
