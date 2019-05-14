const axios = require('axios')
const config = require('./config')

function parseHtml(html, url) {
    if (typeof (url) == 'string') {
        url = new URL(url)
    }
    let host = config[url.host]
    if (!host) {
        host = config.default
    }
    let rule = host.rule
    return rule(html, url)
}

axios.defaults.headers.common['User-Agent'] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36';

class Catcher {
    async catchIcon(url) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                header: {

                }
            }).then(r => {
                const html = r.data
                const result = parseHtml(html, url)
                resolve(result)
            }).catch(e => {
                reject(e)
            })
            return
        })
    }
}

module.exports = Catcher
