module.exports = {
    'mp.weixin.qq.com': {
        name: 'wechat',
        rule: require('./rules/wechat'),
    },
    default: {
        name: 'default',
        rule: require('./rules/default'),
    }
}
