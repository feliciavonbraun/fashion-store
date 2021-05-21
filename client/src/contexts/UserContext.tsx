import { createContext, useState } from "react";
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
    loggedin: boolean,
    emailExist: boolean,

    loginUser: (email: string, password: string) => Promise<void>,
    logoutUser: (id: string) => Promise<void>,
    registerUser: (
        firstname: string, 
        lastname: string, 
        email: string, 
        password: string, 
        role: string,
        adminRequest: boolean,
        ) => Promise<void>,
};

interface Props {
    children: Object;
};

export const UserContext = createContext<UserValue>({} as UserValue);
function UserProvider({children}: Props) {
    const [loggedin, setLoggedin] = useState(false);
    const [emailExist, setEmailExist] = useState(false);

    // REGISTER NEW USER
    async function registerUser(
        firstname: string, 
        lastname: string, 
        email: string, 
        password: string, 
        role: string,
        adminRequest: boolean,
        ) {
        const newUser = {
            firstname,
            lastname,
            email,
            password,
            role,
            adminRequest,
        }

        const uniqueEmail = await makeRequest('/api/user/register', 'POST', newUser);

        if (uniqueEmail) {
            setEmailExist(false)
        } else {
            setEmailExist(true)
        }
    };

    // LOG IN USER
    async function loginUser(email: string, password: string) {
        const user = {
            email,
            password,
        }
        
        const correctLogin = await makeRequest('/api/user/login', 'POST', user);
        
        if (correctLogin) {
            setLoggedin(true)
        } else {
            setLoggedin(false)
        }
    };

    // LOG OUT USER
    async function logoutUser(id: string) {
        await makeRequest(`/api/user/logout/${id}`, 'DELETE')
    };

    return(
        <UserContext.Provider value =
            {{
                loggedin,
                emailExist,

                loginUser,
                logoutUser,
                registerUser,
            }}
        >
            { children }
        </UserContext.Provider>
    )
}

export default UserProvider;