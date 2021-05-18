import { Component } from "react";
import { Layout, Menu } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import GetAdminList from "./AdminList";
import Orders from "./orders";

const { Content, Sider } = Layout;

class Sidebar extends Component {

    render() {
        return (
            <Router>
                <Layout>
                    <Sider
                        style={{
                            overflow: 'auto',
                            height: '100vh',
                            position: 'fixed',
                            left: 0,
                            marginTop: '6rem',
                        }}
                    >
                        <div className="logo" />
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
                            <Menu.Item key="1">
                                <span>Products</span>
                                <Link to="/admin-list" />
                            </Menu.Item>
                            <Menu.Item key="2" >
                                <span>Orders</span>
                                <Link to='/orders' />
                            </Menu.Item>
                            <Menu.Item key="3" >
                                <span>Users</span>

                            </Menu.Item>
                        </Menu>
                    </Sider>

                    <Layout className="site-layout" style={{ marginLeft: 200 }}>
                        <Content className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>

                            <Route path="/admin-list" component={GetAdminList} />
                            <Route path="/orders" component={Orders} />

                        </Content>
                    </Layout>
                </Layout>
            </Router>
        )
    }
}
export default Sidebar;