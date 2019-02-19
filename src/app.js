const Koa = require('koa')
const app = new Koa()
const {
    RateLimiterMemory
} = require('rate-limiter-flexible')
const Catcher = require('./catcher')

const rateLimiter = new RateLimiterMemory({
    points: 100,
    duration: 60,
});

app.use(async (ctx, next) => {
    try {
        await rateLimiter.consume(ctx.ip)
        await next()
    } catch (e) {
        ctx.status = 429
        ctx.body = {
            error: 'Too many requests'
        }
    }
})

app.use(async ctx => {
    const url = ctx.query.webpage
    if (url) {
        await new Catcher().catchIcon(url)
            .then(result => {
                ctx.body = result
            }).catch(e => {
                ctx.body = {
                    error: e.message
                }
            })
    } else {
        ctx.body = {
            error: '参数错误'
        }
    }
})

app.listen(3000)
