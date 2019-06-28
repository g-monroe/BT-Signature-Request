import * as React from 'react';
import {Radio} from 'antd';


export interface IButtonSelectProps {
    options: any
    onChange:(e:string) => void
}
 
export interface IButtonSelectState {
    names?: string[]
}

enum defaultPropEnum {
    'Option1',
    'Option2'
}
 
class ButtonSelect extends React.Component<IButtonSelectProps, IButtonSelectState> {

    static defaultProps = {
        options: defaultPropEnum
    }
    
    state : IButtonSelectState = {
        names: []
    }

    enumToStrings = () =>{
        let data = [] as string[];
        const options = this.props.options;

        for (var n in options){
            if(typeof options[n] ==='string'){
                data.push(options[n])
            }
        }
        return data;
    }

    render() { 
        if(this.state.names){
            const buttons = this.state.names.map((e) => (<Radio.Button key = {e} value = {e}>{e}</Radio.Button>))
            return ( 
                <Radio.Group onChange = {(e) =>this.props.onChange(e.target.value)} defaultValue = {this.props.options![0]} buttonStyle = 'solid'>
                    {buttons}
                </Radio.Group>
         );
        }
    }

    componentDidMount() {
        this.setState({
            names:this.enumToStrings()
        })
    }
}
 
export default ButtonSelect;