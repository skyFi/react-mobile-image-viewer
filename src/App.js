import React from 'react';
import viewer from './components/image-viewer/src/index';
import './components/image-viewer/src/ImageViewer.css';

class App extends React.Component {
  constructor() {
    super();

    this.preview = this.preview.bind(this);
  }
  preview() {
    this.__preview();
  }
  // 预览图片
  __preview() {
    viewer({
      urls: [
        'assets/of.png',
        'assets/pexels-photo-273222.jpeg',
        'assets/pexels-photo-775415.jpeg',
        'assets/pexels-photo-459793.jpeg',
        'assets/pexels-photo-533405.jpeg',
        'assets/pexels-photo-459688.jpeg',
        'assets/pexels-photo-416343.jpeg',
        'assets/pexels-photo-277615.jpeg'
      ],
      debug: true
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
