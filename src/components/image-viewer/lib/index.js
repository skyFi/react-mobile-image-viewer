"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ImageViewer = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _ImageViewer = _interopRequireDefault(require("./ImageViewer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// 不推荐；直接导出，提供不同的使用方式
var ImageViewer = _ImageViewer.default; // todo: cover-class, container-class, footer-class
// 推荐！

exports.ImageViewer = ImageViewer;

var _default = function _default() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options$maxZoomNum = options.maxZoomNum,
      maxZoomNum = _options$maxZoomNum === void 0 ? 8 : _options$maxZoomNum,
      _options$zIndex = options.zIndex,
      zIndex = _options$zIndex === void 0 ? 100 : _options$zIndex,
      _options$index = options.index,
      index = _options$index === void 0 ? 0 : _options$index,
      _options$urls = options.urls,
      urls = _options$urls === void 0 ? [] : _options$urls,
      _options$gap = options.gap,
      gap = _options$gap === void 0 ? 10 : _options$gap,
      _options$speed = options.speed,
      speed = _options$speed === void 0 ? 300 : _options$speed,
      _options$onClose = options.onClose,
      onClose = _options$onClose === void 0 ? function () {} : _options$onClose,
      _options$getContainer = options.getContainer,
      getContainer = _options$getContainer === void 0 ? function () {
    return document.body;
  } : _options$getContainer,
      _options$footer = options.footer,
      footer = _options$footer === void 0 ? undefined : _options$footer,
      _options$debug = options.debug,
      debug = _options$debug === void 0 ? false : _options$debug,
      screenWidth = options.screenWidth,
      screenHeight = options.screenHeight,
      _options$strict = options.strict,
      strict = _options$strict === void 0 ? true : _options$strict,
      _options$doubleTap = options.doubleTap,
      doubleTap = _options$doubleTap === void 0 ? true : _options$doubleTap,
      _options$onChange = options.onChange,
      onChange = _options$onChange === void 0 ? function () {} : _options$onChange,
      _options$containerCla = options.containerClass,
      containerClass = _options$containerCla === void 0 ? '' : _options$containerCla,
      _options$maskClass = options.maskClass,
      maskClass = _options$maskClass === void 0 ? '' : _options$maskClass,
      _options$footerClass = options.footerClass,
      footerClass = _options$footerClass === void 0 ? '' : _options$footerClass;
  var $node = document.createElement('div');
  var $container = getContainer();

  if (!isElement($container)) {
    console.warn(new Error('getContainer 函数的返回值应该是 DOM element.')); // eslint-disable-line

    $container = document.body;
  }

  $container.appendChild($node); // 渲染节点

  if (Array.isArray(urls) && urls.length > 0) {
    // 严格操作模式，开启将禁止 safari 的橡皮筋效果
    strict && document.body.addEventListener('touchmove', handleTouchmove, {
      passive: false
    }); //passive 参数不能省略，用来兼容ios和android

    _reactDom.default.render(_react.default.createElement(_ImageViewer.default, {
      index: index,
      urls: urls,
      footer: footer,
      onClose: handleClose,
      onChange: onChange,
      maxZoomNum: maxZoomNum,
      zIndex: zIndex,
      speed: speed,
      doubleTap: doubleTap,
      gap: gap,
      screenHeight: screenHeight,
      screenWidth: screenWidth,
      debug: debug,
      containerClass: containerClass,
      maskClass: maskClass,
      footerClass: footerClass
    }), $node);
  } // 预览结束


  function handleClose() {
    onClose instanceof Function && onClose();
    strict && document.body.removeEventListener('touchmove', handleTouchmove);

    if ($node) {
      $node.remove();
      $node = null;
    }
  } // iOS safari 阻止“橡皮筋效果”


  function handleTouchmove(e) {
    e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
  }

  return {
    destroy: handleClose
  };
}; // 判断是否是 DOM element, 来自 lodash https://github.com/lodash/lodash/blob/master/isElement.js


exports.default = _default;

function isElement(value) {
  return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
}

function isObjectLike(value) {
  return _typeof(value) === 'object' && value !== null;
}

function isPlainObject(value) {
  if (!isObjectLike(value) || getTag(value) !== '[object Object]') {
    return false;
  }

  if (Object.getPrototypeOf(value) === null) {
    return true;
  }

  var proto = value;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(value) === proto;
}

var toString = Object.prototype.toString;
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