import koaRouter from 'koa-router'
const router = koaRouter()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa2 & MongoDB!',
    content: 'Welcome to my user management system.'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

export default router
