import Koa from 'koa'
const app = new Koa()

import path, { dirname } from 'node:path'
import { fileURLToPath  } from 'node:url'
import render from 'koa-art-template'
import json from 'koa-json'
import onerror from 'koa-onerror'
import bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
import koaStatic from 'koa-static'

import index from './routes/index.js'
import users from './routes/users.js'

const _dirName = dirname(fileURLToPath(import.meta.url))
console.log(_dirName)

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koaStatic(_dirName + '/public'))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

render(app, {
  root: path.join(_dirName, 'views'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

export default app
