import { Form, Input, Button, Row, Col } from 'antd';
import { CSSProperties, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} is required',
    types: {
        email: '${label} is not a valid email',
        number: '${label} must only contain numbers',
    },
    string: {
        len: '${label} must be ${len} characters',
    },
    number: {
        range: '${label} must be between ${min} and ${max} characters',
        len: '${label} must be ${len} characters',
    },
};

export interface UserInfo {
    phone: string;
    street: string;
    zipcode: string;
    city: string;
}
interface Props {
    next(): void;
}

export default function InformationForm(props: Props) {
    const { setAddress, user } = useContext(UserContext);

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
                    initialValues={{
                        user: {
                            name: user?.firstname + ' ' + user?.lastname,
                            email: user?.email,
                        },
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name={['user', 'name']}
                        label='Name'
                        rules={[{ min: 2, required: true }]}
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'email']}
                        label='Email'
                        rules={[{ min: 5, type: 'email', required: true }]}
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'phone']}
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
                        name={['user', 'street']}
                        label='Street'
                        rules={[{ min: 5, required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'zipcode']}
                        label='Zipcode'
                        rules={[
                            {
                                type: 'string',
                                len: 5,
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
                                            'Card number can only contain digits'
                                        )
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'city']}
                        label='City'
                        rules={[{ type: 'string', required: true }]}
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
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: 'auto',
    marginLeft: 'auto',
};

const columnStyle: CSSProperties = {
    marginBottom: '3rem',
};
