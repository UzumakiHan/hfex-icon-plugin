# hfex-icon 的plugin配置
## Install
```
npm i hfex-icon-plugin -D
```
## 使用

## v1.0.2版本
`vue.config.js`


<!-- ```diff
{
  "devDependencies": {
-   "vite-plugin-icons": "*",
+   "unplugin-icons": "^0.7.0",
  }
}
``` -->
```js
const HfexIconPlugin = require('hfex-icon-plugin')
module.exports = {
    configureWebpack:{
        plugins:[
            ...HfexIconPlugin.plugins
        ]
    }
}
```


## v1.1.0版本
在v1.1.0版本中，重新使用了unplugin对插件进行了封装，支持了在vite项目中使用，同时优化了webpack版本

`package.json`

```diff
{
  "devDependencies": {
-   "hfex-icon-plugin": "^1.0.2",
+   "hfex-icon-plugin": "^1.1.0",
  }
}
```
vue中使用

`vue.config.js`

```js
const HfexIconPlugin = require('hfex-icon-plugin')
module.exports = {
    configureWebpack:{
        plugins:[
            HfexIconPlugin()
        ]
    }
}
```

vue中使用

<details>
<summary>Vue 2 & 3</summary><br>

Use with [`hfex-icon`](https://github.com/UzumakiHan/hfex-icon-plus)

For example in Vue:

```js
// vue.config.js
const HfexIconPlugin = require('hfex-icon-plugin')
module.exports = {
    configureWebpack:{
        plugins:[
            HfexIconPlugin()
        ]
    }
}
```

</details>


vite中使用

<details>
<summary>vite</summary><br>

Use with [`hfex-icon`](https://github.com/UzumakiHan/hfex-icon-plus)

For example in Vite:

```js
// vite.config.ts
import HfexIconPlugin from 'hfex-icon-plugin';
export default defineConfig({
    plugins:[
        HfexIconPlugin()
    ]
})
```

</details>