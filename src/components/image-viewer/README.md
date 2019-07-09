## 安装

```bash
npm install react-mobile-image-viewer --save
```

## 使用

### 做函数使用（`推荐`）

```javascript
// import
import viewer from 'react-mobile-image-viewer';

// show viewer
viewer({
  urls: ['... image url', '... image url'],
});
```

### 做节点使用

```javascript
// import
import { ImageViewer } from 'react-mobile-image-viewer';

// show viewer
<ImageViewer urls={['... image url', '... image url']} />
```

## 属性

| 属性         | 类型       | 描述                                         | 默认值                |
| ------------ | ---------- | -------------------------------------------- | --------------------- |
| maxZoomNum   | number     | 最大放大倍数                                 | `5`                   |
| zIndex       | number     | 组件图层深度                                 | `100`                 |
| index        | number     | 当前显示图片的位置索引，从 0 开始            | `0`                   |
| urls         | string[]   | 需要预览的图片链接列表                       | `[]`                  |
| gap          | number     | 间隙                                         | `10`                  |
| speed        | number     | 滑动的时长(in ms)                            | `300`                 |
| onClose      | function   | 关闭组件回调                                 | `() => {}`            |
| getContainer | function   | 自定义容器                                   | `() => document.body` |
| footer       | React Node | 自定义底部节点                               | `null`                |
| debug        | boolean    | 是否打印开发日志                             | `false`               |
| screenWidth  | number     | 屏幕宽 document.documentElement.clientWidth  | `undefined`           |
| screenHeight | number     | 屏幕高 document.documentElement.clientHeight | `undefined`           |
| strict       | boolean    | 严格操作模式，开启将禁止 safari 的橡皮筋效果 | `true`                |
