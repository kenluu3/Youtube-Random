import axios from 'axios';
import jwt_decode from 'jwt-decode'; 

const root = process.env.REACT_APP_API || 'http://localhost:3800'; // server root url.

axios.defaults.baseURL = root;
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use((config) => { // http interceptor to attach jwt on requests.
    const token = localStorage.getItem('token');

    if (token && (Date.now() <= jwt_decode(token).exp * 1000)) { // if jwt exists & valid, then append to header.
        config.headers.Authorization = token;
    } else if (token) {
        localStorage.clear(); // clear the token (expired)
    }

    return config; // proceed with request.
}, (err) => { 
    console.log(JSON.stringify(err)); 
    return err;
});

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

// Retrieve Profile of authenticated User.
export const getProfile = (user) => {
    return axios.get(`/profile/${user}`);
} 

// Save Profile to DB
export const patchProfile = (user, update) => {
    return axios.patch(`/profile/${user}`, update);
}

// Save to Favorites List 
export const putFavorites = (user, video) => {
    return axios.put('/vid/save', {user: user, video: video});
}

export const deleteFavorite = (id) => {
    return axios.put('/vid/remove', {videoID: id});
}