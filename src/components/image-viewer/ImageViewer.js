import React from 'react';
import Pointer from './Pointer';
import ListContainer from './ListContainer';

import './ImageViewer.css';

const screenWidth = typeof document !== 'undefined' && document.documentElement.clientWidth;
const screenHeight = typeof document !== 'undefined' && document.documentElement.clientHeight;

export default class ImageViewer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: props.index || 0
    };
    this.changeIndex = this.changeIndex.bind(this);
  }

  changeIndex(index) {
    this.setState({ index });
  }

  render() {
    const { maxZoomNum, zIndex, urls, gap, speed, onClose, footer, debug, screenWidth: width, screenHeight: height } = this.props;
    const { index } = this.state;

    // 获取底部元素
    function getFooter() {
      if (!footer) {
        return null;
      }
      if (footer instanceof Function) {
        const r = footer();
        return React.isValidElement(r) ? r : null;
      }
      if (React.isValidElement(footer)) {
        return footer;
      }

      return null;
    }

    const f = getFooter();

    return (
      <div className="fly-component-image-viewer-container" style={{ zIndex }}>
        <div className="viewer-container__cover" />
        <ListContainer
          screenWidth={width || screenWidth}
          screenHeight={height || screenHeight}
          changeIndex={this.changeIndex}
          onClose={onClose}
          debug={debug}
          urls={urls}
          maxZoomNum={maxZoomNum}
          gap={gap}
          speed={speed}
          index={index}
        />
        {f ? (
          <div className="viewer-container__pointer-box">{f}</div>
        ) : (
          <Pointer length={urls.length} index={index} changeIndex={this.changeIndex} />
        )}
      </div>
    );
  }
}
