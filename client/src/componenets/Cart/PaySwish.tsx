import { CSSProperties, useContext } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { CartContext } from '../../contexts/CartContext';
import { UserContext } from '../../contexts/UserContext';

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
};
interface Props {
  next(): void;
};

function PaySwish(props: Props) {

  const { updatePaymentInfo } = useContext(CartContext);
  const { address } = useContext(UserContext);

  const onFinish = (values: any) => {
    console.log('Success:', values);
    updatePaymentInfo(values.swish);
    props.next();
  };

  return (
    <Row style={formContainerStyle}>
      <Col span={24} style={columnStyle}>
        <h2>Payment information</h2>
        <Form
          {...layout}
          name='nest-messages'
          validateMessages={validateMessages}
          onFinish={onFinish}
        >
          <Form.Item
            name={['swish', 'phone']}
            label='Phone'
            rules={[
              {
                min: 10,
                max: 10,
                required: true,
              },
            ]}
          >
            <Input defaultValue={address.phone} />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 7,
            }}
          >
            <Button type='primary' htmlType='submit'>
              Next
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
};

export default PaySwish;

const formContainerStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'space-around',
  width: '100%',
  margin: 'auto',
};

const columnStyle: CSSProperties = {
  marginTop: '3rem',
  marginBottom: '3rem',
};