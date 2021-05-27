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
    string: {
        len: '${label} must be ${len} characters',
        range: '${label} must be between ${min} and ${max} characters',
    },
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
                    initialValues={{ swish: { phone: address.phone } }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name={['swish', 'phone']}
                        label='Phone'
                        rules={[
                            {
                                type: 'string',
                                len: 10,
                                required: true,
                            },
                            () => ({
                                validator(_, value) {
                                    const regex = /^[0-9]*$/;
                                    if (regex.test(value)) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error(
                                            'Phone can only contain digits'
                                        )
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input />
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
    );
}

export default PaySwish;

const formContainerStyle: CSSProperties = {
    width: '100%',
};

const columnStyle: CSSProperties = {
    marginTop: '3rem',
    marginBottom: '3rem',
};
