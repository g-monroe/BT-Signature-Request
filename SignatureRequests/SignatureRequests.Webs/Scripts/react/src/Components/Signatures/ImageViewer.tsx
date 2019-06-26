import * as React from 'react';
import test from '../../FakeMaterials/testMadison.jpeg';

export interface IImageViewerProps {
    title?:string
}
 
export interface IImageViewerState {
    
}
 
class ImageViewer extends React.Component<IImageViewerProps, IImageViewerState> {
    state = {   }
    render() { 
        return ( 
            <div id = 'imageView'>
                <h1>{this.props.title || ''}</h1>
                <img src = {test} width = {'50%'} height = {'50%'}></img>
            </div>
         );
    }
}
 
export default ImageViewer;