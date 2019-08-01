import * as React from 'react';
import ContextUserObject from '../../../Components/WrapperComponents/ContextUserObject';
import './Send.css'
import UserEntity from '../../../Entities/UserEntity';
import FileViewer from '../../../Components/Request/FileViewer';
export interface IStep2Props {
    form: number;
    users:UserEntity[];
    userObject: ContextUserObject;
}
 
export interface IStep2State {
}
 
class Step2 extends React.Component<IStep2Props, IStep2State> {
    render() { 
        const { userObject, form, users } = this.props;
        return (  

            <>
            <div style = {{ display: "flex",
                            position: "relative",
                            border: "5px black",
                            height:'100%',
                            width:'100%',
                            flexDirection:'column',
                            justifyContent:'space-around',
                            alignItems:'center',
                            overflow:"auto"}}>
                <FileViewer parent={this}
                 userObject={userObject} form={form} users={users}/>
                 </div>
            </>
        );
    }
}
 
export default Step2;