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

// sätt dessa i adressInterfacet i OrderContext
export interface PaymentKlarna {
    ssn: string;
    // name: string;
    // email: string;
    phone: string;
    street: string;
    zipcode: string;
    city: string;
}
interface Props {
    next(): void;
}
function PayKlarna(props: Props) {
    const { user } = useContext(UserContext);
    const { updatePaymentInfo } = useContext(CartContext);

    /* const onValuesChange = (values: any, allValues: any) => {
        console.log('klarna', allValues);
        updatePaymentInfo(allValues.klarna);
    }; */

    const onFinish = (values: any) => {
        console.log('Success:', values);
        updatePaymentInfo(values.klarna);
        props.next();
    };

    return (
        <Row style={formContainerStyle}>
            <Col span={24} style={columnStyle}>
                <h2>Billing information</h2>
                <Form
                    {...layout}
                    name='nest-messages'
                    validateMessages={validateMessages}
                    onFinish={onFinish}
                    initialValues={{
                        klarna: {
                            firstname: user?.firstname,
                            lastname: user?.lastname,
                            email: user?.email,
                        },
                    }}
                >
                    <Form.Item
                        name={['klarna', 'ssn']}
                        label='SSN'
                        rules={[
                            {
                                min: 10,
                                max: 10,
                                required: true,
                            },
                        ]}
                    >
                        <Input placeholder='YYMMDDXXXX' />
                    </Form.Item>
                    <Form.Item
                        name={['klarna', 'firstname']}
                        label='Firstname'
                        initialValue={user.firstname}
                        rules={[{ required: true }]}
                    >
                        <Input
                            defaultValue={user.firstname}
                            value={user.firstname}
                        >
                            {user.firstname}
                        </Input>
                    </Form.Item>
                    <Form.Item
                        name={['klarna', 'lastname']}
                        label='Lastname'
                        initialValue={user.lastname}
                        rules={[{ required: true }]}
                    >
                        <Input value={user.lastname} disabled />
                    </Form.Item>
                    <Form.Item
                        name={['klarna', 'email']}
                        label='Email'
                        initialValue={user.email}
                        rules={[{ type: 'email', required: true }]}
                    >
                        <Input value={user.email} disabled />
                    </Form.Item>
                    <Form.Item
                        name={['klarna', 'phone']}
                        label='Phone'
                        rules={[
                            {
                                min: 10,
                                max: 10,
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['klarna', 'street']}
                        label='Street'
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['klarna', 'zipcode']}
                        label='Zip-code'
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['klarna', 'city']}
                        label='City'
                        rules={[{ required: true }]}
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

export default PayKlarna;

const formContainerStyle: CSSProperties = {
    display: 'flex',
    width: '100%',
    margin: 'auto',
};

const columnStyle: CSSProperties = {
    marginTop: '3rem',
    marginBottom: '3rem',
};
