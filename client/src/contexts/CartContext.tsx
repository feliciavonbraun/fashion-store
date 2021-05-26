import { Component, ContextType, createContext } from 'react';
import { OrderItem } from '../contexts/OrderContext';
import { UserContext } from '../contexts/UserContext';
import { PaymentCard } from '../componenets/Cart/PayCard';
import { PaymentKlarna } from '../componenets/Cart/PayKlarna';
import { PaymentSwish } from '../componenets/Cart/PaySwish';
import { DeliveryMethod } from '../contexts/DeliveryContext';
import { IReceipt } from '../componenets/OrderSuccess/Reciept';
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

const emptyReceipt: IReceipt = {
    cart: [],
    deliveryMethod: '',
    totalPrice: 0,
    paymentMethod: defaultPayment,
};
interface State {
    cart: OrderItem[];
    deliveryMethod: DeliveryMethod;
    paymentInfo: PaymentMethod;
    receipt: IReceipt;
    disablePlaceOrderButton: boolean;
}

interface ContextValue extends State {
    addProductToCart: (product: Product, quantity: number | undefined) => void;
    setDeliveryMethod: (method: DeliveryMethod) => void;
    deleteProductFromCart: (id: string) => void;
    getTotalPrice: () => number;
    getTotalPriceProducts: () => void;
    getBadgeQuantity: () => number;
    updatePaymentInfo: (paymentInfo: PaymentMethod) => void;
    handlePlaceOrder: (history: any) => void;
}

export const CartContext = createContext<ContextValue>({
    cart: [],
    deliveryMethod: emptyDelivery,
    paymentInfo: defaultPayment,
    receipt: emptyReceipt,
    disablePlaceOrderButton: false,
    addProductToCart: () => {},
    setDeliveryMethod: () => {},
    deleteProductFromCart: () => {},
    getTotalPrice: () => 0,
    getTotalPriceProducts: () => {},
    getBadgeQuantity: () => 0,
    updatePaymentInfo: () => {},
    handlePlaceOrder: () => {},
});

class CartProvider extends Component<{}, State> {
    context!: ContextType<typeof UserContext>;
    static contextType = UserContext;
    state: State = {
        cart: [],
        deliveryMethod: emptyDelivery,
        paymentInfo: defaultPayment,
        receipt: emptyReceipt,
        disablePlaceOrderButton: false,
    };

    componentDidMount() {
        this.setState({
            cart: JSON.parse(localStorage.getItem('cartItems') as string) || [],
        });
    }

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

    setDeliveryMethod = (method: DeliveryMethod) => {
        this.setState({ deliveryMethod: method });
    };

    deleteProductFromCart = (id: string) => {
        let cartItems = this.state.cart;
        const newCartItemsList = cartItems.filter(
            (item: OrderItem) => item.product._id !== id
        );
        localStorage.setItem('cartItems', JSON.stringify(newCartItemsList));
        this.setState({ cart: newCartItemsList });
    };

    getTotalPriceProducts = () => {
        let cartItems = this.state.cart;
        let totalPriceProducts = 0;
        for (const item of cartItems) {
            totalPriceProducts += item.qty * item.product.price;
        }
        return totalPriceProducts;
    };

    getTotalPrice = () => {
        let deliveryPrice = this.state.deliveryMethod?.price;
        return this.getTotalPriceProducts() + (deliveryPrice as number);
    };

    getBadgeQuantity = () => {
        let cartItems = this.state.cart;
        let quantity = 0;
        for (const item of cartItems) {
            quantity += item.qty;
        }
        return quantity;
    };

    updatePaymentInfo = (paymentInfo: PaymentMethod) => {
        this.setState({ paymentInfo: paymentInfo });
    };

    createReceipt = (): IReceipt => {
        return {
            cart: this.state.cart,
            deliveryMethod: this.state.deliveryMethod.company,
            totalPrice: this.getTotalPrice(),
            paymentMethod: { ...this.state.paymentInfo },
        };
    };

    clearCart = () => {
        this.setState({
            deliveryMethod: emptyDelivery,
            cart: [],
        });
        localStorage.setItem('cartItems', JSON.stringify([]));
    };

    handlePlaceOrder = async (history: any) => {
        this.setState({ disablePlaceOrderButton: true });
        try {
            await createOrderMockApi();
        } catch (error) {
            console.log(error);
            return;
        }
        this.setState({
            receipt: this.createReceipt(),
        });
        console.log('receipt', this.state.receipt);
        this.clearCart();

        history.push('/ordersuccess');
        this.setState({ disablePlaceOrderButton: false });
    };

    render() {
        return (
            <CartContext.Provider
                value={{
                    cart: this.state.cart,
                    deliveryMethod: this.state.deliveryMethod,
                    paymentInfo: this.state.paymentInfo,
                    receipt: this.state.receipt,
                    disablePlaceOrderButton: this.state.disablePlaceOrderButton,
                    addProductToCart: this.addProductToCart,
                    setDeliveryMethod: this.setDeliveryMethod,
                    deleteProductFromCart: this.deleteProductFromCart,
                    getTotalPrice: this.getTotalPrice,
                    getTotalPriceProducts: this.getTotalPriceProducts,
                    getBadgeQuantity: this.getBadgeQuantity,
                    updatePaymentInfo: this.updatePaymentInfo,
                    handlePlaceOrder: this.handlePlaceOrder,
                }}
            >
                {this.props.children}
            </CartContext.Provider>
        );
    }
}

export default CartProvider;

async function createOrderMockApi() {
    return new Promise((res) => setTimeout(() => res('success'), 2000));
}
