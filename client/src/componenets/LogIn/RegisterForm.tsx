import { Component, CSSProperties } from "react";
import { Form, Input, Button } from 'antd';

interface Props {
    toggleForm: (value: boolean) => void
}

class RegisterForm extends Component<Props> {

    onFinish = (values: any) => {
        console.log('Success:', values);
        this.props.toggleForm(false)
    };

    onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    render() {
        return (
            <Form
                name="login"
                initialValues={{
                    remember: true,
                }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
            >
                <Form.Item
                    name="fullname"
                    style={{ marginBottom: '0' }}
                >
                    <Form.Item
                        name="firstname"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your firstname',
                            },
                        ]}
                        style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                    >
                        <Input
                            placeholder='Firstname'
                            style={{ padding: '.8rem' }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="lastname"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your lastname',
                            },
                        ]}
                        style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                    >
                        <Input
                            placeholder='Lastname'
                            style={{ padding: '.8rem' }}
                        />
                    </Form.Item>
                </Form.Item>

                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your e-mail',
                        },
                    ]}
                >
                    <Input
                        placeholder='E-mail'
                        style={{ padding: '.8rem' }}
                    />
                </Form.Item>

                <Form.Item name='password-control'>
                    <Form.Item
                        name='password'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password',
                            },
                        ]}
                        style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                    >
                        <Input.Password
                            placeholder='Password'
                            style={{ padding: '.8rem' }}
                        />
                    </Form.Item>
                    <Form.Item
                        name='repeat-password'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password',
                            },
                        ]}
                        style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                    >
                        <Input.Password
                            placeholder='Repeat password'
                            style={{ padding: '.8rem' }}
                        />
                    </Form.Item>

                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={registerButton}
                    >
                        Register
                    </Button>
                </Form.Item>
                <h3 style={cancelButton} onClick={() => this.props.toggleForm(false)}>
                    Cancel
                </h3>
            </Form>
        )
    }
}

const registerButton: CSSProperties = {
    width: '100%',
    fontSize: '1rem',
    height: '2.5rem',
}

const cancelButton: CSSProperties = {
    color: '#1890ff',
    fontSize: '1rem',
    fontWeight: 500,
    textAlign: 'center',
    marginBottom: '1rem',
    cursor: 'pointer',
}

export default RegisterForm