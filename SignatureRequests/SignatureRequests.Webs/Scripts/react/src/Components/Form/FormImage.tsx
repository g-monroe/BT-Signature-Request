import React, { Component } from 'react';
import { Stage, Layer, Image } from 'react-konva';
import { Context } from 'konva/types/Context';

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
  
  componentDidMount(){
  }

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
      
        <div id = "PictureToWrap"style = {{position:'relative'}}>
        <img 
          src={src}
          onError={this.onError}
          style={{
            borderTopLeftRadius: "11px",
            borderBottomLeftRadius: "11px",
            padding: "0px",
            margin: "auto",
            paddingRight: "10px",
            paddingLeft: "10px",
            paddingTop: "10px",
            paddingBottom: "10px",
            display: "block",
            }}
        />
        </div>
    );
  }
}
export default FormImage;