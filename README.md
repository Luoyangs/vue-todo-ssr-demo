create a new repository on the command line
```
echo "# vue-todo-ssr-demo" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/Luoyangs/vue-todo-ssr-demo.git
git push -u origin master
```

### 1.1 webpack-dashboard
https://www.jianshu.com/p/46bdacb4c7fd?utm_source=oschina-app

### 1.2 配置eslint
```
npm i eslint eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-standard eslint-plugin-html -D

```

在项目根目录下添加.eslintrc文件,并配置
```
{
  "extends": "standard",
  "plugins": [
    "html"
  ]
}
```

在package.json 里面配置
```json
...

"lint": "eslint --ext .js --ext .jsx --ext .vue client/",
// 自动帮我们修复eslint错误
"lint-fix": "eslint --fix --ext .js --ext .jsx --ext .vue client/"
```

自动开启eslint实时检测
```
npm i eslint-loader babel-eslint -D

```

配置.eslintrc
```
...
"parser": "babel-eslint"
```

添加rules
```js
{
  test: /\.(js|vue|jsx)$/,
  enforce: 'pre',
  loader: 'eslint-loader',
  exclude: /node_modules/
}
```

### 1.3 git hook安装
```
npm i husky -D
```
> 注意：在使用husky前必须先git初始化

然后在package.json里面配置。husky的hook默认是precommit
```json
"precommit": ”npm run lint-fix"  // 自动帮你修复

"precommit": "npm run lint"  // 只检测不修复，需要手动修复才可以
```
