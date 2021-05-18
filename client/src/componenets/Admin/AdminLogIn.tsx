import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, Button, Checkbox } from 'antd';
import { CSSProperties, Component } from 'react';
import { Link } from 'react-router-dom';

class AdminLogIn extends Component {

  onFinish = (values: any) => {
    console.log('Success:', values);
  };

  onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  render() {
    return (
      <main style={backgroundImage}>
        <div style={formContainerStyle}>
          <h1 style={titleStyle}
          >
            LOG IN
          </h1>
          <Form
            name="login"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email',
                },
              ]}
            >
              <Input
                prefix={<UserOutlined style={inputIconStyle}/>}
                placeholder='E-mail'
                style={{padding: '.8rem'}}
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
              <Input 
                prefix={<LockOutlined style={inputIconStyle}/>} 
                type='password' 
                placeholder='Password'
                style={{padding: '.8rem'}} 
              />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Link to={'/admin-list'}>
                <Button 
                  type="primary" 
                  htmlType="submit"
                  style={buttonStyle}
                >
                  Log in
                </Button>
              </Link>
            </Form.Item>
            <Link to='/'> 
              <p style={registerLink}>
                Register now
              </p> 
            </Link>
          </Form>
        </div>
      </main>
    );
  }
}

const backgroundImage: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100%',
  backgroundImage: 'url("https://github.com/feliciavonbraun/fashion-store/blob/master/client/src/assets/carousel1.png?raw=true")',

  backgroundSize: 'cover',
}

const formContainerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  maxWidth: '40rem',
  padding: '3rem 1rem',
  backgroundColor: '#FFFFFFE5',
}

const titleStyle: CSSProperties = {
  textAlign: 'center',
  fontWeight: 'bold',
  marginBottom: '2rem',
}

const inputIconStyle: CSSProperties = {
  fontSize: '1.2rem',
  marginRight: '1rem'
}

const buttonStyle: CSSProperties = {
  width: '100%',
  fontSize: '1rem',
  height: '2.5rem',
}

const registerLink: CSSProperties = {
  textAlign: 'center',
  fontSize: '1rem',
  fontWeight: 500,
}

export default AdminLogIn;
