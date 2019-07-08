import * as React from 'react';
import SignatureDropDown from '../../../Components/Signatures/SignatureDropDown';
import {SignatureExplanationTitle, SignatureExplanation, SignatureExplanationfooter} from "../../../Util/Text";
import { Layout, Divider } from 'antd';
import SignatureBox from '../../../Components/Signatures/SignatureBox';
import Paragraph from 'antd/lib/typography/Paragraph';
import ImageViewModal from '../../../Components/Signatures/ImageViewModal';
import {HowToSign} from '../../../Util/Text';
import { TypesOfBoxes } from '../../../Util/Enums/SignatureDropDown';
import ContextUserObject from '../../../Components/WrapperComponents/ContextUserObject';

export interface IAddSignatuesProps {
    UserObject:ContextUserObject
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
                        View your:
                            <div id = "ViewSigButtons">
                                <ImageViewModal title = "Your Signature" button = "Signature" content = {
                                        <img src = {"../../../FakeMaterials/testMadison.jpeg"} alt = "Signature"></img>
                                }></ImageViewModal>
                                <ImageViewModal title = "Your Initials" button = "Initials"></ImageViewModal>
                            </div>
                            <Divider></Divider>
                            {HowToSign}
                            <div id = "SigExample">
                                <SignatureDropDown type = {TypesOfBoxes.Date} UserObject = {this.props.UserObject}></SignatureDropDown>
                                <SignatureDropDown type = {TypesOfBoxes.Initial} UserObject = {this.props.UserObject}></SignatureDropDown>
                                <SignatureDropDown type = {TypesOfBoxes.Signature} UserObject = {this.props.UserObject}></SignatureDropDown>
                            </div>
                        </div>
                    </Layout.Sider>
                    <Layout>
                        <Layout.Header style = {{background:'#878a8f'}}>
                            <div id = "signaturePageHeader">
                                <h2>Electronic Signatures</h2>
                            </div>
                        </Layout.Header>
                        <Layout.Content>
                            <div id = 'signaturePageContent'> 
                                <div id = "SigPageText">
                                    <h3>{SignatureExplanationTitle}</h3>
                                    <Paragraph id = "SigPara">{SignatureExplanation}</Paragraph>
                                    <h4>{SignatureExplanationfooter}</h4>
                                </div>
                                <SignatureBox UserObject = {this.props.UserObject}></SignatureBox>
                            </div>
                        </Layout.Content>
                    </Layout>
                </Layout>
                
            </>
         );
    }
}
 
export default AddSignatues;