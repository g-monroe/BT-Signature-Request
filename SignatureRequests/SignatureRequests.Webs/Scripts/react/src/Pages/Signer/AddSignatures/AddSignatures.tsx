import * as React from 'react';
import SignatureDropDown from '../../../Components/Signatures/SignatureDropDown';
import {SignatureExplanationTitle, SignatureExplanation, SignatureExplanationfooter} from "../../../Util/Text";
import { Layout, Divider } from 'antd';
import SignatureBox from '../../../Components/Signatures/SignatureBox';
import Paragraph from 'antd/lib/typography/Paragraph';
import ImageViewModal from '../../../Components/Signatures/ImageViewModal';
import {HowToSign} from '../../../Util/Text';
import ContextUserObject from '../../../Components/WrapperComponents/ContextUserObject';
import BoxType from '../../../Util/Enums/BoxType';

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
                                <SignatureDropDown type = {BoxType.DATE} userObject = {this.props.UserObject}></SignatureDropDown>
                                <SignatureDropDown type = {BoxType.INITIAL} userObject = {this.props.UserObject}></SignatureDropDown>
                                <SignatureDropDown type = {BoxType.SIGNATURE} userObject = {this.props.UserObject}></SignatureDropDown>
                                <SignatureDropDown type = {BoxType.TEXT} userObject = {this.props.UserObject}></SignatureDropDown>
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
                                <SignatureBox userObject = {this.props.UserObject}></SignatureBox>
                            </div>
                        </Layout.Content>
                    </Layout>
                </Layout>
                
            </>
         );
    }
}
 
export default AddSignatues;