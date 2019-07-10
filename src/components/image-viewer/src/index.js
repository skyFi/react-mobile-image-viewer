import React from 'react';
import ReactDOM from 'react-dom';
import Viewer from './ImageViewer';

// 不推荐；直接导出，提供不同的使用方式
export const ImageViewer = Viewer;

// todo: cover-class, container-class, footer-class
// 推荐！
export default (options = {}) => {
  const {
    maxZoomNum = 5, // 最大放大倍数
    zIndex = 100, // 组件图层深度
    index = 0, // 当前显示图片的http链接
    urls = [], // 需要预览的图片http链接列表
    gap = 10, // 间隙
    speed = 300, // Duration of transition between slides (in ms)
    onClose = () => {}, // 关闭组件回调
    getContainer = () => document.body, // 容器
    footer = undefined, // 底部节点
    debug = false, // 是否打印开发日志
    screenWidth, // 屏幕宽 document.documentElement.clientWidth
    screenHeight, // 屏幕高 document.documentElement.clientHeight
    strict = true, // 严格操作模式，开启将禁止 safari 的橡皮筋效果
    onChange = () => {} // 换页操作回调
  } = options;
  let $node = document.createElement('div');
  let $container = getContainer();
  if (!isElement($container)) {
    console.warn(new Error('getContainer 函数的返回值应该是 DOM element.')); // eslint-disable-line
    $container = document.body;
  }
  $container.appendChild($node);

  // 严格操作模式，开启将禁止 safari 的橡皮筋效果
  strict && document.body.addEventListener('touchmove', handleTouchmove, { passive: false }); //passive 参数不能省略，用来兼容ios和android

  // 渲染节点
  if (Array.isArray(urls) && urls.length > 0) {
    ReactDOM.render(
      <Viewer
        index={index}
        urls={urls}
        footer={footer}
        onClose={handleClose}
        onChange={onChange}
        maxZoomNum={maxZoomNum}
        zIndex={zIndex}
        speed={speed}
        gap={gap}
        screenHeight={screenHeight}
        screenWidth={screenWidth}
        debug={debug}
      />,
      $node
    );
  }

  // 预览结束
  function handleClose() {
    onClose instanceof Function && onClose();
    strict && document.body.removeEventListener('touchmove', handleTouchmove, { passive: false });
    if ($node) {
      $node.remove();
      $node = null;
    }
  }

  // iOS safari 阻止“橡皮筋效果”
  function handleTouchmove(e) {
    e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
  }

  return {
    destroy: handleClose
  };
};

// 判断是否是 DOM element, 来自 lodash https://github.com/lodash/lodash/blob/master/isElement.js
function isElement(value) {
  return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
}

function isObjectLike(value) {
  return typeof value === 'object' && value !== null;
}

function isPlainObject(value) {
  if (!isObjectLike(value) || getTag(value) !== '[object Object]') {
    return false;
  }
  if (Object.getPrototypeOf(value) === null) {
    return true;
  }
  let proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(value) === proto;
}

const toString = Object.prototype.toString;

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function getTag(value) {
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]';
  }
  return toString.call(value);
}
