// 'use client';
// import { createContext, useEffect, useState } from 'react';
// import { authClient } from '@/lib/auth-client'; 

// export const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
    
//     const { data: session, isPending } = authClient.useSession();
    
//     const [user, setUser] = useState(null);
//     const [token, setToken] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         if (session) {
//             setUser(session.user); 
            
//         } else {
           
//             const storedUser = localStorage.getItem('mq_user');
//             if (!storedUser) setUser(null);
//         }
//         setLoading(isPending);
//     }, [session, isPending]);

//     const login = (userData, userToken) => {
//         localStorage.setItem('mq_user', JSON.stringify(userData));
//         localStorage.setItem('mq_token', userToken);
//         setUser(userData);
//         setToken(userToken);
//     };

//     const googleLogin = async () => {
     
//         return await authClient.signIn.social({
//             provider: 'google',
//             callbackURL: '/',
//         });
//     };

//     const logOut = async () => {
//         await authClient.signOut(); 
//         localStorage.removeItem('mq_user');
//         localStorage.removeItem('mq_token');
//         setUser(null);
//         setToken(null);
//     };

//     const authInfo = { user, token, loading, login, googleLogin, logOut };

//     return (
//         <AuthContext.Provider value={authInfo}>
//             {children}
//         </AuthContext.Provider>
//     );
// }