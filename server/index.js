const Koa = require('koa')
const koaSend = require('koa-send')
const path = require('path')

const pageRouter = require('./router/dev-ssr')

const isDev = process.env.NODE_ENV === 'development'
const app = new Koa()

app.use(async (ctx, next) => {
  try {
    console.log(`[koa log:]request path is: ${ctx.path}`)
    await next()
  } catch (error) {
    console.log(error)
    ctx.status = 500
    if (isDev) {
      ctx.body = error.message
    } else {
      ctx.body = 'error in request, please try later'
    }
  }
})

app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    await koaSend(ctx, './favicon.ico', {root: path.join(__dirname, '../')})
  } else {
    await next()
  }
})

app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const PORT = process.env.PORT || 3333
const HOST = process.env.HOST || '0.0.0.0'

app.listen(PORT, HOST, () => {
  console.log(`server is running at ${HOST}:${PORT}`)
})
