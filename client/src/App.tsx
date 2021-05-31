import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import LogIn from './components/LogIn/LogIn';
import Profile from './components/Admin/Profile';
import CartView from './components/Cart/CartView';
import Footer2 from './components/Footer';
import Navbar from './components/Navbar';
import OrderSuccessMessage from './components/OrderSuccess/OrderSuccessMessage';
import ProductDetails from './components/ProductDetails/ProductDetails';
import StartPageView from './components/StartPage/StartPageView';
import ScrollToTop from './components/ScrollToTop';
import CartProvider from './contexts/CartContext';
import ProductProvider from './contexts/ProductContext';
import OrderProvider from "./contexts/OrderContext";
import UserProvider from "./contexts/UserContext"
import DeliveryProvider from './contexts/DeliveryContext';
import ErrorPage from './components/ErrorPage';


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
