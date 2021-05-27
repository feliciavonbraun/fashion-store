import { Address, Order } from './OrderContext';
import { createContext, useEffect, useState, useCallback } from 'react';
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
    phone: 0,
    street: '',
    zipcode: 0,
    city: '',
};

interface UserValue {
    userOrders: Order[];
    loginError: string;
    adminRequests: User[];
    user?: User | null;
    address: Address;
    validEmail: boolean;
    setLoginError: (error: string) => void;
    setValidEmail: (value: boolean) => void;
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
    const [validEmail, setValidEmail] = useState(false);
    const [adminRequests, setAdminrequests] = useState<User[]>([]);

    const getUserOrders = useCallback(async () => {
        if (!user) return;

        const userOrders = await makeRequest(`/api/order/user/${user._id}`);
        setUserOrders(userOrders);
    }, [user]);

    useEffect(() => {
        getUserOrders();
        getAllAdminRequests();
    }, [getUserOrders]);

    useEffect(() => {
        (async function () {
            const user = await makeRequest('/api/user/auth');
            setUser(user);
        })();
    }, [setUser]);

    // REGISTER NEW USER
    async function registerUser(user: NewUser) {
        const uniqueEmail = await makeRequest(
            '/api/user/register',
            'POST',
            user
        );

        if (uniqueEmail) {
            setValidEmail(true);
            if (user.adminRequest) {
                getAllAdminRequests();
            }
        } else {
            setValidEmail(false);
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
        const allRequsts = await makeRequest('/api/user/admin', 'GET');
        setAdminrequests(allRequsts);
    }

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
                validEmail,
                user,
                userOrders,
                address,
                setLoginError,
                setValidEmail,
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
