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
import CartProvider from './contexts/CartContext';
import ScrollToTop from './componenets/ScrollToTop';
import ProductProvider from './contexts/ProductContext';

function App() {
    return (
        <ProductProvider>
            <CartProvider>
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
                        <Route path='/sidebar' component={Sidebar} />
                    </Switch>
                    <Footer2 />
                </Router>
            </CartProvider>
        </ProductProvider>
    );
}

export default App;
