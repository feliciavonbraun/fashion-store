import { Address, Order } from './OrderContext';
import { createContext, useEffect, useState, useCallback } from 'react';
import { makeRequest } from '../makeRequest';

export interface User {
    _id: string;
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

const emptyUser: User = {
    _id: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: 'user',
    adminRequest: false,
};

interface UserValue {
    loggedin: boolean;
    userOrders: Order[];
    loginResponse: string;
    adminRequests: User[];
    user: User;
    address: Address;
    validEmail: boolean;
    setValidEmail: (value: boolean) => void;
    setAddress: React.Dispatch<React.SetStateAction<Address>>;
    loginUser: (email: string, password: string) => Promise<void>;
    logoutUser: (id: string) => Promise<void>;
    responseAdminRequest: (user: User, response: boolean) => Promise<void>;
    registerUser: (
        firstname: string,
        lastname: string,
        email: string,
        password: string,
        role: 'admin' | 'user',
        adminRequest: boolean
    ) => Promise<void>;
}

interface Props {
    children: Object;
}

export const UserContext = createContext<UserValue>({} as UserValue);
function UserProvider({ children }: Props) {
    const [loginResponse, setLoginResponse] = useState('Login');
    const [user, setUser] = useState<User>(emptyUser);
    const [userOrders, setUserOrders] = useState<Order[]>([]);
    const [address, setAddress] = useState<Address>(emptyAddress);
    const [loggedin, setLoggedin] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [adminRequests, setAdminrequests] = useState<User[]>([]);

    const getUserOrders = useCallback(async () => {
        console.log('hello');
        const userOrders = await makeRequest(
            `/api/order/user/${user._id}`,
            'GET'
        );
        console.log(userOrders);
        setUserOrders(userOrders);
    }, [user._id]);

    useEffect(() => {
        getUserOrders();
        getAllAdminRequests();
    }, [getUserOrders]);

    // REGISTER NEW USER
    async function registerUser(
        firstname: string,
        lastname: string,
        email: string,
        password: string,
        role: 'admin' | 'user',
        adminRequest: boolean
    ) {
        const newUser = {
            firstname,
            lastname,
            email,
            password,
            role,
            adminRequest,
        };

        const uniqueEmail = await makeRequest(
            '/api/user/register',
            'POST',
            newUser
        );

        if (uniqueEmail) {
            setValidEmail(true);
            if (adminRequest) {
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
            setLoggedin(true);
        } else {
            setLoggedin(false);
            setLoginResponse(res);
        }
    }

    // LOG OUT USER
    async function logoutUser(id: string) {
        await makeRequest(`/api/user/logout/${id}`, 'DELETE');
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
        await makeRequest('/api/user/admin', 'PUT', { ...user });

        getAllAdminRequests();
    }

    return (
        <UserContext.Provider
            value={{
                loggedin,
                loginResponse,
                adminRequests,
                validEmail,
                user,
                userOrders,
                address,
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
