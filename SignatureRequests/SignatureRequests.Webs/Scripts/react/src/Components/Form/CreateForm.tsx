import React, { RefObject } from "react";
import { Form as AntForm, Select, Table, Button, Input, Upload, Icon, message } from 'antd';
import "antd/dist/antd.css";
import { IFormHandler, FormHandler} from "../../Handlers/FormHandler";
import UserEntity from "../../Entities/UserEntity";
import { Form, InjectedFormikProps, withFormik } from "formik";
import FormRequest from "../../Entities/FormRequest";
import FormEntity from "../../Entities/FormEntity";
import * as yup from 'yup';
import { StringLiteral, file } from "@babel/types";
import TextArea from "antd/lib/input/TextArea";
const FileViewer = require('react-file-viewer');
const { Option } = Select;
const FormItem = AntForm.Item;

interface ICreateProps {
   currentUser?: UserEntity;
   handleSave: (data: FormRequest) => Promise<FormEntity>;
}

interface ICreateState {
    FilePath: string;
    Title: string;
    Description: string;
    CreateDate?: string;
    UserId?: number;
    
}

interface ICreateFormState {
  fileInput?: any;
  loading: boolean;
  numPages?: number;
  pageNumber: number;
}

const yupValidation = yup.object().shape<ICreateState>({ //change requirements
  FilePath: yup
    .string()
    .required()
    .max(45)
    .label("FilePath"),
  Title: yup
    .string()
    .required()
    .max(45)
    .label("Title"),
  Description: yup
    .string()
    .required()
    .label("Description"),
  CreateDate: yup
    .string()
 
});

export default class Create extends React.PureComponent<InjectedFormikProps<ICreateProps, ICreateState>, ICreateFormState> {
  
  state: ICreateFormState = {
    loading: false,
    pageNumber: 1
  };
  
  getValidateStatus = (value: any) => {
    return value ? "error" :"success";
  };

  getBase64 = (img: any, callback: any) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      this.getBase64(info.file.originFileObj, 
        this.setState({
          loading: false,
        }),
      );
    }
  };
  
  onChange = async (info: any) => {
    
    let fileList = [...info.fileList];
    fileList=fileList.slice(-1);
    
    fileList = fileList.map(file => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });
    
    (await this.setState({ fileInput : fileList }));
    console.log(this.state.fileInput!);
    
  };

  onDocumentLoadSuccess = (numPages: any) => {
    this.setState({ numPages: numPages });
  };

  render() {
    const fileInput = this.state.fileInput;

    const {
      values,
      errors,
      handleSubmit,
      handleChange,
      isSubmitting
    } = this.props;
    
    const props = {
      // name: 'file',
      // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76', //add upload url
      // headers: {
      //   authorization: 'authorization-text',
      // },
      onChange: this.onChange,
      beforeUpload: (file: any) : boolean => {
        this.setState({
          fileInput: file
        });
        return false;
      },
      fileInput
    };
      return (
        <>
        <Form onSubmitCapture={handleSubmit}>
            <div className="inline-flex-container">
              <FormItem
                className="inline-item"
                label="FilePath"
                validateStatus={this.getValidateStatus(errors.FilePath)}
                help={errors.FilePath}
                required
              >
                <Input
                  name="FilePath"
                  value={values.FilePath}
                  placeholder="Filepath"
                  onChange={handleChange}
                />
              </FormItem>
              
              <FormItem
                className="inline-item"
                label="Title"
                validateStatus={this.getValidateStatus(errors.Title)}
                help={errors.Title}
                required
              >
                <Input
                  name="Title"
                  value={values.Title}
                  placeholder="Title"
                  onChange={handleChange}
                />
              </FormItem>

            </div>
            <FormItem>
            <Upload 
            {...props}
            fileList={this.state.fileInput!}
            >
              <Button>
                <Icon type="upload" /> Select File
              </Button>
            </Upload>
            </FormItem>

            <FormItem>
             <FileViewer
             fileType={'pdf'}
             filePath={this.state.fileInput ? this.state.fileInput[0].name :"../Scripts/react/src/Components/Form/Thisisatestpdf.pdf"}
             />
            </FormItem>

            <FormItem
              label="Description"
              validateStatus={this.getValidateStatus(errors.Description)}
              help={errors.Description}
              required
            >
              <TextArea
                value={values.Description}
                rows={4}
                name="Description"
                onChange={handleChange}
              />
            </FormItem>
            
            <FormItem>
              <Button
                name="submit"
                type="primary"
                loading={isSubmitting}
                htmlType="submit"
              >
                Save
              </Button>
            </FormItem>
            
            
          </Form>
          </>
      );
    
  }
}

export const CreateForm = withFormik<
  ICreateProps,
  ICreateState
>({
  mapPropsToValues: props => ({

    FilePath: "",
    Title:  "",
    Description:  "",
    CreateDate:  new Date().toLocaleString(),
    UserId:  props.currentUser!.id
  }),
  validationSchema: yupValidation,
  handleSubmit: async (values, { setSubmitting, props }) => {
    setSubmitting(true);
    props.handleSave(new FormRequest(values));
    setSubmitting(false);
  }
})(Create);