import React, { Component } from 'react';
import './App.css';

class FileUpload extends Component {
  constructor() {
    super();
    this.state = {
      uploadValue: 0
    };
  }

  render() {
    return (
      <div>
        <div className="ctn-progress">
          <progress className="progress" value={this.state.uploadValue} max="100">
            {this.state.uploadValue} %
          </progress>
        </div>
        <div className="center m-top">
          <label className="fileContainer">
            <i className="fa fa-cloud-upload"></i> Click here to trigger the file uploader!
            <input type="file" onChange={ this.props.onUpload } />
          </label>
        </div>
      </div>
    );
  }
}

export default FileUpload;