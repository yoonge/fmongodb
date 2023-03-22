import koaRouter from 'koa-router'
const router = koaRouter()

import db from '../module/db.js'

router.prefix('/users')

router.get('/', async (ctx, next) => {
  const data = await db.find('user')
  await ctx.render('users', {
    title: 'User List',
    data
  })
})

router.get('/insert', async (ctx, next) => {
  await ctx.render('insert', {
    title: 'User Add'
  })
})

router.post('/doInsert', async (ctx, next) => {
  const { nickname, username, sex, age, email } = ctx.request.body
  const result = await db.insert('user', {
    nickname, username, sex, age, email
  })
  if (result?.acknowledged) ctx.redirect('/users')
})

router.get('/update', async (ctx, next) => {
  const { _id } = ctx.query
  const data = await db.find('user', { '_id': db.getObjectId(_id) })
  console.log('data')
  console.log(data)
  await ctx.render('update', {
    title: 'User Update',
    user: data[0]
  })
})

router.post('/doUpdate', async (ctx, next) => {
  console.log('ctx.request.body')
  console.log(ctx.request.body)
  const { _id, nickname, username, sex, age, email } = ctx.request.body
  const result = await db.update(
    'user',
    { '_id': db.getObjectId(_id) },
    { $set: { nickname, username, sex, age, email } }
  )
  if (result?.acknowledged) ctx.redirect('/users')
})

router.get('/remove', async (ctx, next) => {
  const { _id } = ctx.query
  const result = await db.remove('user', { '_id': db.getObjectId(_id) })
  console.log(result)
  ctx.redirect('/users')
})

router.get('/bar', async (ctx, next) => {
  ctx.body = 'this is a users/bar response'
})

export default router
