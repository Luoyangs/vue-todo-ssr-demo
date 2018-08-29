const Router = require('koa-router')
const path = require('path')
const fs = require('fs')
const MemoryFS = require('memory-fs')
const axios = require('axios')
const webpack = require('webpack')
const vueServerRenderer = require('vue-server-renderer')

const serverRender = require('./server-render')
const serverConfig = require('../../build/webpack.config.server')
const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFS()
serverCompiler.outputFileSystem = mfs

let bundle
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.warn(warn))

  const bundlePath = path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json')
  bundle = JSON.parse(mfs.readFileSync(bundlePath), 'utf-8')
  console.log('bundle generated...')
})

const handleSSR = async (ctx) => {
  if (!bundle) {
    ctx.body = 'bundle compiling, please waiting a minute'
    return
  }

  const clientManifestRequest = await axios.get('http://127.0.0.1:8000/vue-ssr-client-manifest.json')
  const clientManifest = clientManifestRequest.data

  const template = fs.readFileSync(path.join(__dirname, '../server-template.ejs'), 'utf-8')

  const renderer = vueServerRenderer.createBundleRenderer(bundle, {
    inject: false,
    clientManifest
  })

  await serverRender(ctx, renderer, template)
}

const router = new Router()
router.get('*', handleSSR)

module.exports = router
