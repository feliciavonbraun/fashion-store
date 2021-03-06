import { Address, Order } from './OrderContext';
import { createContext, useEffect, useState } from 'react';
import { makeRequest } from '../makeRequest';

export interface User {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    role: 'admin' | 'user';
    adminRequest: boolean;
}

export interface NewUser {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
    adminRequest: boolean;
}

const emptyAddress: Address = {
    phone: '',
    street: '',
    zipcode: '',
    city: '',
};

interface UserValue {
    userOrders: Order[];
    adminRequests: User[];
    user?: User | null;
    address: Address;
    loginError: string;
    emailResponse: string;
    setLoginError: (value: string) => void;
    setEmailResponse: (value: string) => void;
    getUserOrders: () => void;
    setAddress: React.Dispatch<React.SetStateAction<Address>>;
    loginUser: (email: string, password: string) => Promise<void>;
    logoutUser: () => Promise<void>;
    responseAdminRequest: (user: User, response: boolean) => Promise<void>;
    registerUser: (user: NewUser) => Promise<void>;
}

interface Props {
    children: Object;
}

export const UserContext = createContext<UserValue>({} as UserValue);
function UserProvider({ children }: Props) {
    const [loginError, setLoginError] = useState('none');
    const [user, setUser] = useState<User | null>();
    const [userOrders, setUserOrders] = useState<Order[]>([]);
    const [address, setAddress] = useState<Address>(emptyAddress);
    const [emailResponse, setEmailResponse] = useState('noData');
    const [adminRequests, setAdminrequests] = useState<User[]>([]);

    /* HANDLEDNING MÅNDAG, KOLLA KONTINUELIGT ATT ANVÄNDAREN ÄR INLOGGAD */
    // GETS USER ON MOUNT
    useEffect(() => {
        (async function () {
            const user = await makeRequest('/api/user/auth');
            setUser(user);
        })();
    }, [setUser]);

    // GETS USER ORDERS ON MOUNT
    useEffect(() => {
        (async function () {
            if (!user) return;

            const userOrders = await makeRequest(`/api/order/user/${user._id}`);
            if (typeof userOrders === 'object') {
                setUserOrders(userOrders);
            }
        })();
    }, [user]);

    // GETS ADMIN REQUESTS ON MOUNT
    useEffect(() => {
        if (!user || user.role !== 'admin') return;

        (async function () {
            const allRequests = await makeRequest('/api/user/admin', 'GET');
            if (typeof allRequests === 'object') {
                setAdminrequests(allRequests);
            }
        })();
    }, [user]);

    // REGISTER NEW USER
    async function registerUser(user: NewUser) {
        const emailResponse = await makeRequest(
            '/api/user/register',
            'POST',
            user
        );

        if (emailResponse === 'approved') {
            setEmailResponse('approved');
            if (user.adminRequest) {
                getAllAdminRequests();
            }
        } else {
            setEmailResponse('notApproved');
        }
    }

    // LOG IN USER
    async function loginUser(email: string, password: string) {
        const user = {
            email,
            password,
        };

        const res = await makeRequest('/api/user/login', 'POST', user);
        if (res.email) {
            setUser(res);
            setLoginError('none');
        } else {
            setLoginError(res);
        }
    }

    // LOG OUT USER
    async function logoutUser() {
        await makeRequest('/api/user/logout', 'DELETE');
        setUser(null);
    }

    // GET ALL ADMIN REQUESTS
    async function getAllAdminRequests() {
        const allRequests = await makeRequest('/api/user/admin', 'GET');
        if (typeof allRequests === 'object') {
            setAdminrequests(allRequests);
        }
    }

    // GET ALL USER ORDERS
    const getUserOrders = async () => {
        if (!user) return;

        const userOrders = await makeRequest(`/api/order/user/${user._id}`);
        if (typeof userOrders === 'object') {
            setUserOrders(userOrders);
        }
    };

    // RESPONSE TO ADMIN REQUEST
    async function responseAdminRequest(user: User, response: boolean) {
        if (response) {
            user.role = 'admin';
        } else {
            user.role = 'user';
        }
        await makeRequest('/api/user/admin', 'PUT', user);
        getAllAdminRequests();
    }

    return (
        <UserContext.Provider
            value={{
                loginError,
                adminRequests,
                emailResponse,
                user,
                userOrders,
                address,
                setEmailResponse,
                getUserOrders,
                setLoginError,
                setAddress,
                loginUser,
                logoutUser,
                responseAdminRequest,
                registerUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;
