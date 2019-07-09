"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ImageContainer = _interopRequireDefault(require("./ImageContainer"));

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

// 快速拖动时间限制
var DEFAULT_TIME_DIFF = 200;

var ListContainer =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ListContainer, _PureComponent);

  function ListContainer() {
    var _this;

    _classCallCheck(this, ListContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ListContainer).call(this));
    _this.isNeedSpring = false;
    _this.state = {
      left: 0
    };
    _this.easing = _this.easing.bind(_assertThisInitialized(_this));
    _this.handleStart = _this.handleStart.bind(_assertThisInitialized(_this));
    _this.handleMove = _this.handleMove.bind(_assertThisInitialized(_this));
    _this.handleEnd = _this.handleEnd.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ListContainer, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this$props = this.props,
          screenWidth = _this$props.screenWidth,
          urls = _this$props.urls,
          index = _this$props.index,
          gap = _this$props.gap;
      this.length = urls.length;
      this.perDistance = screenWidth + gap;
      this.maxLeft = this.perDistance * (this.length - 1);
      this.isNeedSpring = false;
      this.setState({
        left: -this.perDistance * index
      });
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.index !== nextProps.index) {
        this.isNeedSpring = true;
        this.setState({
          left: -this.perDistance * nextProps.index
        });
      }
    }
    /**
     * 拖拽的缓动公式 - easeOutSine
     * Link http://easings.net/zh-cn#
     * t: current time（当前时间）；
     * b: beginning value（初始值）；
     * c: change in value（变化量）；
     * d: duration（持续时间）。
     */

  }, {
    key: "easing",
    value: function easing(distance) {
      var t = distance;
      var b = 0;
      var d = this.props.screenWidth; // 允许拖拽的最大距离

      var c = d / 2.5; // 提示标签最大有效拖拽距离

      return c * Math.sin(t / d * (Math.PI / 2)) + b;
    }
  }, {
    key: "handleStart",
    value: function handleStart() {
      this.props.debug && console.info('ListContainer handleStart');
      this.startLeft = this.state.left;
      this.startTime = new Date().getTime();
      this.isNeedSpring = false;
    }
  }, {
    key: "handleMove",
    value: function handleMove(diffX) {
      this.props.debug && console.info('ListContainer handleStart diffX = %s', diffX);
      var nDiffx = diffX; // 限制最大 diffx 值

      if (Math.abs(nDiffx) > this.props.screenWidth) {
        if (nDiffx < 0) {
          nDiffx = -this.props.screenWidth;
        }

        if (nDiffx > 0) {
          nDiffx = this.props.screenWidth;
        }
      }

      if (this.state.left >= 0 && nDiffx > 0) {
        nDiffx = this.easing(nDiffx);
      } else if (this.state.left <= -this.maxLeft && nDiffx < 0) {
        nDiffx = -this.easing(-nDiffx);
      }

      this.setState({
        left: this.startLeft + nDiffx
      });
    }
  }, {
    key: "handleEnd",
    value: function handleEnd(isAllowChange) {
      var index;
      var diffTime = new Date().getTime() - this.startTime;
      this.props.debug && console.info('handleEnd %s', isAllowChange, diffTime, this.state.left, this.startLeft, this.props.index); // 快速拖动情况下切换图片

      if (isAllowChange && diffTime < DEFAULT_TIME_DIFF) {
        if (this.state.left < this.startLeft) {
          index = this.props.index + 1;
        } else {
          index = this.props.index - 1;
        }
      } else {
        index = Math.abs(Math.round(this.state.left / this.perDistance));
      } // 处理边界情况


      if (index < 0) {
        index = 0;
      } else if (index > this.length - 1) {
        index = this.length - 1;
      }

      this.setState({
        left: -this.perDistance * index
      });
      this.isNeedSpring = true;

      if (index !== this.props.index) {
        this.props.changeIndex(index);
        return true;
      }

      return false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          maxZoomNum = _this$props2.maxZoomNum,
          screenWidth = _this$props2.screenWidth,
          screenHeight = _this$props2.screenHeight,
          urls = _this$props2.urls,
          speed = _this$props2.speed,
          onClose = _this$props2.onClose,
          debug = _this$props2.debug;
      var left = this.state.left;
      var defaultStyle = {};

      if (this.isNeedSpring) {
        var duration = "".concat(speed, "ms");
        defaultStyle.WebkitTransitionDuration = duration;
        defaultStyle.transitionDuration = duration;
      }

      var translate = "translate3d(".concat(left, "px, 0, 0)");
      defaultStyle.WebkitTransform = translate;
      defaultStyle.transform = translate;
      return _react.default.createElement("div", {
        className: "viewer-container__viewer-list-container",
        style: defaultStyle
      },
      /* 这里使用 index 作为 key，是因为可能存在同一张图片在预览中 */
      urls.map(function (item, i) {
        return _react.default.createElement(_ImageContainer.default, {
          key: i // eslint-disable-line
          ,
          src: item,
          debug: debug,
          maxZoomNum: maxZoomNum,
          handleStart: _this2.handleStart,
          handleMove: _this2.handleMove,
          handleEnd: _this2.handleEnd,
          onClose: onClose,
          left: _this2.perDistance * i,
          screenWidth: screenWidth,
          screenHeight: screenHeight
        });
      }));
    }
  }]);

  return ListContainer;
}(_react.PureComponent);

var _default = ListContainer;
exports.default = _default;