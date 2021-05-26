import { Button, Radio, Row, Form } from 'antd';
import { CSSProperties, useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { DeliveryContext } from '../../contexts/DeliveryContext';

interface Props {
  next(): void;
};

function DeliverySelection(props: Props) {
  const { allDeliveryMethods, calculateDeliveryDay } = useContext(DeliveryContext);
  const { setDeliveryMethod } = useContext(CartContext);

  const handleChange = (e: any) => {
    const method = e.target.value;
    setDeliveryMethod(method);
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
    props.next();
  };

  return (
    <Row style={deliveryContainer}>
      <h2>
        Delivery
      </h2>
      <Form onFinish={onFinish}>
        <Form.Item name="Delivery Option" rules={[{ required: true }]}>
          <Radio.Group onChange={handleChange}>
            {allDeliveryMethods.map(item =>
              <Radio value={item} style={{ marginTop: '2rem' }}>
                <span style={deliveryCompanyStyle}>{item.company}</span>
                <br />
                <span style={deliveryTextStyle}>{'Delivery on ' + calculateDeliveryDay(item.time)}</span>
                <br />
                <span style={deliveryTextStyle}>{item.price + ' kr '}</span>
              </Radio>
            )};
          </Radio.Group>
        </Form.Item>
        <Button type="primary" htmlType='submit' style={buttonStyle}>
          Next
        </Button>
      </Form>
      <br />
    </Row>
  )
};

export default DeliverySelection;

const deliveryContainer: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  width: '90%',
  margin: 'auto',
  paddingBottom: '3rem'
};

const buttonStyle: CSSProperties = {
  marginTop: '3rem',
  width: '4rem'
};

const deliveryTextStyle: CSSProperties = {
  marginTop: '1rem',
  marginRight: '4rem',
  color: '#666666',
};

const deliveryCompanyStyle: CSSProperties = {
  fontWeight: 'bold',
};