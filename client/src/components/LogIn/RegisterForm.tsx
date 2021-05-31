import { CSSProperties, useContext, useEffect } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { NewUser, UserContext } from '../../contexts/UserContext';

interface Props {
    toggleForm: (value: boolean) => void;
}

function RegisterForm(props: Props) {
    const { registerUser, emailResponse, setEmailResponse } =
        useContext(UserContext);

    useEffect(() => {
        if (emailResponse === 'approved') {
            props.toggleForm(false);
            setEmailResponse('noData');
        }
    }, [props, emailResponse, setEmailResponse]);

    const onFinish = (form: any) => {
        const user: NewUser = {
            firstname: form.firstname,
            lastname: form.lastname,
            email: form.email,
            adminRequest: form.adminRequest,
            password: form.password,
            role: 'user',
        };
        registerUser(user);
    };

    return (
        <Form
            name='login'
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <Form.Item
                name='firstname'
                rules={[
                    {
                        required: true,
                        message: 'Please input your firstname',
                    },
                ]}
                style={{
                    display: 'inline-block',
                    width: 'calc(50% - 8px)',
                }}
            >
                <Input placeholder='Firstname' style={{ padding: '.8rem' }} />
            </Form.Item>
            <Form.Item
                name='lastname'
                rules={[
                    {
                        required: true,
                        message: 'Please input your lastname',
                    },
                ]}
                style={{
                    display: 'inline-block',
                    width: 'calc(50% - 8px)',
                    margin: '0 8px',
                }}
            >
                <Input placeholder='Lastname' style={{ padding: '.8rem' }} />
            </Form.Item>

            <Form.Item
                name='email'
                rules={[
                    {
                        type: 'email',
                        required: true,
                        message: 'Please input your e-mail',
                    },
                ]}
                validateStatus={
                    emailResponse === 'notApproved' ? 'error' : 'success'
                }
            >
                <Input
                    placeholder='E-mail'
                    style={{ padding: '.8rem' }}
                    onChange={() => setEmailResponse('noData')}
                />
            </Form.Item>

            <Form.Item name='password-control' style={{ marginBottom: '0' }}>
                <Form.Item
                    name='password'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password',
                        },
                    ]}
                    style={{
                        display: 'inline-block',
                        width: 'calc(50% - 8px)',
                    }}
                >
                    <Input.Password
                        placeholder='Password'
                        style={{ padding: '.8rem' }}
                    />
                </Form.Item>
                <Form.Item
                    name='repeat-password'
                    dependencies={['password']}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (
                                    !value ||
                                    getFieldValue('password') === value
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error('Passwords does not match')
                                );
                            },
                        }),
                    ]}
                    style={{
                        display: 'inline-block',
                        width: 'calc(50% - 8px)',
                        margin: '0 8px',
                    }}
                >
                    <Input.Password
                        placeholder='Repeat password'
                        style={{ padding: '.8rem' }}
                    />
                </Form.Item>
            </Form.Item>
            <Form.Item
                valuePropName='checked'
                initialValue={false}
                name='adminRequest'
            >
                <Checkbox defaultChecked={false}>Send admin request</Checkbox>
            </Form.Item>
            <Form.Item>
                <Button type='primary' htmlType='submit' style={registerButton}>
                    Register
                </Button>
            </Form.Item>
            <h3
                style={cancelButton}
                onClick={() => {
                    props.toggleForm(false);
                    setEmailResponse('noData');
                }}
            >
                Cancel
            </h3>
        </Form>
    );
}

const registerButton: CSSProperties = {
    width: '100%',
    fontSize: '1rem',
    height: '2.5rem',
};

const cancelButton: CSSProperties = {
    color: '#1890ff',
    fontSize: '1rem',
    fontWeight: 500,
    textAlign: 'center',
    marginBottom: '1rem',
    cursor: 'pointer',
};

export default RegisterForm;
