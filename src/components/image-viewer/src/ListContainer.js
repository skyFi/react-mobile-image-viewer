import React, { PureComponent } from 'react';

import ImageContainer from './ImageContainer';

// 快速拖动时间限制
const DEFAULT_TIME_DIFF = 200;

class ListContainer extends PureComponent {
  constructor() {
    super();
    this.isNeedSpring = false;

    this.state = {
      left: 0
    };

    this.easing = this.easing.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
  }

  componentWillMount() {
    const { screenWidth, urls, index, gap } = this.props;

    this.length = urls.length;
    this.perDistance = screenWidth + gap;
    this.maxLeft = this.perDistance * (this.length - 1);
    this.isNeedSpring = false;

    this.setState({
      left: -this.perDistance * index
    });
  }

  componentWillReceiveProps(nextProps) {
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
  easing(distance) {
    const t = distance;
    const b = 0;
    const d = this.props.screenWidth; // 允许拖拽的最大距离
    const c = d / 2.5; // 提示标签最大有效拖拽距离

    return c * Math.sin((t / d) * (Math.PI / 2)) + b;
  }

  handleStart() {
    this.props.debug && console.info('ListContainer handleStart');
    this.startLeft = this.state.left;
    this.startTime = new Date().getTime();
    this.isNeedSpring = false;
  }

  handleMove(diffX) {
    this.props.debug && console.info('ListContainer handleStart diffX = %s', diffX);
    let nDiffx = diffX;
    // 限制最大 diffx 值
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

  handleEnd(isAllowChange) {
    let index;
    const diffTime = new Date().getTime() - this.startTime;
    this.props.debug &&
      console.info('handleEnd %s', isAllowChange, diffTime, this.state.left, this.startLeft, this.props.index);
    // 快速拖动情况下切换图片
    if (isAllowChange && diffTime < DEFAULT_TIME_DIFF) {
      if (this.state.left < this.startLeft) {
        index = this.props.index + 1;
      } else {
        index = this.props.index - 1;
      }
    } else {
      index = Math.abs(Math.round(this.state.left / this.perDistance));
    }

    // 处理边界情况
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

  render() {
    const { maxZoomNum, screenWidth, screenHeight, urls, speed, onClose, debug, onOpacity, doubleTap } = this.props;

    const { left } = this.state;

    const defaultStyle = {};

    if (this.isNeedSpring) {
      const duration = `${speed}ms`;
      defaultStyle.WebkitTransitionDuration = duration;
      defaultStyle.transitionDuration = duration;
    }
    const translate = `translate3d(${left}px, 0, 0)`;
    defaultStyle.WebkitTransform = translate;
    defaultStyle.transform = translate;

    return (
      <div className="viewer-container__viewer-list-container" style={defaultStyle}>
        {/* 这里使用 index 作为 key，是因为可能存在同一张图片在预览中 */
        urls.map((item, i) => (
          <ImageContainer
            key={i} // eslint-disable-line
            src={item}
            debug={debug}
            doubleTap={doubleTap}
            maxZoomNum={maxZoomNum}
            handleStart={this.handleStart}
            handleMove={this.handleMove}
            handleEnd={this.handleEnd}
            onOpacity={onOpacity}
            onClose={onClose}
            left={this.perDistance * i}
            screenWidth={screenWidth}
            screenHeight={screenHeight}
          />
        ))}
      </div>
    );
  }
}

export default ListContainer;
