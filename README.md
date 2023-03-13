# hfex-icon 的plugin配置
## Install
```
npm i hfex-icon-plugin -D
```
## 使用
```
//vue.config.js中
const HfexIconPlugin = require('hfex-icon-plugin')
module.exports = {
    configureWebpack:{
        plugins:[
            ...HfexIconPlugin.plugins
        ]
    }
}
```