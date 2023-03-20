const router = require('koa-router')()
const db = require('../module/db')

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

module.exports = router
