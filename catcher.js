const jsdom = require('jsdom')
const {
    JSDOM
} = jsdom

class NoneError extends Error {

}

class Catcher {
    async catchIcon(url) {
        return new Promise((resolve, reject) => {
            JSDOM.fromURL(url, {
                referrer: url,
                userAgent: 'Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Mobile Safari/537.36'
            }).then(dom => {
                let icon = null
                const document = dom.window.document
                const metas = document.getElementsByTagName('meta')
                for (let i = 0; i < metas.length; i++) {
                    const element = metas[i];
                    const name = element.name
                    const content = element.content
                    if (name == 'og:image') {
                        icon = content
                        break
                    }
                }
                if (icon == null) {
                    const links = document.getElementsByTagName('link')
                    for (let i = 0; i < links.length; i++) {
                        const element = links[i];
                        const rel = element.rel
                        if (rel == 'apple-touch-icon-precomposed') {
                            icon = element.href
                            break
                        }
                    }
                }
                if (icon == null) {
                    const links = document.getElementsByTagName('link')
                    for (let i = 0; i < links.length; i++) {
                        const element = links[i];
                        const rel = element.rel
                        if (rel == 'icon' || rel == 'shortcut icon') {
                            icon = element.href
                            break
                        }
                    }
                }
                if (icon && icon.length) {
                    resolve(icon)
                } else {
                    reject(NoneError())
                }
            }).catch(e => {
                reject(e)
            })
        })
    }
}

module.exports = Catcher
