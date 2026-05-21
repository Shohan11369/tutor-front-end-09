import axios from 'axios';

const axiosSecure = axios.create({
    baseURL: 'https://http://localhost:8080', 
    withCredentials: true
});

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;