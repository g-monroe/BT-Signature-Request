import * as React from 'react';
import {Radio} from 'antd';


export interface IButtonSelectProps {
    options:string[]
    onChange:(e:string) => void
}
 
export interface IButtonSelectState {
    
}
 
class ButtonSelect extends React.Component<IButtonSelectProps, IButtonSelectState> {

    static defaultProps = {
        options: ['Option1','Option2']
    }
    render() { 

        const buttons = this.props.options.map((e) => (<Radio.Button key = {e} value = {e}>{e}</Radio.Button>))

        return ( 
            
            <Radio.Group onChange = {(e) =>this.props.onChange(e.target.value)} defaultValue = {this.props.options![0]} buttonStyle = 'solid'>
                 {buttons}
            </Radio.Group>
            

         );
    }
}
 
export default ButtonSelect;