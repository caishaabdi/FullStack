import { createContext, useContext, useState } from "react";
const UserContex = createContext(null);


export const UserProvider = ({ Children }) => {
    const [user, setUser] = useState(null);


    const login = (userData, expiresIn) => {

        const expirationTime = new Date().getTime() + expiresIn * 1000
        localStorage.setItem('expirationTime', expirationTime);
        localStorage.setItem('user', JSON.stringify(userData));

        setUser(userData);
    };

    return (
        <UserContex.Provider value={{ user, setUser, login }}>
            {Children}

        </UserContex.Provider>
    );

};

export const useUser = () => {
    return useContext(UserContex);
};


export default UserContex;