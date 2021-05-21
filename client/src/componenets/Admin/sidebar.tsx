import { Component, CSSProperties } from 'react';
import { Layout, Menu } from 'antd';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import ProductList from './ProductList';
import UserList from './UserList';
import OrderList from '../User/OrderList';
import AddNewProduct from './AddNewProduct';
import AdminEditDetails from './AdminEditDetails';

const { Content, Sider } = Layout;

class Sidebar extends Component {
    render() {
        return (
            <Router>
                <Layout>
                    <Sider style={siderStyle}>
                        <div className='logo' />
                        <Menu
                            theme='dark'
                            mode='inline'
                            defaultSelectedKeys={['0']}
                        >
                            <Menu.Item key='1'>
                                <span>Products</span>
                                <Link to='product-list' />
                            </Menu.Item>
                            <Menu.Item key='2'>
                                <span>Orders</span>
                                <Link to='order-list' />
                            </Menu.Item>
                            <Menu.Item key='3'>
                                <span>Users</span>
                                <Link to='user-list' />
                            </Menu.Item>
                        </Menu>
                    </Sider>

                    <Layout
                        className='site-layout'
                        style={{ marginLeft: 200, backgroundColor: 'white' }}
                    >
                        <Content>
                            <Route
                                path='/product-list'
                                component={ProductList}
                            />
                            <Route path='/order-list' component={OrderList} />
                            <Route
                                path='/add-product'
                                component={AddNewProduct}
                            />
                            <Route
                                path='/edit-product/:id'
                                component={AdminEditDetails}
                            />
                            <Route path='/user-list' component={UserList} />
                        </Content>
                    </Layout>
                </Layout>
            </Router>
        );
    }
}
export default Sidebar;

const siderStyle: CSSProperties = {
    overflow: 'auto',
    height: '100%',
    position: 'fixed',
    left: 0,
    marginTop: window.innerWidth > 768 ? '6rem' : '5rem',
    zIndex: 100,
};
