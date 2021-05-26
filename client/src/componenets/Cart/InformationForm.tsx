import { Form, Input, Button, Row, Col } from 'antd';
// import { Component, ContextType, CSSProperties, useContext } from 'react';
import { CSSProperties, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

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

// sätt dessa i adressInterfacet i OrderContext
export interface UserInfo {
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

export default function InformationForm(props: Props) {
    const { setAddress } = useContext(UserContext);

    const onValuesChange = (values: any, allValues: any) => {
        // const { updateUserInfo } = this.context;
        setAddress(allValues.user);
    };

    const onFinish = (values: any) => {
        console.log('Success:', values);
        props.next();
    };

    return (
        <Row style={formContainerStyle}>
            <Col span={24} style={columnStyle}>
                <h2>Your information</h2>
                <Form
                    {...layout}
                    name='nest-messages'
                    onValuesChange={onValuesChange}
                    validateMessages={validateMessages}
                    onFinish={onFinish}
                >
                    {/* <Form.Item name={['user', 'name']} label="Name" 
                    rules={[{ min: 2, required: true }]}>
                    <Input placeholder={'namnet på den som är inloggad som inte ska gå att ändra'}/>
                </Form.Item>
                <Form.Item name={['user', 'email']} label="Email" 
                    rules={[{ min: 5, type: 'email', required: true }]}>
                    <Input placeholder={'emailen på den som är inloggad som inte ska gå att ändra'}/>
                </Form.Item> */}
                    <Form.Item
                        name={['user', 'phone']}
                        label='Phone'
                        rules={[{ min: 10, max: 10, required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'street']}
                        label='Street'
                        rules={[{ min: 5, required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'zipcode']}
                        label='Zipcode'
                        rules={[{ min: 5, max: 5, required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'city']}
                        label='City'
                        rules={[{ min: 3, required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 5 }}>
                        <Button type='primary' htmlType='submit'>
                            Next
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
}

const formContainerStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'space-around',
    width: '100%',
    margin: 'auto',
};

const columnStyle: CSSProperties = {
    marginBottom: '3rem',
};
