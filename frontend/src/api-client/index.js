import axios from 'axios';


const root = 'http://localhost:3800'; // server root url.

axios.defaults.baseURL = root;

export const getVideo = (queryList) => {

    const filter = queryList.map(tag => tag.tag).join(','); 
    const config = {
        params: {
            q: filter
        }
    }

    return axios.get('/vid/generate', config);
    
}   