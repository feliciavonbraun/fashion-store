import { createContext, useContext, useEffect, useState } from 'react';
import { makeRequest } from '../makeRequest';
import { UserContext } from './UserContext';
import { CartContext } from './CartContext';
// import { CartItem } from "../componenets/Cart/CartItemsList";
import { Product, ProductContext } from './ProductContext';

export interface OrderItem {
    product: Product; // in cart from CartContext
    qty: number; // in cart from CartContext
}

export interface Address {
    phone: number; // in userInfo from CartContext
    street: string; // in userInfo from CartContext
    zipcode: number; // in userInfo from CartContext
    city: string; // in userInfo from CartContext
}

export interface Order {
    orderItems: OrderItem[];
    address: Address;

    _id: string;
    totalprice: number; // finns
    isSent: boolean;
    createdAt: Number;

    deliveryMethod: string;
    user: string;
}

interface NewOrder {
    orderItems: OrderItem[];
    address: Address;
    totalprice: number; // finns
    isSent: boolean;
    createdAt: Number;
}

interface OrderValue {
    allOrders: Order[];
    getOneOrder: (_id: string) => void;
    newOrder: () => void;
    updateOrder: (isSent: boolean) => void;
}

interface Props {
    children: Object;
}

export const OrderContext = createContext<OrderValue>({} as OrderValue);

function OrderProvider({ children }: Props) {
    // children kan skrivas annorlunda

    const [allOrders, setAllOrders] = useState<Order[]>([]);

    const { cart, getTotalPrice } = useContext(CartContext);
    const { address } = useContext(UserContext);
    const { setAllProducts, getProducts } = useContext(ProductContext);

    useEffect(() => {
        async function getOrders() {
            const orders = await makeRequest('/api/order', 'GET');
            console.log('Orders in useEffect:', orders);
            setAllOrders(orders);
        }
        getOrders();
    }, [setAllOrders]);

    async function getOneOrder(_id: string) {
        const oneProduct: Order = await makeRequest(`/api/order/${_id}`, 'GET');
        return oneProduct;
    }

    async function newOrder() {
        const order: NewOrder = {
            orderItems: cart,
            address: address,
            totalprice: getTotalPrice(),
            isSent: false,
            createdAt: Date.now(),
        };
        const newOrder = await makeRequest('/api/order', 'POST', order);
        console.log('Nya ordern:', newOrder);

        /* Updates products in product context, since qty has changed */
        const products = await getProducts();
        setAllProducts(products);

        return newOrder;
    }

    async function updateOrder(isSent: boolean) {
        // isSent ska endast kunna uppdateras
    }

    return (
        <OrderContext.Provider
            value={{
                allOrders,
                getOneOrder,
                newOrder,
                updateOrder,
            }}
        >
            {children}
        </OrderContext.Provider>
    );
}
export default OrderProvider;
