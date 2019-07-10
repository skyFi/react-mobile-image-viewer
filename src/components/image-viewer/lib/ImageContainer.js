"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _raf = _interopRequireDefault(require("raf"));

var _tween = _interopRequireDefault(require("./tween.js"));

var _Loading = _interopRequireDefault(require("./Loading"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 *
 * @param {number} value
 * @param {number} min
 * @param {number} max
 */
function setScope(value, min, max) {
  if (value < min) {
    return min;
  }

  if (value > max) {
    return max;
  }

  return value;
}

function getDistanceBetweenTouches(e) {
  if (e.touches.length < 2) return 1;
  var x1 = e.touches[0].clientX;
  var y1 = e.touches[0].clientY;
  var x2 = e.touches[1].clientX;
  var y2 = e.touches[1].clientY;
  var distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  return distance;
} // const msPerFrame = 1000 / 60;


var maxAnimateTime = 1000;
var minTapMoveValue = 5;
var maxTapTimeValue = 50;
/**
 * 图片默认展示模式：宽度等于屏幕宽度，高度等比缩放；水平居中，垂直居中或者居顶（当高度大于屏幕高度时）
 * 图片实际尺寸： actualWith, actualHeight
 * 图片初始尺寸： originWidth, originHeight
 * 坐标位置：left, top
 * 放大倍数：zoom
 * 最大放大倍数：maxZoomNum
 * 坐标关系：-(maxZoomNum - 1) * originWidth / 2 < left < 0
 *         -(maxZoomNum - 1) * originHeight / 2 < top < 0
 * 尺寸关系：width = zoom * originWidth
 *         heigth = zoom * originHeight
 *
 * 放大点位置关系：
 * 初始点位置：oldPointLeft, oldPointTop
 * 放大后位置：newPointLeft, newPointTop
 * 对应关系： newPointLeft = zoom * oldPointLeft
 *          newPointTop = zoom * oldPointTop
 *
 * 坐标位置：-1*left = -1*startLeft + (newPointLeft - oldPointLeft) =-1*startLeft (zoom - 1) * oldPointLeft
 *         -1*top = -1*startTop + (newPointTop - oldPointTop) =-1*startLeft (zoom - 1) * oldPointTop
 * =>
 * left = startLeft + (1 - zoom) * oldPointLeft
 * top = startTop + (1 - zoom) * oldPointTop
 */

var ImageContainer =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ImageContainer, _PureComponent);

  function ImageContainer() {
    var _this;

    _classCallCheck(this, ImageContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ImageContainer).call(this));
    Object.defineProperty(_assertThisInitialized(_this), "loadImg", {
      enumerable: true,
      writable: true,
      value: function value(url) {
        _this.img = new Image();
        _this.img.src = url;
        _this.img.onload = _this.onLoad;
        _this.img.onerror = _this.onError;

        _this.setState({
          isLoaded: false
        });
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "callHandleMove", {
      enumerable: true,
      writable: true,
      value: function value(diffX) {
        if (!_this.isCalledHandleStart) {
          _this.isCalledHandleStart = true;

          if (_this.props.handleStart) {
            _this.props.handleStart();
          }
        }

        _this.props.handleMove(diffX);
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "callHandleEnd", {
      enumerable: true,
      writable: true,
      value: function value(isAllowChange) {
        if (_this.isCalledHandleStart) {
          _this.isCalledHandleStart = false;

          if (_this.props.handleEnd) {
            return _this.props.handleEnd(isAllowChange);
          }
        }
      }
    });
    _this.actualHeight = 0; // 图片实际高度

    _this.actualWith = 0; // 图片实际宽度

    _this.originHeight = 0; // 图片默认展示模式下高度

    _this.originWidth = 0; // 图片默认展示模式下宽度

    _this.originScale = 1; // 图片初始缩放比例

    _this.startLeft = 0; // 开始触摸操作时的 left 值

    _this.startTop = 0; // 开始触摸操作时的 top 值

    _this.startScale = 1; // 开始缩放操作时的 scale 值

    _this.onTouchStartTime = 0; // 单指触摸开始时间

    _this.isTwoFingerMode = false; // 是否为双指模式

    _this.oldPointLeft = 0; // 计算手指中间点在图片上的位置（坐标值）

    _this.oldPointTop = 0; // 计算手指中间点在图片上的位置（坐标值）

    _this._touchZoomDistanceStart = 0; // 用于记录双指距离

    _this.haveCallMoveFn = false;
    _this.diffX = 0; // 记录最后 move 事件 移动距离

    _this.diffY = 0; // 记录最后 move 事件 移动距离

    _this.animationID = 0;
    _this.animateStartTime = 0;
    _this.animateStartValue = {
      x: 0,
      y: 0
    };
    _this.animateFinalValue = {
      x: 0,
      y: 0
    };
    _this.state = {
      width: 0,
      height: 0,
      scale: 1,
      left: 0,
      top: 0,
      isLoaded: false
    };
    _this.onLoad = _this.onLoad.bind(_assertThisInitialized(_this));
    _this.onError = _this.onError.bind(_assertThisInitialized(_this));
    _this.unloadImg = _this.unloadImg.bind(_assertThisInitialized(_this));
    _this.startAnimate = _this.startAnimate.bind(_assertThisInitialized(_this));
    _this.handleTouchStart = _this.handleTouchStart.bind(_assertThisInitialized(_this));
    _this.handleTouchMove = _this.handleTouchMove.bind(_assertThisInitialized(_this));
    _this.handleTouchEnd = _this.handleTouchEnd.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ImageContainer, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.loadImg(this.props.src);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.unloadImg();

      if (this.animationID) {
        _raf.default.cancel(this.animationID);
      }
    }
  }, {
    key: "onLoad",
    value: function onLoad() {
      this.actualWith = this.img.width;
      this.actualHeight = this.img.height;
      var _this$props = this.props,
          screenHeight = _this$props.screenHeight,
          screenWidth = _this$props.screenWidth;
      var left = 0;
      var top = 0;
      this.originWidth = screenWidth;
      this.originHeight = this.actualHeight / this.actualWith * screenWidth;
      this.originScale = 1;

      if (this.actualHeight / this.actualWith < screenHeight / screenWidth) {
        top = parseInt((screenHeight - this.originHeight) / 2, 10);
      }

      this.originTop = top;
      this.setState({
        width: this.originWidth,
        height: this.originHeight,
        scale: 1,
        left: left,
        top: top,
        isLoaded: true
      });
    }
  }, {
    key: "onError",
    value: function onError() {
      this.setState({
        isLoaded: true
      });
    }
  }, {
    key: "unloadImg",
    value: function unloadImg() {
      delete this.img.onerror;
      delete this.img.onload;
      delete this.img.src;
      delete this.img;
    }
  }, {
    key: "handleTouchStart",
    value: function handleTouchStart(event) {
      event.preventDefault();

      if (this.animationID) {
        _raf.default.cancel(this.animationID);
      }

      switch (event.touches.length) {
        case 1:
          {
            var targetEvent = event.touches[0];
            this.startX = targetEvent.clientX;
            this.startY = targetEvent.clientY;
            this.diffX = 0;
            this.diffY = 0;
            this.startLeft = this.state.left;
            this.startTop = this.state.top;
            this.props.debug && console.info('handleTouchStart this.startX = %s, this.startY = %s, this.startLeft = %s, this.startTop = %s', this.startX, this.startY, this.startLeft, this.startTop);
            this.onTouchStartTime = Date.now();
            this.haveCallMoveFn = false;
            break;
          }

        case 2:
          {
            // 两个手指
            // 设置手双指模式
            this.isTwoFingerMode = true; // 计算两个手指中间点屏幕上的坐标

            var middlePointClientLeft = Math.abs(Math.round((event.touches[0].clientX + event.touches[1].clientX) / 2));
            var middlePointClientTop = Math.abs(Math.round((event.touches[0].clientY + event.touches[1].clientY) / 2)); // 保存图片初始位置和尺寸

            this.startLeft = this.state.left;
            this.startTop = this.state.top;
            this.startScale = this.state.scale; // 计算手指中间点在图片上的位置（坐标值）

            this.oldPointLeft = middlePointClientLeft - this.startLeft;
            this.oldPointTop = middlePointClientTop - this.startTop;
            this._touchZoomDistanceStart = getDistanceBetweenTouches(event);
            break;
          }

        default:
          break;
      }
    }
  }, {
    key: "handleTouchMove",
    value: function handleTouchMove(event) {
      var _this2 = this;

      event.preventDefault();

      switch (event.touches.length) {
        case 1:
          {
            var targetEvent = event.touches[0];
            var diffX = targetEvent.clientX - this.startX;
            var diffY = targetEvent.clientY - this.startY;
            this.diffX = diffX;
            this.diffY = diffY;
            this.props.debug && console.info('handleTouchMove one diffX=%s, diffY=%s', diffX, diffY); // 判断是否为点击

            if (Math.abs(diffX) < minTapMoveValue && Math.abs(diffY) < minTapMoveValue) {
              return;
            }

            var _this$state = this.state,
                scale = _this$state.scale,
                left = _this$state.left;
            var width = scale * this.originWidth;

            if (Math.abs(diffX) > Math.abs(diffY)) {
              // 水平移动
              if (this.state.scale === this.originScale && Math.abs(diffX) > minTapMoveValue) {
                this.haveCallMoveFn = true;
                this.callHandleMove(diffX);
                return;
              }

              this.props.debug && console.info('handleMove one left=%s, this.startLeft=%s,this.originWidth=%s, width=%s', left, this.startLeft, this.originWidth, width);

              if (diffX < 0 && this.startLeft <= this.originWidth - width) {
                this.haveCallMoveFn = true;
                this.callHandleMove(diffX);
                return;
              }

              if (diffX > 0 && this.startLeft >= 0) {
                this.haveCallMoveFn = true;
                this.callHandleMove(diffX);
                return;
              }
            }

            var screenHeight = this.props.screenHeight;
            var height = scale * this.originHeight;
            var newTop = (screenHeight - height) / 2;
            var newLeft = this.startLeft + diffX;

            if (height > screenHeight || this.state.scale === this.originScale) {
              newTop = this.startTop + diffY;
            }

            this.props.debug && console.info('handleTouchMove one newLeft=%s, newTop=%s', newLeft, newTop);
            this.setState({
              left: newLeft,
              top: newTop
            });
            break;
          }

        case 2:
          {
            // 两个手指
            this._touchZoomDistanceEnd = getDistanceBetweenTouches(event);
            var zoom = Math.sqrt(this._touchZoomDistanceEnd / this._touchZoomDistanceStart);

            var _scale = zoom * this.startScale;

            this.setState(function () {
              var left = _this2.startLeft + (1 - zoom) * _this2.oldPointLeft;
              var top = _this2.startTop + (1 - zoom) * _this2.oldPointTop;
              _this2.props.debug && console.info('zoom = %s, left = %s, top = %s, scale', zoom, left, top, _scale);
              return {
                left: left,
                top: top,
                scale: _scale
              };
            });
            break;
          }

        default:
          break;
      }
    }
  }, {
    key: "handleTouchEnd",
    value: function handleTouchEnd(event) {
      var _this3 = this;

      event.preventDefault();

      if (this.isTwoFingerMode) {
        // 双指操作结束
        var touchLen = event.touches.length;
        this.isTwoFingerMode = false;

        if (touchLen === 1) {
          var targetEvent = event.touches[0];
          this.startX = targetEvent.clientX;
          this.startY = targetEvent.clientY;
          this.diffX = 0;
          this.diffY = 0;
        }

        this.setState(function (prevState, props) {
          var scale = setScope(prevState.scale, 1, props.maxZoomNum);
          var width = scale * _this3.originWidth;
          var height = scale * _this3.originHeight;
          var zoom = scale / _this3.startScale;
          var left = setScope(_this3.startLeft + (1 - zoom) * _this3.oldPointLeft, _this3.originWidth - width, 0);
          var top;

          if (height > props.screenHeight) {
            top = setScope(_this3.startTop + (1 - zoom) * _this3.oldPointTop, props.screenHeight - height, 0);
          } else {
            top = (props.screenHeight - height) / 2;
          }

          if (touchLen === 1) {
            _this3.startLeft = left;
            _this3.startTop = top;
            _this3.startScale = scale;
            _this3.props.debug && console.info('this.startX = %s, this.startY = %s, this.startLeft = %s, this.startTop = %s', _this3.startX, _this3.startY, _this3.startLeft, _this3.startTop);
          }

          _this3.props.debug && console.info('zoom = %s, left = %s, top = %s, width=%s, height= %s', zoom, left, top, width, height);
          return {
            left: left,
            top: top,
            scale: scale
          };
        });
      } else {
        var now = Date.now(); // 单指结束（ontouchend）

        var diffTime = now - this.onTouchStartTime;
        this.lastTouchEndTime = now;
        var diffX = this.diffX,
            diffY = this.diffY;
        this.props.debug && console.info('handleTouchEnd one diffTime = %s, diffX = %s, diffy = %s', diffTime, diffX, diffY); // 判断为点击则关闭图片浏览组件

        if (diffTime < maxTapTimeValue && Math.abs(diffX) < minTapMoveValue && Math.abs(diffY) < minTapMoveValue) {
          this.props.onClose instanceof Function && this.props.onClose();
          return;
        } // 水平移动


        if (this.haveCallMoveFn) {
          var isChangeImage = this.callHandleEnd(diffY < 30);

          if (isChangeImage) {
            // 如果切换图片则重置当前图片状态
            setTimeout(function () {
              _this3.setState({
                scale: _this3.originScale,
                left: 0,
                top: _this3.originTop
              });
            }, maxAnimateTime / 3);
            return;
          }
        } // TODO: 下拉移动距离超过屏幕高度的 1/3 则关闭


        this.props.debug && console.info(Math.abs(diffY) > this.props.screenHeight / 2, this.startTop, this.originTop);

        if (Math.abs(diffX) < Math.abs(diffY) && Math.abs(diffY) > this.props.screenHeight / 3 && this.startTop === this.originTop) {
          this.props.onClose instanceof Function && this.props.onClose();
          return;
        }

        var x;
        var y;
        var scale = this.state.scale;
        var width = scale * this.originWidth;
        var height = scale * this.originHeight; // 使用相同速度算法

        x = diffX * maxAnimateTime / diffTime + this.startLeft;
        y = diffY * maxAnimateTime / diffTime + this.startTop;

        if (this.state.scale === this.originScale) {
          x = 0;

          if (height > this.props.screenHeight) {
            y = setScope(y, this.props.screenHeight - height, 0);
          } else {
            y = this.originTop;
          }
        } // 边界计算


        x = setScope(x, this.originWidth - width, 0);

        if (height > this.props.screenHeight) {
          y = setScope(y, this.props.screenHeight - height, 0);
        } else {
          y = this.state.top;
        }

        this.animateStartValue = {
          x: this.state.left,
          y: this.state.top
        };
        this.animateFinalValue = {
          x: x,
          y: y
        };
        this.animateStartTime = Date.now();
        this.startAnimate();
      }
    }
  }, {
    key: "startAnimate",
    value: function startAnimate() {
      var _this4 = this;

      this.animationID = (0, _raf.default)(function () {
        // calculate current time
        var curTime = Date.now() - _this4.animateStartTime;

        var left;
        var top; // animate complete

        if (curTime > maxAnimateTime) {
          _this4.setState(function (prevState, props) {
            var width = prevState.scale * _this4.originWidth;
            var height = prevState.scale * _this4.originHeight;
            left = setScope(prevState.left, _this4.originWidth - width, 0);

            if (height > props.screenHeight) {
              top = setScope(prevState.top, props.screenHeight - height, 0);
            } else {
              top = (props.screenHeight - height) / 2;
            }

            _this4.props.debug && console.info('end animate left= %s, top = %s', left, top);
            return {
              left: left,
              top: top
            };
          });
        } else {
          left = _tween.default.easeOutQuart(curTime, _this4.animateStartValue.x, _this4.animateFinalValue.x, maxAnimateTime);
          top = _tween.default.easeOutQuart(curTime, _this4.animateStartValue.y, _this4.animateFinalValue.y, maxAnimateTime);
          _this4.props.debug && console.info('startAnimate left= %s, top = %s, curTime = %s', left, top, curTime);

          _this4.setState({
            left: left,
            top: top
          });

          _this4.startAnimate();
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          screenWidth = _this$props2.screenWidth,
          screenHeight = _this$props2.screenHeight,
          src = _this$props2.src,
          divLeft = _this$props2.left;
      var _this$state2 = this.state,
          isLoaded = _this$state2.isLoaded,
          left = _this$state2.left,
          top = _this$state2.top,
          scale = _this$state2.scale,
          width = _this$state2.width,
          height = _this$state2.height;
      var ImageStyle = {
        width: width,
        height: height
      };
      var translate = "translate3d(".concat(left, "px, ").concat(top, "px, 0) scale(").concat(scale, ")");
      ImageStyle.WebkitTransform = translate;
      ImageStyle.transform = translate;
      var defaultStyle = {
        left: divLeft,
        width: screenWidth,
        height: screenHeight
      };
      return _react.default.createElement("div", {
        className: "viewer-container__viewer-image-container",
        onTouchStart: this.handleTouchStart,
        onTouchMove: this.handleTouchMove,
        onTouchEnd: this.handleTouchEnd,
        style: defaultStyle
      }, isLoaded ? _react.default.createElement("img", {
        src: src,
        style: ImageStyle,
        alt: "\u56FE\u7247\u9884\u89C8"
      }) : _react.default.createElement(_Loading.default, null));
    }
  }]);

  return ImageContainer;
}(_react.PureComponent);

var _default = ImageContainer;
exports.default = _default;