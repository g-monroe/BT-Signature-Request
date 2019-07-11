import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './FormImage.css';
interface IFormImageProps{
    src: string;
    pageNum: number;
    failedSrc:string;
}
interface IFormImageState{
    src: string;
    errored:boolean;
}
class FormImage extends React.Component<IFormImageProps, IFormImageState> {

    state:IFormImageState = {
      src: this.props.src,
      errored: false,
    };
  

  onError = () => {
    if (!this.state.errored) {
      this.setState({
        src: this.props.failedSrc,
        errored: true,
      });
    }
  }

  render() {
    const { src } = this.state;

    return (
      <div>
        <img 
          src={src}
          onError={this.onError}
          style={{width: "35%",
            height: "35%",
            borderTopLeftRadius: "11px",
            borderBottomLeftRadius: "11px",
            padding: "0px",
            margin: "auto",
            paddingRight: "10px",
            paddingLeft: "10px",
            paddingTop: "10px",
            paddingBottom: "10px",
            display: "block"
            }}
        />
      </div>
    );
  }
}
export default FormImage;