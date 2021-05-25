import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import LogIn from './componenets/LogIn/LogIn';
import Sidebar from './componenets/Admin/sidebar';
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


function App() {
    return (
        <OrderProvider>
            <ProductProvider>
                <DeliveryProvider>
                <CartProvider>
                    <UserProvider>
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
                                <Route path='/user' component={Sidebar} />
                            </Switch>
                            <Footer2 />
                        </Router>
                    </UserProvider>
                </CartProvider>
            </DeliveryProvider>
            </ProductProvider>
        </OrderProvider>
    );
}

export default App;
