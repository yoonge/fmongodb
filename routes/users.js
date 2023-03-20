import koaRouter from 'koa-router'
const router = koaRouter()

import db from '../module/db.js'

router.prefix('/users')

router.get('/', async (ctx, next) => {
  const data = await db.find('user')
  await ctx.render('users', {
    title: 'User List',
    data: data
  })
})

router.get('/add', async (ctx, next) => {
  const result = await db.insert('user', {
    'nickname': '钱二',
    'username': 'er',
    'sex': '女',
    'age': '22',
    'status': '0'
  })
  ctx.redirect('/users')
})

router.get('/bar', async (ctx, next) => {
  ctx.body = 'this is a users/bar response'
})

export default router
