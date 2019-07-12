import * as React from 'react';
import ContextUserObject from '../../../Components/WrapperComponents/ContextUserObject';
import FileViewer from '../../../Components/Form/FileViewer';

export interface IEditProps {
   userObject: ContextUserObject;
}
 
export interface IEditState {
    
}
 
class Edit extends React.Component<IEditProps, IEditState> {

    render() { 
        return (  
            <>
            <FileViewer
                userObject={this.props.userObject}
            >
            </FileViewer>
            </>
        );
    }
}
 
export default Edit;