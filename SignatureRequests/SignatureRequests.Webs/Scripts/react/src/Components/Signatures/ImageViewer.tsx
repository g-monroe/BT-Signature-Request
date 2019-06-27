import * as React from 'react';

export interface IImageViewerProps {
    title?:string

}
 
export interface IImageViewerState {
    
}
 
class ImageViewer extends React.Component<IImageViewerProps, IImageViewerState> {
    
    render() { 
        return ( 
            <div id = 'imageView'>
                <h1>{this.props.title || ''}</h1>
                <img src = {require ('../../FakeMaterials/testMadison.jpeg')} width = {'50%'} height = {'50%'} alt = "Display"></img>
            </div>
         );
    }
}
 
export default ImageViewer;