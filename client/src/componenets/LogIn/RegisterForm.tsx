import { CSSProperties, useContext, useEffect, useState } from "react";
import { Form, Input, Button, Checkbox } from 'antd';
import { UserContext } from "../../contexts/UserContext";

interface Props {
    toggleForm: (value: boolean) => void
}

// TODO: Visa felmeddelande om användaren skriver in en mail som redan finns.


function RegisterForm(props: Props) {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [adminRequest, setAdminRequest] = useState(false);

    const { registerUser, validEmail, setValidEmail } = useContext(UserContext)

    useEffect(() => {
        if(validEmail) {
            props.toggleForm(false)
            setValidEmail(false)
        }
    })

    const onFinish = () => {
        registerUser(
            firstname,
            lastname,
            email,
            password,
            adminRequest
        )        
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="login"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
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
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
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
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        style={{ padding: '.8rem' }}
                    />
                </Form.Item>
            </Form.Item>

            <Form.Item shouldUpdate
                name="email"
                rules={[
                    {
                        type: 'email',
                        required: true,
                        message: 'Please input your e-mail',
                    },
                ]}
            >
                <Input
                    placeholder='E-mail'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ padding: '.8rem' }}
                />
            </Form.Item>

            <Form.Item
                name='password-control'
                style={{ marginBottom: '0' }}
            >
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Passwords does not match'))
                            }
                        })
                    ]}
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                >
                    <Input.Password
                        placeholder='Repeat password'
                        style={{ padding: '.8rem' }}
                    />
                </Form.Item>

            </Form.Item>
            <Form.Item
                name="admin-request"
            >
                <Checkbox
                    checked={adminRequest}
                    onChange={() => setAdminRequest(!adminRequest)}
                >
                    Send admin request
                    </Checkbox>
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
            <h3 style={cancelButton} onClick={() => props.toggleForm(false)}>
                Cancel
            </h3>
        </Form>
    )
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