'use client';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('mq_user');
        const storedToken = localStorage.getItem('mq_token');
        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
        setLoading(false);
    }, []);

    
    const login = (userData, userToken) => {
        localStorage.setItem('mq_user', JSON.stringify(userData));
        localStorage.setItem('mq_token', userToken);
        setUser(userData);
        setToken(userToken);
    };

    const logOut = () => {
        localStorage.removeItem('mq_user');
        localStorage.removeItem('mq_token');
        setUser(null);
        setToken(null);
    };

    const authInfo = { user, token, loading, login, logOut };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};