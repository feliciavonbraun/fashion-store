import { Form, Input, Button, Row, Col } from 'antd';
import { Component, ContextType, CSSProperties } from 'react';
import { CartContext } from '../../contexts/CartContext';

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

export interface UserInfo {
  name: string;
  email: string;
  phone: string;
  street: string;
  zipcode: string;
  city: string;
}
interface Props {
  next(): void;
}

class InformationForm extends Component<Props> {
  context!: ContextType<typeof CartContext>
  static contextType = CartContext;

  onValuesChange = (values: any, allValues: any) => {
    const { updateUserInfo } = this.context;
    updateUserInfo(allValues.user);
  };

  onFinish = (values: any) => {
    console.log('Success:', values);
    this.props.next();
  };

  render() {
      return (
          <Row style={formContainerStyle}>
            <Col span={24} style={columnStyle}>
              <h2>Your information</h2>
              <Form {...layout} 
                name="nest-messages" 
                onValuesChange={this.onValuesChange} 
                validateMessages={validateMessages}
                onFinish={this.onFinish}>
                <Form.Item name={['user', 'name']} label="Name" 
                    rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['user', 'email']} label="Email" 
                    rules={[{ type: 'email', required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['user', 'phone']} label="Phone" 
                    rules={[{ min: 10, max: 10, required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['user', 'street']} label="Street" 
                    rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['user', 'zipcode']} label="Zipcode" 
                    rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['user', 'city']} label="City" 
                    rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 5 }}>
                  <Button type="primary" htmlType="submit">
                    Next
                  </Button>
                </Form.Item>
              </Form>
            </Col>
        </Row>
      );
    };
  }

  export default InformationForm;

  const formContainerStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'space-around',
    width: '100%',
    margin: 'auto'
}

const columnStyle: CSSProperties = {
    marginTop: '3rem',
    marginBottom: '3rem',
}