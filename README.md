# react-mobile-image-viewer

## 体验

```bash
git clone https://github.com/skyFi/react-mobile-image-viewer.git
cd react-mobile-image-viewer
yarn && npm start
```

1. 本地手机预览需要在同一个局域网下面访问`<本地电脑ip>:3000`
2. 在线预览： [https://skyfi.github.io/react-mobile-image-viewer/](https://skyfi.github.io/react-mobile-image-viewer/)

![](https://github.com/skyFi/react-mobile-image-viewer/raw/master/react-mobile-image-viewer__qrcode.png)

## 安装

```bash
npm install react-mobile-image-viewer --save
```

## 使用

### 做函数使用（`推荐`）

基本规则： `viewer(<配置信息（[如下](#配置)）>: Object) => ({ destroy: Function })`;

```javascript
// import
import viewer from 'react-mobile-image-viewer';
import 'react-mobile-image-viewer/lib/index.css';

// show viewer
this.v = viewer({
  urls: ['... image url', '... image url']
});

// cancel view
this.v && this.v.destroy();
```

### 做节点使用

```javascript
// import
import { ImageViewer } from 'react-mobile-image-viewer';
import 'react-mobile-image-viewer/lib/index.css';

// show viewer
<ImageViewer urls={['... image url', '... image url']} />;
```

## 配置

| 属性           | 类型                                                     | 描述                                                                                    | 默认值                |
| -------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------- | --------------------- |
| urls           | `string[]`                                               | 需要预览的图片链接列表                                                                  | `[]`                  |
| index          | `number`                                                 | 当前显示图片的位置索引，从 `0` 开始                                                     | `0`                   |
| footer         | `ReactNode/({ currentIndex: number }) => ReactNode/null` | 自定义底部节点                                                                          | `undefined`           |
| onClose        | `() => void`                                             | 关闭组件回调                                                                            | `() => {}`            |
| onChange       | `({ currentIndex: number }) => void`                     | 换页操作回调                                                                            | `() => {}`            |
| getContainer   | `() => DOM element`                                      | 自定义容器                                                                              | `() => document.body` |
| maxZoomNum     | `number`                                                 | 最大放大倍数                                                                            | `8`                   |
| zIndex         | `number`                                                 | 组件图层深度                                                                            | `100`                 |
| screenWidth    | `number`                                                 | 屏幕宽 `document.documentElement.clientWidth`                                           | `undefined`           |
| screenHeight   | `number`                                                 | 屏幕高 `document.documentElement.clientHeight`                                          | `undefined`           |
| speed          | `number`                                                 | 滑动的时长(in `ms`)                                                                     | `300`                 |
| gap            | `number`                                                 | 间隙(in `px`)                                                                           | `10`                  |
| debug          | `boolean`                                                | 是否打印开发日志，默认关闭                                                              | `false`               |
| strict         | `boolean`                                                | 严格操作模式，开启将禁止 safari 的橡皮筋效果，默认开启                                  | `true`                |
| doubleTap      | `boolean`                                                | 是否开启双击放大效果，开启后会导致单击取消有个 `250ms` 的延时（作为双击判断），默认开启 | `true`                |
| containerClass | `string`                                                 | 容器自定义样式类                                                                        | `''`                  |
| maskClass      | `string`                                                 | 遮罩自定义样式类                                                                        | `''`                  |
| footerClass    | `string`                                                 | 底部自定义样式类                                                                        | `''`                  |

## 协议

MIT License

Copyright (c) 2018 Skylor.Min

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
