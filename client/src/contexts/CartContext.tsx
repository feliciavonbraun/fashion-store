import { Component, ContextType, createContext } from 'react';
import { OrderItem } from '../contexts/OrderContext';
import { UserContext } from '../contexts/UserContext';
import { PaymentCard } from '../components/Cart/PayCard';
import { PaymentKlarna } from '../components/Cart/PayKlarna';
import { PaymentSwish } from '../components/Cart/PaySwish';
import { DeliveryMethod } from '../contexts/DeliveryContext';
import { Product } from '../contexts/ProductContext';

const emptyDelivery: DeliveryMethod = {
    _id: '',
    company: '',
    time: 0,
    price: 0,
};

export type PaymentMethod = PaymentCard | PaymentSwish | PaymentKlarna;

const defaultPayment: PaymentMethod = {
    cardNumber: '',
    expDate: '',
    cardName: '',
    cvc: '',
};
interface State {
    cart: OrderItem[];
    deliveryMethod: DeliveryMethod;
    paymentInfo: PaymentMethod;
    disablePlaceOrderButton: boolean;
}

interface ContextValue extends State {
    addProductToCart: (product: Product, quantity: number | undefined) => void;
    setDeliveryMethod: (method: DeliveryMethod) => void;
    deleteProductFromCart: (id: string) => void;
    getTotalPrice: () => number;
    getTotalPriceProducts: () => void;
    getBadgeQuantity: () => number;
    clearCart: () => void;
    updatePaymentInfo: (paymentInfo: PaymentMethod) => void;
}

export const CartContext = createContext<ContextValue>({} as ContextValue);

class CartProvider extends Component<{}, State> {
    context!: ContextType<typeof UserContext>;
    static contextType = UserContext;
    state: State = {
        cart: [],
        deliveryMethod: emptyDelivery,
        paymentInfo: defaultPayment,
        disablePlaceOrderButton: false,
    };

    componentDidMount() {
        this.setState({
            cart: JSON.parse(localStorage.getItem('cartItems') as string) || [],
        });
    }

    // ADD PRODUCT TO CART
    addProductToCart = (product: Product, qty: number | undefined) => {
        let cartItems = this.state.cart;
        const existingCartItem = cartItems.filter(
            (item: OrderItem) => item.product._id === product._id
        );
        if (existingCartItem.length === 0) {
            const cartItem = { product: product, qty: 1 };
            cartItems.push(cartItem);
        } else if (qty) {
            const cartItem = { product: product, qty: qty };
            cartItems = cartItems.map((item: OrderItem) =>
                item.product._id === product._id ? cartItem : item
            );
        } else {
            const cartItem = {
                product: product,
                qty: existingCartItem[0].qty + 1,
            };
            cartItems = cartItems.map((item: OrderItem) =>
                item.product._id === product._id ? cartItem : item
            );
        }
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        this.setState({ cart: cartItems });
        return cartItems;
    };

    // SET DELIVERY METHOD
    setDeliveryMethod = (method: DeliveryMethod) => {
        this.setState({ deliveryMethod: method });
    };

    // DELETE PRODUCT FROM CART
    deleteProductFromCart = (id: string) => {
        let cartItems = this.state.cart;
        const newCartItemsList = cartItems.filter(
            (item: OrderItem) => item.product._id !== id
        );
        localStorage.setItem('cartItems', JSON.stringify(newCartItemsList));
        this.setState({ cart: newCartItemsList });
    };

    // GET TOTAL PRICE OF PRODUCTS IN CART
    getTotalPriceProducts = () => {
        let cartItems = this.state.cart;
        let totalPriceProducts = 0;
        for (const item of cartItems) {
            totalPriceProducts += item.qty * item.product.price;
        }
        return totalPriceProducts;
    };

    // GET TOTAL CART PRICE
    getTotalPrice = () => {
        let deliveryPrice = this.state.deliveryMethod?.price;
        return this.getTotalPriceProducts() + (deliveryPrice as number);
    };

    // GET BADGE QUANTITY FOR CART ICON
    getBadgeQuantity = () => {
        let cartItems = this.state.cart;
        let quantity = 0;
        for (const item of cartItems) {
            quantity += item.qty;
        }
        return quantity;
    };

    // SET PAYMENT INFO
    updatePaymentInfo = (paymentInfo: PaymentMethod) => {
        this.setState({ paymentInfo: paymentInfo });
    };

    // CLEAR CART
    clearCart = () => {
        this.setState({
            deliveryMethod: emptyDelivery,
            cart: [],
        });
        localStorage.setItem('cartItems', JSON.stringify([]));
    };

    render() {
        return (
            <CartContext.Provider
                value={{
                    cart: this.state.cart,
                    deliveryMethod: this.state.deliveryMethod,
                    paymentInfo: this.state.paymentInfo,
                    disablePlaceOrderButton: this.state.disablePlaceOrderButton,
                    addProductToCart: this.addProductToCart,
                    setDeliveryMethod: this.setDeliveryMethod,
                    deleteProductFromCart: this.deleteProductFromCart,
                    getTotalPrice: this.getTotalPrice,
                    getTotalPriceProducts: this.getTotalPriceProducts,
                    getBadgeQuantity: this.getBadgeQuantity,
                    updatePaymentInfo: this.updatePaymentInfo,
                    clearCart: this.clearCart,
                }}
            >
                {this.props.children}
            </CartContext.Provider>
        );
    }
}

export default CartProvider;
