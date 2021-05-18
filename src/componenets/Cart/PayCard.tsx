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
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
export interface PaymentCard {
  cardNumber: string;
  expDate: string;
  cardName: string;
  cvc: string;
}
interface Props {
  next(): void;
}
class PayCard extends Component<Props> {
  context!: ContextType<typeof CartContext>
  static contextType = CartContext;

  onValuesChange = (values: any, allValues: any) => {
    console.log('pay', allValues);
    const { updatePaymentInfo } = this.context;
    updatePaymentInfo(allValues.card);
  };

  onFinish = (values: any) => {
    console.log('Success:', values);
    this.props.next();
  };

  render() {
    return (
      <Row style={formContainerStyle}>
        <Col span={24} style={columnStyle}>
          <h2>Card details</h2>
          <Form {...layout} 
            name="nest-messages" 
            onValuesChange={this.onValuesChange} 
            validateMessages={validateMessages}
            onFinish={this.onFinish}>
            <Form.Item name={['card', 'cardno']} label="Card number"  
                rules={[{ min: 13, max: 19, required: true }]}>
                <Input placeholder="XXXX XXXX XXXX XXXX"/>
            </Form.Item>
            <Form.Item name={['card', 'expdate']} label="Expiry date" 
                rules={[{ required: true }]}>
                <Input placeholder="MM/YY"/>
            </Form.Item>
            <Form.Item name={['card', 'name']} label="Name on card" 
                rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={['card', 'cvc']} label="CVC/CCV" 
                rules={[{ required: true }]}>
                <Input placeholder="e.g. 123"/>
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
  }
}

export default PayCard;

const formContainerStyle: CSSProperties = {
    display: 'flex',
    // justifyContent: 'space-around',
    // alignItems: 'space-around',
    width: '100%',
    //margin: 'auto'
}

const columnStyle: CSSProperties = {
    marginTop: '3rem',
    marginBottom: '3rem',
}