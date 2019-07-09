import React from 'react';
import viewer from './components/image-viewer/index';

class App extends React.Component {
  constructor() {
    super();

    this.preview = this.preview.bind(this);
  }
  componentDidMount() {
    this.__preview();
  }
  preview() {
    this.__preview();
  }
  // 预览图片
  __preview() {
    viewer({
      urls: [
        '/assets/pexels-photo-273222.jpeg',
        '/assets/antd-pro.png',
        '/assets/pexels-photo-273222.jpeg',
        '/assets/antd-pro.png',
        '/assets/pexels-photo-273222.jpeg',
        '/assets/antd-pro.png'
      ]
    });
  }
  render() {
    return (
      <center>
        <h1 onClick={this.preview}>点击预览</h1>
      </center>
    );
  }
}

export default App;
