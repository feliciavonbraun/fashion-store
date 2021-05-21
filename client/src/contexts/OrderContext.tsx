import { createContext, useEffect, useState } from "react";
import { makeRequest } from "../makeRequest";

export interface Order {
    // orderItem schema
    // address shema 
    _id: string, 
    totalprice: string, 
    isSent: boolean,
    // createdAt: Date, // ska denna va med här? 
    // delivery context 
    // user context
};

interface OrderValue {
    allOrders: Order[]
};

interface Props {
    children: Object;
}

export const OrderContext = createContext<OrderValue>({} as OrderValue);

function OrderProvider({children}: Props) { // children kan skrivas annorlunda

    const [allOrders, setAllOrders] = useState<Order[]>([]);

    useEffect(() => {
        async function getOrders() {
            
            const orders = await makeRequest('/api/order', 'GET');
            console.log('ORDERS:', orders)
            setAllOrders( orders);
        }
        getOrders();
    }, [setAllOrders]);
    

    return (
        <OrderContext.Provider value= 
            {{
                allOrders
            }}
        >
            { children }
        </OrderContext.Provider>
    )
}
export default OrderProvider; 