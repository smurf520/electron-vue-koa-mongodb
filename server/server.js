const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
// bodyparser:该中间件用于post请求的数据
const bodyParser = require('koa-bodyparser')
app.use(bodyParser())
const Koalogger = require('koa-logger')
app.use(Koalogger())
// 引入数据库操作方法
const UserController = require('./controller/user')
// checkToken作为中间件存在
const checkToken = require('./token/checkToken')
const websockify = require('koa-websocket')
const socket = websockify(app)
// 登录
const loginRouter = new Router()
loginRouter.post('/login', UserController.Login)
// 注册
const registerRouter = new Router()
registerRouter.post('/register', UserController.Reg)
// 获取所有用户
const userRouter = new Router()
userRouter.get('/user', checkToken, UserController.GetAllUsers)
// 删除某个用户
const delUserRouter = new Router()
delUserRouter.post('/delUser', checkToken, UserController.DelUser)
// 装载上面四个子路由
router.use('/api', loginRouter.routes(), loginRouter.allowedMethods())
router.use('/api', registerRouter.routes(), registerRouter.allowedMethods())
router.use('/api', userRouter.routes(), userRouter.allowedMethods())
router.use('/api', delUserRouter.routes(), delUserRouter.allowedMethods())
// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())
app.listen(8888, () => {
  console.log('The server is running at http://localhost:' + 8888)
})
let ctxs = []
socket.ws.use((ctx, next) => {
  /* 每打开一个连接就往 上线文数组中 添加一个上下文 */
  ctxs.push(ctx)
  ctx.websocket.on('message', (message) => {
    for (let i = 0; i < ctxs.length; i++) {
      if (ctx === ctxs[i]) continue
      ctxs[i].websocket.send(message)
    }
  })
  ctx.websocket.on('close', (message) => {
    /* 连接关闭时, 清理 上下文数组, 防止报错 */
    let index = ctxs.indexOf(ctx)
    ctxs.splice(index, 1)
  })
})
