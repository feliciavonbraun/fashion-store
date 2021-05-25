import { CSSProperties, useContext, useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, Button, Checkbox } from 'antd';
import { useHistory } from 'react-router';
import { UserContext } from "../../contexts/UserContext";

interface Props {
    toggleForm: (value: boolean) => void
}

 function LogInForm(props: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false)

    const { loginUser, loggedin } = useContext(UserContext)
    let history = useHistory()

    useEffect(() => {
        if (loggedin) {
            history.push('/sidebar')
        }
    })

    function onFinish() {
        loginUser(email, password)
        if (!remember) {
            setEmail('');
            setPassword('');
        }
    };

    // const onFinishFailed = (errorInfo: any) => {
    //     console.log('Failed:', errorInfo);
    // };

    return (
        <Form
                name="login"
                initialValues={{
                    remember: true,
                }}
                //onFinish={onFinish}
                //onFinishFailed={onFinishFailed}
                onSubmitCapture={onFinish}
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            required: true,
                            message: 'Please input your email',
                        },
                    ]}
                >
                    <Input
                        prefix={<UserOutlined style={inputIconStyle} />}
                        placeholder='E-mail'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ padding: '.8rem' }}
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password',
                        },
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined style={inputIconStyle} />}
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ padding: '.8rem' }}
                    />
                </Form.Item>

                <Form.Item 
                    name="remember" 
                >
                    <Checkbox 
                        checked={remember} 
                        onChange={() => setRemember(!remember)}
                    >
                        Remember me
                    </Checkbox>
                </Form.Item>

                <Form.Item>
                    
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={logInButton}
                        >
                            Log in
                        </Button>
                    
                </Form.Item>
                <h3 style={registerButton} onClick={() => props.toggleForm(true)}>
                    Register now
                </h3>
            </Form>
    )
}

const inputIconStyle: CSSProperties = {
    fontSize: '1.2rem',
    marginRight: '1rem'
}

const logInButton: CSSProperties = {
    width: '100%',
    fontSize: '1rem',
    height: '2.5rem',
}

const registerButton: CSSProperties = {
    color: '#1890ff',
    fontSize: '1rem',
    fontWeight: 500,
    textAlign: 'center',
    marginBottom: '1rem',
    cursor: 'pointer',
}

export default LogInForm