import React, { RefObject } from "react";
import { Form as AntForm, Select, Table, Button, Input, Upload, Icon, message } from 'antd';
import "antd/dist/antd.css";
import { IFormHandler, FormHandler} from "../../Handlers/FormHandler";
import UserEntity from "../../Entities/UserEntity";
import { Form, InjectedFormikProps, withFormik } from "formik";
import FormRequest from "../../Entities/FormRequest";
import FormEntity from "../../Entities/FormEntity";
import * as yup from 'yup';
import { StringLiteral } from "@babel/types";
import TextArea from "antd/lib/input/TextArea";
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
}


const yupValidation = yup.object().shape<ICreateState>({
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
  static defaultProps = {
    
  };
  state: ICreateFormState = {
    loading: false
  };
  async componentDidMount() {
    this.setState({
    });
  }
  
  // handleDelete = async () => {
  //   if (this.props.data.id) {
  //     await this.props.handleDelete(this.props.data.id);
  //   }
  // };
 
  getValidateStatus = (value: any) => {
    return !!value ? "error" :"success";
  };

  getBase64 = (img: any, callback: any) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
  beforeUpload = (file: any) => {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
  }

  handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, 
        this.setState({
          fileInput: this.state.fileInput,
          loading: false,
        }),
      );
    }
  };
  
  onChange = (info: any) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
      this.setState({fileInput: info.file })
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
    
  };
  render() {
    
    const {
      values,
      errors,
      handleSubmit,
      handleChange,
      isSubmitting
    } = this.props;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    
    const props = {
      name: 'file',
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      headers: {
        authorization: 'authorization-text',
      },
      onChange: this.onChange,
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
                  onChange={this.handleChange}
                />
              </FormItem>

            </div>
            <FormItem>
            <Upload 
            {...props}
            >
              <Button>
                <Icon type="upload" /> Click to Upload
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