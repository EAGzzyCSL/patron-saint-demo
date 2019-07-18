# 使用VirtualModuleWebpackPlugin减少mpvue小程序开发下套路代码copy

## 背景介绍

> copy代码是一个快速提高代码数量和降低代码质量的精妙操作，长期以来处于各路鄙视链的底端。但有时面对一些套路代码又别无他法，每当看到项目中那些不得已而为之的套路代码，我心中都会泛起卿本佳人奈何做贼的伤痛。

![丢出去](images/out.png)

因为后面提到的套路代码主要和mpvue有关，所以这里先介绍一下和mpvue相关背景。

微信小程序自诞生之日起，就有无数仁人志士前仆后继想要为它带来现代化的开发体验，[mpvue](http://mpvue.com/mpvue/)是其中一个兼容vue语法的小程序开发框架，在mpvue下，一个页面由以下文件构成：

```text
PageX/
├── PageX.vue // 页面对应的vue组件
└── main.js // 构建的entry入口
```

mpvue把每个小程序页面作为一个webpack的entry构建，所以每个页面下都需要由一个main.js作为entry入口，其内容大致如下

```javascript
import Vue from 'vue'
import App from './PageX.vue'
const app = new Vue(App)
app.$mount()
```

很显然，这是一个充斥着套路代码的js文件，每次新建页面都需要copy一个这样的套路文件不仅有些繁琐，更让人担心日后如果main.js需要添加其他内容，是否又会需要一一手动修改。

那是否有办法可以实现页面下不需要存在main.js文件而构建时webpack假装它存在并将其加入构建呢？我将需求描述的如此清楚是时候有个程序员来实现它了，虽然听起来像是要造一个三角月饼一般。

终于在某个风(不)和(用)日(干)丽(活)的上午，作为一名有着丰富~~google~~经验的前端工程师，我决定~~写一个工具~~找找现成的npm包来解决这个问题。最终我发现了[virtual-module-webpack-plugin](https://github.com/rmarscher/virtual-module-webpack-plugin)这个webpack插件。

现行通行的由webpack项目下，src下的代码最终是否会出现在dist目录并不完全取决于某个文件or模块是否被import，比如使用ContextReplacementPlugin来精简moment下的locale。webpack就像负责向皇帝呈递奏章的小太监，中间偷偷把大臣的奏章撕掉一页是完全可能的，只要最后皇帝读起来没有发现上下文丢了内容。所以聪明如康熙，“传位十四子”的遗诏同时提供了满文版的checksum，避免了“传位于四子”这样的中间人攻击。

话说回来，既然小太监可以把奏折偷偷撕掉一页，那假冒某个大臣替它上一份得罪皇帝的折子惹他个株连九族也未必不可能，只要这个小太监具备足够的文化水平和笔迹模仿能力。

webpack自身并没有提供这一骚操作，这也是科学的，如果eslint辛辛苦苦将disable-dynamic-require的代码交给了webpack，而webpack转身就往里面添加了一堆unexists-code，那真是像极了将分类垃圾桶里的垃圾倒入了一辆垃圾车中。

VirtualModuleWebpackPlugin做到了这点，它通过魔法操作实现了把不存在的文件(fs.exists意义上的不存在，我暂时把它称为virtual文件)加入构建。

> It uses private APIs of the CachedInputFileSystem of the enhanced-resolve package that Webpack uses as the module resolver. Therefore, it is inherently fragile and subject to be broken if the CachedInputFileSystem changes. Fortunately, the changes have not been too extensive between webpack 1.x - 4.x and this plugin has been updated to be compatible with all.

它使用了webpack的未开放api，将virtual文件作为缓存来欺骗webpack的resolve，虽然相关api可能会随着webpack升级而不可用，但目前来看这个问题并不需要特别担心，尤其是mpvue还停留在webpack3时代止步不前的情况下。

现在锤子已经就绪，便只差一个钉子来试试手。我创建了[repo](https://github.com/EAGzzyCSL/patron-saint-demo)记录了使用VirtualModuleWebpackPlugin改造mpvue项目全过程可供参看，且下面的文章内容会随commit一一增加。

## 初始化一个mpvue项目

> 我为这个项目起了一个名字：PatronSaint，后面会解释命名的由来。

### 套路三连

使用官方提供的mpvue-quickstart模板：

```bash
vue init mpvue/mpvue-quickstart patron-saint-demo
cd patron-saint-demo
npm install
```

### 小调整

mpvue官方模板生成的项目还不能够直接运行，需要做一点小调整：

- 填入从微信开发者给的touristappid: `wx492a011c5ecda41d`

- 删掉app.json中的tabBar字段，因为项目里其实没有tab页面。

### 删除无关代码

通过模板生成的项目中有一些组件和utils方法是做示例之用，这里将它们都删掉使页面保持最小以方便改造。

### 修改页面命名

微信小程序官方示例中页面路径都是`pages/Index/Index`格式，而mpvue下使用了`pages/index/main`格式。命名本身无大所谓，不过如果将来项目放弃mpvue框架转而使用原生开发，为了兼容旧有得页面路径，`pages/index/main`这种格式下代码文件的组织就会充斥着main。

```text
pages
├── index
│   ├── main.js
│   ├── main.json
│   ├── main.wxml
│   └── main.wxss
└── mine
    ├── main.js
    ├── main.json
    ├── main.wxml
    └── main.wxss
```

这对代码的快速定位非常不友好，所以我更倾向官方示例中得`pages/Index/Index`格式，且由于vue组件名通常为是PascalCase，所以这里需要重命名index.vue为Index.vue
