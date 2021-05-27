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
function PayCard(props: Props) {
    const { updatePaymentInfo } = useContext(CartContext);
    const { user } = useContext(UserContext);

    const onValuesChange = (values: any, allValues: any) => {
        console.log('pay', allValues);
        updatePaymentInfo(allValues.card);
    };

    const onFinish = (values: any) => {
        console.log('Success:', values);
        props.next();
    };

    return (
        <Row style={formContainerStyle}>
            <Col span={24} style={columnStyle}>
                <h2>Card details</h2>
                <Form
                    {...layout}
                    name='nest-messages'
                    onValuesChange={onValuesChange}
                    initialValues={{
                        card: {
                            name: user?.firstname + ' ' + user?.lastname,
                        },
                    }}
                    validateMessages={validateMessages}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name={['card', 'cardno']}
                        label='Card number'
                        rules={[{ min: 13, max: 19, required: true }]}
                    >
                        <Input placeholder='XXXX XXXX XXXX XXXX' />
                    </Form.Item>
                    <Form.Item
                        name={['card', 'expdate']}
                        label='Expiry date'
                        rules={[{ min: 5, max: 5, required: true }]}
                    >
                        <Input placeholder='MM/YY' />
                    </Form.Item>
                    <Form.Item
                        name={['card', 'name']}
                        label='Name on card'
                        rules={[{ min: 2, required: true }]}
                    >
                        <Input value={`${user?.firstname} ${user?.lastname}`} />
                    </Form.Item>
                    <Form.Item
                        name={['card', 'cvc']}
                        label='CVC/CCV'
                        rules={[{ min: 3, max: 3, required: true }]}
                    >
                        <Input placeholder='e.g. 123' />
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 7 }}>
                        <Button type='primary' htmlType='submit'>
                            Next
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
}

export default PayCard;

const formContainerStyle: CSSProperties = {
    width: '100%',
};

const columnStyle: CSSProperties = {
    marginTop: '3rem',
    marginBottom: '3rem',
};
