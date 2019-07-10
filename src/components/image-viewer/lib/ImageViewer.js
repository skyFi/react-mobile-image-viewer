"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Pointer = _interopRequireDefault(require("./Pointer"));

var _ListContainer = _interopRequireDefault(require("./ListContainer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var screenWidth = typeof document !== 'undefined' && document.documentElement.clientWidth;
var screenHeight = typeof document !== 'undefined' && document.documentElement.clientHeight;

var ImageViewer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ImageViewer, _React$Component);

  function ImageViewer(props) {
    var _this;

    _classCallCheck(this, ImageViewer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ImageViewer).call(this, props));
    _this.state = {
      index: props.index || 0
    };
    _this.changeIndex = _this.changeIndex.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ImageViewer, [{
    key: "changeIndex",
    value: function changeIndex(index) {
      var onChange = this.props.onChange;
      this.setState({
        index: index
      });

      if (onChange instanceof Function) {
        onChange({
          currentIndex: index
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          maxZoomNum = _this$props.maxZoomNum,
          zIndex = _this$props.zIndex,
          urls = _this$props.urls,
          gap = _this$props.gap,
          speed = _this$props.speed,
          onClose = _this$props.onClose,
          footer = _this$props.footer,
          debug = _this$props.debug,
          width = _this$props.screenWidth,
          height = _this$props.screenHeight;
      var index = this.state.index; // 获取底部元素

      function getFooter() {
        if (footer instanceof Function) {
          var r = footer({
            currentIndex: index
          });
          return _react.default.isValidElement(r) ? r : null;
        }

        if (_react.default.isValidElement(footer)) {
          return footer;
        }

        return footer;
      }

      var f = getFooter();
      return _react.default.createElement("div", {
        className: "fly-component-image-viewer-container",
        style: {
          zIndex: zIndex
        }
      }, _react.default.createElement("div", {
        className: "viewer-container__cover"
      }), _react.default.createElement(_ListContainer.default, {
        screenWidth: width || screenWidth,
        screenHeight: height || screenHeight,
        changeIndex: this.changeIndex,
        onClose: onClose,
        debug: debug,
        urls: urls,
        maxZoomNum: maxZoomNum,
        gap: gap,
        speed: speed,
        index: index
      }), f !== undefined ? _react.default.createElement("div", {
        className: "viewer-container__pointer-box"
      }, f) : _react.default.createElement(_Pointer.default, {
        length: urls.length,
        index: index,
        changeIndex: this.changeIndex
      }));
    }
  }]);

  return ImageViewer;
}(_react.default.Component);

exports.default = ImageViewer;