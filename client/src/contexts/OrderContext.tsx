import { createContext, useContext, useEffect, useState } from 'react';
import { makeRequest } from '../makeRequest';
import { User, UserContext } from './UserContext';
import { CartContext } from './CartContext';
import { Product, ProductContext } from './ProductContext';
import { DeliveryMethod } from './DeliveryContext';

export interface OrderItem {
    product: Product;
    qty: number;
}

export interface Address {
    phone: string;
    street: string;
    zipcode: string;
    city: string;
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
    delivery: DeliveryMethod;
}

interface OrderValue {
    order: NewOrder;
    orderButton: boolean;
    allOrders: Order[];
    getOneOrder: (_id: string) => Promise<Order>;
    newOrder: () => Promise<Order>;
    updateOrder: (order: Order) => Promise<Order>;
}

interface Props {
    children: Object;
}

export const OrderContext = createContext<OrderValue>({} as OrderValue);

function OrderProvider({ children }: Props) {
    const { cart, getTotalPrice, deliveryMethod, clearCart } =
        useContext(CartContext);
    const { address, getUserOrders, user } = useContext(UserContext);
    const { setAllProducts, getProducts } = useContext(ProductContext);

    const [allOrders, setAllOrders] = useState<Order[]>([]);
    const [orderButton, setOrderButton] = useState(false);
    const order: NewOrder = {
        orderItems: cart,
        address: address,
        totalprice: getTotalPrice(),
        isSent: false,
        delivery: deliveryMethod,
    };

    // GETS ALL ORDERS ON MOUNT
    useEffect(() => {
        if (!user || user.role !== 'admin') return;
        (async function () {
            const orders = await makeRequest('/api/order', 'GET');
            if (typeof orders === 'object') {
                setAllOrders(orders);
            }
        })();
    }, [user]);

    // GET ALL ORDERS
    async function getOrders() {
        const orders = await makeRequest('/api/order', 'GET');
        if (typeof orders === 'object') {
            setAllOrders(orders);
        }
    }

    // GET ONE ORDER
    async function getOneOrder(_id: string) {
        const order = await makeRequest(`/api/order/${_id}`, 'GET');
        return order;
    }

    // NEW ORDER
    async function newOrder() {
        setOrderButton(true);
        const newOrder = await makeRequest('/api/order', 'POST', order);

        clearCart();
        /* Updates orders */
        getOrders();
        getUserOrders();
        /* Updates products in product context, since qty has changed */
        const products = await getProducts();
        setAllProducts(products);
        setOrderButton(false);

        return newOrder;
    }

    // UPDATE ORDER
    async function updateOrder(order: Order) {
        const updatedOrder = await makeRequest(
            `/api/order/${order._id}`,
            'PUT',
            order
        );

        /* Updates orders */
        getOrders();
        getUserOrders();

        return updatedOrder;
    }

    return (
        <OrderContext.Provider
            value={{
                order,
                orderButton,
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
