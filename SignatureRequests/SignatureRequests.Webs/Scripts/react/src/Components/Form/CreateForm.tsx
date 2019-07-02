import React from "react";
import { Form as AntForm, Button, Input, Upload, Icon, } from 'antd';
import "antd/dist/antd.css";
import UserEntity from "../../Entities/UserEntity";
import { Form, InjectedFormikProps, withFormik } from "formik";
import * as yup from 'yup';
import TextArea from "antd/lib/input/TextArea";
const FileViewer = require('react-file-viewer');
const FormItem = AntForm.Item;

interface ICreateProps {
   currentUser?: UserEntity;
   handleSave: (data: any) => Promise<void>;
}

interface ICreateState {
    FileList?: FormData;
    FilePath: string;
    Title: string;
    Description: string;
    CreateDate?: Date;
    UserId?: number;
    
}

interface ICreateFormState {
  fileInput?: any;
  loading: boolean;
  numPages?: number;
  pageNumber: number;
}

const yupValidation = yup.object().shape<ICreateState>({ 
  FilePath: yup
    .string()
    .required()
    .label("FilePath"),
  Title: yup
    .string()
    .required()
    .max(255)
    .label("Title"),
  Description: yup
    .string()
    .required()
    .max(400)
    .label("Description")
 
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

      onChange: async (info: any) => {
        let fileList = [...info.fileList];
        fileList=fileList.slice(-1);
        fileList = fileList.map(file => {
          if (file.response) {
            file.url = file.response.url;
          }
          return file;
        });
        let path: string = '../assets/v1/documents/'
        values.FilePath= path.concat(fileList[0].name);
        values.FileList= fileList[0];
        this.setState({ fileInput : fileList });
      },

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
                Upload
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
    FileList: new FormData(),
    FilePath: "",
    Title:  "",
    Description:  "",
    CreateDate:  new Date(),
    UserId:  props.currentUser!.id
  }),
  validationSchema: yupValidation,
  handleSubmit: async (values, { setSubmitting, props }) => {
    setSubmitting(true);
    (await props.handleSave(values));
    setSubmitting(false);
  }
})(Create);