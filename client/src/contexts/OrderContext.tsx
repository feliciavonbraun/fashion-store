import { createContext, useContext, useEffect, useState } from 'react';
import { makeRequest } from '../makeRequest';
import { User, UserContext } from './UserContext';
import { CartContext } from './CartContext';
import { Product, ProductContext } from './ProductContext';
import { DeliveryMethod } from './DeliveryContext';

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
    totalprice: number;
    isSent: boolean;
    createdAt: Date;

    delivery: DeliveryMethod;
    user: User;
}

interface NewOrder {
    orderItems: OrderItem[];
    address: Address;
    totalprice: number;
    isSent: boolean;
    delivery: string;
}

interface OrderValue {
    allOrders: Order[];
    getOneOrder: (_id: string) => void;
    newOrder: () => void;
    updateOrder: (order: Order) => Promise<Order>;
}

interface Props {
    children: Object;
}

export const OrderContext = createContext<OrderValue>({} as OrderValue);

function OrderProvider({ children }: Props) {
    const [allOrders, setAllOrders] = useState<Order[]>([]);

    const { cart, getTotalPrice, deliveryMethod } = useContext(CartContext);
    const { address } = useContext(UserContext);
    const { setAllProducts, getProducts } = useContext(ProductContext);

    useEffect(() => {
        getOrders();
    }, [setAllOrders]);

    async function getOrders() {
        const orders = await makeRequest('/api/order', 'GET');
        setAllOrders(orders);
    }

    async function getOneOrder(_id: string) {
        const order = await makeRequest(`/api/order/${_id}`, 'GET');
        return order;
    }

    async function newOrder() {
        const order: NewOrder = {
            orderItems: cart,
            address: address,
            totalprice: getTotalPrice(),
            isSent: false,
            delivery: deliveryMethod._id,
        };
        const newOrder = await makeRequest('/api/order', 'POST', order);

        /* Updates orders */
        getOrders();
        /* Updates products in product context, since qty has changed */
        const products = await getProducts();
        setAllProducts(products);

        return newOrder;
    }

    async function updateOrder(order: Order) {
        const updatedOrder = await makeRequest(
            `/api/order/${order._id}`,
            'PUT',
            order
        );
        getOrders();
        return updatedOrder;
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
