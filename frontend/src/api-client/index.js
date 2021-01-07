import axios from 'axios';

const root = 'http://localhost:3800'; // server root url.

axios.defaults.baseURL = root;
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Query Video
export const getVideo = (queryList) => {
    const filter = queryList.map(tag => tag.tag).join(','); 
    const config = {
        params: {
            q: filter
        }
    }

    return axios.get('/vid/generate', config);
}   

// Login route.
export const postLogin = (user) => {
    return axios.post('/login', user);
}

// Register Route
export const postRegister = (user) => {

    return axios.post('/register', user);
}

export const getProfile = () => {

    return axios.get('/profile/', {params});  
} 