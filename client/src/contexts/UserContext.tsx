import { Address } from './OrderContext';
import { createContext, useEffect, useState } from 'react';
import { makeRequest } from '../makeRequest';

export interface User {
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
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: 'user',
    adminRequest: false,
};

interface UserValue {
    loggedin: boolean;
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
    const [address, setAddress] = useState<Address>(emptyAddress);
    const [loggedin, setLoggedin] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [adminRequests, setAdminrequests] = useState<User[]>([]);

    useEffect(() => {
        getAllAdminRequests();
    }, []);

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
            setUser(newUser);
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

        const loginResponse = await makeRequest(
            '/api/user/login',
            'POST',
            user
        );
        switch (loginResponse) {
            case 'Login':
                setLoginResponse('Login');
                setLoggedin(true);
                break;
            case 'Pending admin request':
                setLoginResponse('Pending admin request');
                setLoggedin(false);
                break;
            default:
                setLoginResponse('Incorrect e-mail or password');
                setLoggedin(false);
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
