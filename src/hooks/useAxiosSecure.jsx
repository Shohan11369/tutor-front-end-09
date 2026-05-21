import axios from 'axios';

const axiosSecure = axios.create({
    baseURL: 'https://tutor-server-09.vercel.app', 
    withCredentials: true
});

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;