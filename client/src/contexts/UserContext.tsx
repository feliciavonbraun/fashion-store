import { createContext, useEffect, useState } from "react";
import { makeRequest } from "../makeRequest";

export interface User {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    role: 'admin' | 'user',
    adminRequest: boolean,
};

interface UserValue {
    loggedIn: boolean,
    loginResponse: string,
    adminRequests: [{}],
    validEmail: boolean,
    setValidEmail: (value: boolean) => void

    loginUser: (email: string, password: string) => Promise<void>,
    logoutUser: (id: string) => Promise<void>,
    responseAdminRequest: (email: string, response: boolean) => Promise<void>
    registerUser: (
        firstname: string, 
        lastname: string, 
        email: string, 
        password: string, 
        adminRequest: boolean,
        ) => Promise<void>,
};

interface Props {
    children: Object;
};

export const UserContext = createContext<UserValue>({} as UserValue);
function UserProvider({children}: Props) {
    const [loginResponse, setLoginResponse] = useState('Login');
    const [loggedIn, setLoggedin] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [adminRequests, setAdminrequests] = useState<[{}]>([{}]);

    useEffect(() => {
        getAllAdminRequests()
    });

    // REGISTER NEW USER
    async function registerUser(
        firstname: string, 
        lastname: string, 
        email: string, 
        password: string, 
        adminRequest: boolean,
        ) {
        const newUser = {
            firstname,
            lastname,
            email,
            password,
            adminRequest,
        }

        const uniqueEmail = await makeRequest('/api/user/register', 'POST', newUser);
        
        if (uniqueEmail) {
            setValidEmail(true)
            if (adminRequest) {
                getAllAdminRequests()
            }
        } else {
            setValidEmail(false)
        }
    };

    // LOG IN USER
    async function loginUser(email: string, password: string) {
        const user = {
            email,
            password,
        }
        
        const loginResponse = await makeRequest('/api/user/login', 'POST', user);
        switch(loginResponse){
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
    };

    // LOG OUT USER
    async function logoutUser(id: string) {
        await makeRequest(`/api/user/logout/${id}`, 'DELETE')
    };

    // GET ALL ADMIN REQUESTS
    async function getAllAdminRequests() {
        const allRequsts = await makeRequest('/api/user/admin', 'GET');
        setAdminrequests(allRequsts)
    };

    // RESPONSE TO ADMIN REQUEST
    async function responseAdminRequest(email: string, response: boolean) {
        await makeRequest('/api/user/admin', 'PUT', {email, response});

        getAllAdminRequests()
    };

    return(
        <UserContext.Provider value =
            {{
                loggedIn,
                loginResponse,
                adminRequests,
                validEmail,
                setValidEmail,

                loginUser,
                logoutUser,
                responseAdminRequest,
                registerUser,
            }}
        >
            { children }
        </UserContext.Provider>
    )
}

export default UserProvider;