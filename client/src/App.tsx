import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import LogIn from './componenets/LogIn/LogIn';
import Profile from './componenets/Admin/Profile';
import CartView from './componenets/Cart/CartView';
import Footer2 from './componenets/Footer';
import Navbar from './componenets/Navbar';
import OrderSuccessMessage from './componenets/OrderSuccess/OrderSuccessMessage';
import ProductDetails from './componenets/ProductDetails/ProductDetails';
import StartPageView from './componenets/StartPage/StartPageView';
import ScrollToTop from './componenets/ScrollToTop';
import CartProvider from './contexts/CartContext';
import ProductProvider from './contexts/ProductContext';
import OrderProvider from "./contexts/OrderContext";
import UserProvider from "./contexts/UserContext"
import DeliveryProvider from './contexts/DeliveryContext';
import ErrorPage from './componenets/ErrorPage';


function App() {
    return (
        <CartProvider>
            <ProductProvider>
                <DeliveryProvider>
                    <UserProvider>
                        <OrderProvider>
                            <Router>
                                <ScrollToTop />
                                <Navbar />
                                <Switch>
                                    <Route path='/product/:id' component={ProductDetails} />
                                    <Route
                                        path='/ordersuccess'
                                        component={OrderSuccessMessage}
                                    />
                                    <Route exact path='/' component={StartPageView} />
                                    <Route path='/cart' component={CartView} />
                                    <Route path='/login' component={LogIn} />
                                    <Route path='/user' component={Profile} />
                                    <ErrorPage />
                                </Switch>
                                <Footer2 />
                            </Router>
                        </OrderProvider>
                    </UserProvider>
                </DeliveryProvider>
            </ProductProvider>
        </CartProvider>
    );
};

export default App;
