import React, { Component } from 'react';

class Pointer extends Component {
  render() {
    const { length = 1, changeIndex = () => {}, index = 0 } = this.props;

    let i = 0,
      items = [];
    if (length >= 6) {
      items.push(<div className="viewer-container__pointer-box__nums" key="nums">{`${index + 1}/${length}`}</div>);
    } else {
      for (i; i < length; i++) {
        if (i === index) {
          items.push(
            <span onClick={changeIndex.bind(null, i)} key={i} className="viewer-container__pointer-box__pointer on" />
          );
        } else {
          items.push(
            <span onClick={changeIndex.bind(null, i)} key={i} className="viewer-container__pointer-box__pointer" />
          );
        }
      }
    }

    return <div className="viewer-container__pointer-box">{items}</div>;
  }
}

export default Pointer;
