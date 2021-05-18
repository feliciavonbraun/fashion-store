import { Component, ContextType, CSSProperties } from 'react'
import { Form, Input, Button, Row, Col } from 'antd';
import { CartContext } from '../../contexts/CartContext';

const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
export interface PaymentSwish {
  phone: string;
}
interface Props {
  next(): void;
}
class PaySwish extends Component<Props> {
  context!: ContextType<typeof CartContext>
  static contextType = CartContext;

  onFinish = (values: any) => {
    console.log('Success:', values);
    const { updatePaymentInfo } = this.context;
    updatePaymentInfo(values.swish);
    this.props.next();
  };

  render() {
      return (
        <CartContext.Consumer>
              {({ userInfo }) => {
                return (
                  <Row style={formContainerStyle}>
                    <Col span={24} style={columnStyle}>
                        <h2>Payment information</h2>
                        <Form {...layout} 
                          name="nest-messages" 
                          validateMessages={validateMessages}
                          onFinish={this.onFinish}
                          initialValues={{
                            swish: {
                              phone: userInfo?.phone
                            }
                          }}>
                    
                        <Form.Item name={['swish', 'phone']} label="Phone" 
                            rules={[{ min: 10, max: 10, required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 7 }}>
                          <Button type="primary" htmlType="submit">
                            Next
                          </Button>
                        </Form.Item>
                        </Form>
                    </Col>
                </Row>
                );
              }}
        </CartContext.Consumer>
      )
    }
}

export default PaySwish;

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