import { createContext, useContext, useEffect, useState } from "react";
import { makeRequest } from "../makeRequest";
import { User } from "./UserContext";
import { CartContext } from "./CartContext";
import { DeliveryMethods } from "./DeliveryContext";
// import { CartItem } from "../componenets/Cart/CartItemsList";


interface OrderItem {
    product: string, // in cart from CartContext
    qty: number, // in cart from CartContext
};

interface Address {
    phone: number, // in userInfo from CartContext
    street: string, // in userInfo from CartContext
    zipcode: number, // in userInfo from CartContext
    city: string, // in userInfo from CartContext
};

export interface Order extends User {    
    orderItems: OrderItem[],
    address: Address,

    _id: string,
    totalprice: number, // finns
    isSent: boolean, 
    createdAt: Date, 

    deliveryMethods: DeliveryMethods[],
    user: User[],

    // cart: CartItem[],
};

interface OrderValue {
    allOrders: Order[],
    getOneOrder: (_id: string) => void,
    newOrder: (order: Order) => void,
    updateOrder: (isSent: boolean) => void,
};

interface Props {
    children: Object;
};

export const OrderContext = createContext<OrderValue>({} as OrderValue);

function OrderProvider({ children }: Props) { // children kan skrivas annorlunda

    const [allOrders, setAllOrders] = useState<Order[]>([]);
    console.log('allOrders:', allOrders)

    const { cart } = useContext(CartContext);
    console.log('Cart Items:', cart)

    // const { getTotalPrice } = useContext(CartContext);
    // console.log('totalPrice:', getTotalPrice);

    const { userInfo } = useContext(CartContext);
    console.log('userInfo:', userInfo) // innehåller för mkt saker 

    useEffect(() => {
        async function getOrders() {
            const orders = await makeRequest('/api/order', 'GET');
            console.log('Orders in useEffect:', orders)
            setAllOrders(orders);
        }
        getOrders();
    }, [setAllOrders]);

    async function getOneOrder(_id: string) {
        const oneProduct: Order = await makeRequest(`/api/order/${_id}`, 'GET');
        return oneProduct;
    };

    async function newOrder() {
        // allt i interfacet + det importerade

        // const body = { ...order }
        // const newOrder = await makeRequest('/api/order', 'POST', body);
        // console.log('Nya ordern:', newOrder);
        // return newOrder;
    };

    async function updateOrder(isSent: boolean) {
        // isSent ska endast kunna uppdateras
    };

    return (
        <OrderContext.Provider
            value={{
                allOrders,
                getOneOrder,
                newOrder,
                updateOrder,
            }}
        >
            { children}
        </OrderContext.Provider>
    )
}
export default OrderProvider;