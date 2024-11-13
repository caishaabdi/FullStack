import { LogOut } from "lucide-react";
import { createContext, useContext, useEffect, useState } from "react";
const UserContex = createContext(null);


export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);



    const LogOut = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('expirationTime');
        setUser(null);
    };

    useEffect(() => {

        const storedUser = localStorage.getItem('user');
        const expirationTime = localStorage.getItem('expirationTime');

        if (storedUser && expirationTime) {
            const currentTime = new Date().getTime();
            if (currentTime < parseInt(expirationTime)) {
                setUser(JSON.parse(storedUser));
            } else {
                LogOut();
            }
        }
    }, []);
    const login = (userData, expiresIn) => {

        const expirationTime = new Date().getTime() + expiresIn * 1000
        localStorage.setItem('expirationTime', expirationTime);
        localStorage.setItem('user', JSON.stringify(userData));

        setUser(userData);
    };
    return (
        <UserContex.Provider value={{ user, setUser, login, LogOut }}>
            {children}
        </UserContex.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContex);
};


export default UserContex;

