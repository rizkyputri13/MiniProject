import axios from 'axios';
import { domain } from '../config/config';
import { getCookie } from 'cookies-next'

const signup = async (data) => {
    try {
        const result = await axios.post(`${domain}/auth/signup`, data);
        return result;
    } catch (error) {
        return error;
    }
}

const signin = async (data) => {
    try {
        const result = await axios.post(`${domain}/auth/login`, data);
        return result;
    } catch (error) {
        return error;
    }
}

const profile = async () => {
    axios.defaults.headers.common = { 'Authorization': `Bearer ${getCookie('access_token')}` }
    try {
        const result = await axios.get(`${domain}/profile`);
        return result;
    } catch (error) {
        return error;
    }
}

export default {
    signin,
    signup,
    profile
}