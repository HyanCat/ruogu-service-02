const Koa = require('koa')
const app = new Koa()
const Catcher = require('./catcher')

app.use(async ctx => {
    const url = ctx.query.webpage
    if (url) {
        await new Catcher().catchIcon(url)
            .then(icon => {
                ctx.body = {
                    icon
                }
            }).catch(e => {
                ctx.body = {
                    error: '获取失败'
                }
            })
    } else {
        ctx.body = {
            error: '参数错误'
        }
    }
})

app.listen(3000)
