import { Row, Col, Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { CSSProperties } from 'react';
import logo from '../assets/logga-fs.png';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import AddToBadge from './Badge';

function Navbar() {
    return (
        <Header style={layoutStyle}>
            <Row style={{ width: '100%', height: '100%' }}>
                <Col span={8} style={{ height: '100%' }}>
                    <Link to='/'>
                        <img src={logo} alt='logo' style={logoStyle} />
                    </Link>
                </Col>
                <Col span={10} offset={6} style={{ height: '100%' }}>
                    <Menu mode='horizontal' style={menuStyle}>
                        <Menu.Item key='1'>
                            <Link to='/cart' style={{ color: 'white' }}>
                                <ShoppingCartOutlined style={iconStyle} />{' '}
                            </Link>
                            <AddToBadge />
                        </Menu.Item>
                        <Menu.Item key='2'>
                            <Link to='/login'>
                                <h3
                                    style={{
                                        color: 'white',
                                        marginTop: '1.5rem',
                                    }}
                                >
                                    Log in
                                </h3>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Col>
            </Row>
        </Header>
    );
}

const layoutStyle: CSSProperties = {
    width: '100%',
    background: 'black',
    height: window.innerWidth > 768 ? '6rem' : '5rem',
    display: 'flex',
    alignItems: 'center',
    justifyItems: 'center',
    textDecoration: 'none',
    zIndex: 100,
    borderBottom: 'none',
    position: 'fixed',
};

const logoStyle: CSSProperties = {
    padding: '1rem 0',
    marginRight: '0.5rem',
    height: '100%',
};

const iconStyle: CSSProperties = {
    color: 'white',
    fontSize: '2.3rem',
    float: 'right',
    position: 'absolute',
    margin: window.innerWidth > 768 ? '2.3rem -1.6rem' : '2.3rem -1.5rem',
    boxSizing: 'border-box',
};

const menuStyle: CSSProperties = {
    height: '100%',
    float: 'right',
    background: 'black',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: window.innerWidth > 768 ? '0' : '-2rem',
};

export default Navbar;
