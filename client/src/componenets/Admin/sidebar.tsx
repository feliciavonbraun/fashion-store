import { CSSProperties } from 'react';
import { Layout, Menu } from 'antd';
import {
    BrowserRouter as Router,
    Route,
    Link,
    withRouter,
    RouteComponentProps,
} from 'react-router-dom';

import ProductList from './ProductList';
import AdminReqList from './AdminReqList';
import OrderList from '../User/OrderList';
import AddNewProduct from './AddNewProduct';
import AdminEditDetails from './AdminEditDetails';

const { Content, Sider } = Layout;

interface Props extends RouteComponentProps {}

function Sidebar(props: Props) {
    return (
        <Router>
            <Layout style={layout}>
                <Sider breakpoint='lg' collapsedWidth='0' theme={'light'}>
                    <Menu
                        style={{ height: '100%' }}
                        mode='inline'
                        defaultSelectedKeys={['1']}
                    >
                        <Menu.Item key='1'>
                            <span>Products</span>
                            <Link to={`${props.match.url}/product-list`} />
                        </Menu.Item>
                        <Menu.Item key='2'>
                            <span>Orders</span>
                            <Link to={`${props.match.url}/order-list`} />
                        </Menu.Item>
                        <Menu.Item key='3'>
                            <span>Admin Requests</span>
                            <Link to={`${props.match.url}/admin-list`} />
                        </Menu.Item>
                    </Menu>
                </Sider>

                <Layout style={mainContent}>
                    <Content style={contentStyle}>
                        <Route
                            exact
                            path={`${props.match.url}/product-list`}
                            component={ProductList}
                        />
                        <Route
                            path={`${props.match.url}/product-list/add-product`}
                            component={AddNewProduct}
                        />
                        <Route
                            path={`${props.match.url}/product-list/edit-product/:id`}
                            component={AdminEditDetails}
                        />
                        <Route
                            path={`${props.match.url}/order-list`}
                            component={OrderList}
                        />
                        <Route
                            path={`${props.match.url}/admin-list`}
                            component={AdminReqList}
                        />
                    </Content>
                </Layout>
            </Layout>
        </Router>
    );
}

export default withRouter(Sidebar);

const layout: CSSProperties = {
    paddingTop: window.innerWidth > 768 ? '6rem' : '5rem',
    height: 'calc(100vh - 3rem)',
};

const mainContent: CSSProperties = {
    flex: 1,
    backgroundColor: 'white',
    overflowY: 'auto',
    overflowX: 'hidden',
};

const contentStyle: CSSProperties = {
    flex: 1,
    minWidth: '18rem',
    padding: '3rem 2rem',
};
