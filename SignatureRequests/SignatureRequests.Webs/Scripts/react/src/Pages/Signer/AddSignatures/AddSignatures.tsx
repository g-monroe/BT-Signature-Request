import * as React from 'react';
import SignatureDropDown from '../../../Components/Signatures/SignatureDropDown';
import { Layout } from 'antd';
import SignatureBox from '../../../Components/Signatures/SignatureBox';

export interface IAddSignatuesProps {
    
}
 
export interface IAddSignatuesState {
    
}
 
class AddSignatues extends React.Component<IAddSignatuesProps, IAddSignatuesState> {

    render() { 
        return ( 
            <>
                <Layout style = {{height:'100%'}}>
                    <Layout.Sider style = {{background:'#878a8f'}}>
                        <div id = "signaturePageSider">
                            sider
                        </div>
                    </Layout.Sider>
                    <Layout>
                        <Layout.Header style = {{background:'#474e55'}}>
                            <div id = "signaturePageHeader">
                                <h1>Add signatures to your profile</h1>
                            </div>
                        </Layout.Header>
                        <Layout.Content>
                            <div id = 'signaturePageContent'> 
                                <SignatureBox></SignatureBox>
                            </div>
                        </Layout.Content>
                    </Layout>
                </Layout>
                
            </>
         );
    }
}
 
export default AddSignatues;