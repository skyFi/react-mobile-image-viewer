import React from 'react';
import Pointer from './Pointer';
import ListContainer from './ListContainer';

const screenWidth = typeof document !== 'undefined' && document.documentElement.clientWidth;
const screenHeight = typeof document !== 'undefined' && document.documentElement.clientHeight;

export default class ImageViewer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: props.index || 0,
      opacity: 1
    };
    this.changeIndex = this.changeIndex.bind(this);
    this.handleOpacity = this.handleOpacity.bind(this);
  }

  changeIndex(index) {
    const { onChange } = this.props;
    this.setState({ index });
    if (onChange instanceof Function) {
      onChange({ currentIndex: index });
    }
  }

  handleOpacity(opacity) {
    this.setState({ opacity });
  }

  render() {
    const {
      maxZoomNum,
      zIndex,
      urls,
      gap,
      speed,
      onClose,
      footer,
      debug,
      doubleTap,
      screenWidth: width,
      screenHeight: height,
      containerClass,
      maskClass,
      footerClass
    } = this.props;
    const { index, opacity } = this.state;

    // 获取底部元素
    function getFooter() {
      if (footer instanceof Function) {
        const r = footer({ currentIndex: index });
        return React.isValidElement(r) ? r : null;
      }
      if (React.isValidElement(footer)) {
        return footer;
      }

      return footer;
    }

    const f = getFooter();

    return (
      <div
        className={`fly-component-image-viewer-container ${containerClass}`}
        style={{ zIndex, opacity, transition: `all ${opacity !== 0 && opacity !== 1 ? 100 : 500}ms` }}
      >
        <div className={`viewer-container__cover ${maskClass}`} />
        <ListContainer
          screenWidth={width || screenWidth}
          screenHeight={height || screenHeight}
          changeIndex={this.changeIndex}
          onClose={onClose}
          doubleTap={doubleTap}
          onOpacity={this.handleOpacity}
          debug={debug}
          urls={urls}
          maxZoomNum={maxZoomNum}
          gap={gap}
          speed={speed}
          index={index}
        />
        {f !== undefined ? (
          <div className={`viewer-container__pointer-box ${footerClass}`}>{f}</div>
        ) : (
          <Pointer length={urls.length} index={index} changeIndex={this.changeIndex} />
        )}
      </div>
    );
  }
}
