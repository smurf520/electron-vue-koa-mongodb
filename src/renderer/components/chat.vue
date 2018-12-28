<!--
    开发人:Victoria
-->
<template>
  <div class="chat">
    <div class="topBox">
      <div class="chatBox">
        <ul>
          <li
            v-for="(item, index) in chatList"
            :key="index"
          >
            {{item}}
          </li>
        </ul>
      </div>
      <div class="userBox"></div>
    </div>
    <div class="bottomBox">
      <div class="word">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="msg"
        >
        </el-input>
      </div>
      <div
        class="submitBtn"
        @click="send"
      >提交</div>
    </div>
    <div
      class="aa"
      @click="aa"
    >新建窗口</div>
    <!-- <el-dialog
      title="请输入昵称"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <span>
        <el-input
          type="text"
          v-model="name"
        >
        </el-input>
      </span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="confirmName">确认</el-button>
        <el-button @click="centerDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>
<script>
import electron from 'electron'

export default {
  name: 'chat',
  data () {
    return {
      name: '',
      centerDialogVisible: true,
      msg: '',
      websock: {},
      chatList: []
    }
  },
  created () {
    const that = this
    // 实例化websoscket websocket有两种协议ws(不加密)和wss(加密)
    let webSocket = new WebSocket('ws://localhost:8888') // server访问的ip,后端地址
    console.log('==============webSocket', webSocket)
    webSocket.onopen = function (evt) {
      console.log('=========evt', evt)
      // 一旦连接成功，就发送第一条数据
      webSocket.send(that.name + '连接上了~~~')
    }
    webSocket.onmessage = function (evt) {
      // 这是服务端返回的数据
      that.chatList.push(evt.data)
      console.log('服务端说' + evt.data)
    }
    this.initWebSocket()
  },
  methods: {
    // confirmName () {
    //   if (this.name !== '') {
    //     this.centerDialogVisible = false
    //   }
    // },
    aa () {
      let BrowserWindow = electron.remote.BrowserWindow
      let bilibiliWindow = null
      bilibiliWindow = new BrowserWindow({ width: 1000, height: 800 })
      bilibiliWindow.loadURL('http://localhost:8887/')
    },
    initWebSocket () {
      const wsuri = 'ws://localhost:8888'
      this.websock = new WebSocket(wsuri) // 这里面的this都指向vue
      // this.websock.onopen = this.websocketopen
      // this.websock.onmessage = this.websocketonmessage
      // this.websock.onclose = this.websocketclose
      // this.websock.onerror = this.websocketerror
    },
    send () {
      this.websock.send(this.msg)
    }
    // websocketopen () { // 打开
    //   console.log('WebSocket连接成功')
    // },
    // websocketonmessage (e) { // 数据接收
    //   this.chatMsg = e.data
    // },
    // websocketclose () { // 关闭
    //   console.log('WebSocket关闭')
    // },
    // websocketerror () { // 失败
    //   console.log('WebSocket连接失败')
    // }
  }
}
</script>
<style lang="less" scoped>
.chat {
  .topBox {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 500px;
    .chatBox {
      flex: 4;
      border: 1px solid #409eff;
      margin: 10px;
    }
    .userBox {
      flex: 1;
      border: 1px solid #409eff;
      margin: 10px;
    }
  }
  .bottomBox {
    display: flex;
    flex-direction: row;
    justify-content: center;
    .word {
      flex: 4;
      margin: 10px;
    }
    .submitBtn {
      cursor: pointer;
      flex: 1;
      margin: 10px;
      height: 50px;
      border: 1px solid #409eff;
      text-align: center;
      line-height: 50px;
      &:hover {
        background: #409eff;
        color: #fff;
      }
    }
  }
}
</style>
