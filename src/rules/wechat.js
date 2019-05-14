const cheerio = require('cheerio')

module.exports = (html, url) => {
    const $ = cheerio.load(html)

    let title = '',
        icon = undefined,
        description = null;

    // title
    ['title', '#activity-name'].forEach(query => {
        title = $(query).text().trim()
        if (title instanceof String && title.length > 0) {
            return;
        }
    });
    // icon
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

    // description
    description = $('meta[name="description"]').attr('content')
    description = description ? description.trim() : null

    return {
        title,
        icon,
        description
    }
}
