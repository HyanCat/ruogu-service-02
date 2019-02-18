const Koa = require('koa')
const app = new Koa()
const Catcher = require('./catcher')

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
