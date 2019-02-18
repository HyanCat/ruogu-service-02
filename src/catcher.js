const cheerio = require('cheerio')
const axios = require('axios')

function parseHtml(html, url) {
    const $ = cheerio.load(html)
    const title = $('title').text().trim()
    let icon = undefined
    if (icon == undefined) {
        let meta = $('meta[name="og:image"]')
        icon = meta.attr('content')
    }
    if (icon == undefined) {
        let link = $('link[rel="apple-touch-icon-precomposed"]')
        icon = link.attr('href')
    }
    if (icon == undefined) {
        let link = $('link[rel="shortcut icon"]')
        icon = link.attr('href')
    }
    if (typeof (url) == 'string') {
        url = new URL(url)
    }
    if (icon) {
        if (icon.startsWith('//')) {
            icon = `${url.protocol}${icon}`
        } else if (icon.startsWith('/')) {
            icon = `${url.protocol}/${icon}`
        } else if (!icon.startsWith('http')) {
            icon = `${url.protocol}//${icon}`
        }
    }
    let description = $('meta[name="description"]').attr('content')
    description = description ? description.trim() : null
    return {
        icon,
        title,
        description,
    }
}

class Catcher {
    async catchIcon(url) {
        return new Promise((resolve, reject) => {
            axios.get(url).then(r => {
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
