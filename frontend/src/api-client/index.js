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

// Retrieve Profile of authenticated User.
export const getProfile = (user, token) => {
    return axios.get(`/profile/${user}`, {headers: {Authorization: token}});
} 

// Save Profile to DB
export const patchProfile = (user, update, token) => {
    return axios.patch(`/profile/${user}`, update, {headers: {Authorization: token}})
}

// Save to Favorites List 
export const putFavorites = (user, video, token) => {
    return axios.put('/vid/save', {user: user, video: video}, {headers: {Authorization: token}});
}

export const deleteFavorite = (user, id, token) => {
    return axios.put('/vid/remove', {user: user, videoID: id}, {headers: {Authorization: token}});
}