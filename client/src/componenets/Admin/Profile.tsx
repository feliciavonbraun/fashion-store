import { CSSProperties, useContext, useEffect } from 'react';
import { Button, Layout, Menu } from 'antd';
import {
    BrowserRouter as Router,
    Route,
    Link,
    withRouter,
    RouteComponentProps,
    useHistory,
} from 'react-router-dom';

import ProductList from './ProductList';
import AdminReqList from './AdminReqList';
import OrderList from '../User/OrderList';
import AddNewProduct from './AddNewProduct';
import AdminEditDetails from './AdminEditDetails';
import AdminOrderList from './AdminOrderList';
import { UserContext } from '../../contexts/UserContext';

const { Content, Sider } = Layout;

interface Props extends RouteComponentProps {}

function Profile(props: Props) {
    let history = useHistory();
    const { user, logoutUser } = useContext(UserContext);

    useEffect(() => {
        if (!user) {
            history.push('/');
        }
    }, [user, history]);

    const checkRole = () => {
        if (user) {
            if (user.role === 'admin') return true;
            else return false;
        } else return null;
    };

    const handleLogOut = async () => {
        await logoutUser();
    };

    return (
        <Router>
            <Layout style={layout}>
                <Sider breakpoint='lg' collapsedWidth='0' theme={'light'}>
                    <Menu
                        style={sidebarStyle}
                        mode='inline'
                        defaultSelectedKeys={checkRole() ? ['1'] : ['4']}
                    >
                        {checkRole() ? (
                            <>
                                <Menu.Item key='1'>
                                    <span>Products</span>
                                    <Link
                                        to={`${props.match.url}/product-list`}
                                    />
                                </Menu.Item>
                                <Menu.Item key='2'>
                                    <span>Admin Requests</span>
                                    <Link
                                        to={`${props.match.url}/admin-list`}
                                    />
                                </Menu.Item>
                                <Menu.Item key='3'>
                                    <span>Orders (Admin)</span>
                                    <Link
                                        to={`${props.match.url}/admin-order-list`}
                                    />
                                </Menu.Item>
                            </>
                        ) : (
                            <Menu.Item key='4'>
                                <span>Orders</span>
                                <Link to={`${props.match.url}/order-list`} />
                            </Menu.Item>
                        )}
                        <Menu.Item
                            style={buttonContainer}
                            key='5'
                            onClick={handleLogOut}
                        >
                            <Button type='primary' style={logOutButton}>
                                Log out
                            </Button>
                        </Menu.Item>
                        {/* <Button
                            type='primary'
                            style={logOutButton}
                            onClick={() => handleLogOut()}
                        >
                            Log out
                        </Button> */}
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
                        <Route
                            path={`${props.match.url}/admin-order-list`}
                            component={AdminOrderList}
                        />
                    </Content>
                </Layout>
            </Layout>
        </Router>
    );
}

export default withRouter(Profile);

const layout: CSSProperties = {
    paddingTop: window.innerWidth > 768 ? '6rem' : '5rem',
    height: 'calc(100vh - 3rem)',
};

const sidebarStyle: CSSProperties = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
};

const mainContent: CSSProperties = {
    flex: 1,
    backgroundColor: 'white',
    overflowY: 'auto',
    overflowX: 'hidden',
};

const contentStyle: CSSProperties = {
    flex: 1,
    minHeight: 'auto',
    minWidth: '18rem',
    padding: '3rem 2rem',
};

const buttonContainer: CSSProperties = {
    flex: 1,
    display: 'flex',
    alignItems: 'flex-end',
};

const logOutButton: CSSProperties = {
    width: '100%',
    marginBottom: '1rem',
};
