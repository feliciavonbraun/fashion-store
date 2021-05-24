import { Badge, Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { CSSProperties, useContext } from 'react';
import logo from '../assets/logga-fs.png';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';

function Navbar() {
    const cartContext = useContext(CartContext);
    const { getBadgeQuantity } = cartContext;

    return (
        <Header style={layoutStyle}>
            <Link to='/' style={logoLink}>
                <img src={logo} alt='logo' style={li} />
            </Link>
            <Menu mode='horizontal' style={menuStyle}>
                <Menu.Item key='1' style={li}>
                    <Link to='/cart' style={{ color: 'white', height: '3rem' }}>
                        <Badge style={badge} count={getBadgeQuantity()}>
                            <ShoppingCartOutlined style={iconStyle} />{' '}
                        </Badge>
                    </Link>
                </Menu.Item>
                <Menu.Item key='2' style={li}>
                    <Link to='/login'>
                        <h3
                            style={{
                                margin: 0,
                                color: 'white',
                            }}
                        >
                            Log in
                        </h3>
                    </Link>
                </Menu.Item>
            </Menu>
        </Header>
    );
}

const layoutStyle: CSSProperties = {
    width: '100%',
    background: 'black',
    height: window.innerWidth > 768 ? '6rem' : '5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    textDecoration: 'none',
    zIndex: 100,
    borderBottom: 'none',
    position: 'fixed',
};

const badge: CSSProperties = {
    borderColor: 'rgb(255, 77, 79)',
};

const logoLink: CSSProperties = {
    padding: '1rem 0',
    marginRight: '0.5rem',
    height: '100%',
};

const iconStyle: CSSProperties = {
    fontSize: '2rem',
    color: 'white',
    margin: 0,
};

const li: CSSProperties = {
    maxHeight: '100%',
    display: 'flex',
    alignItems: 'center',
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
