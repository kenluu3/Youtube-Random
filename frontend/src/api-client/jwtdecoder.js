import jwt_decode from 'jwt-decode';

let token = localStorage.getItem('token');
let decoded;  
if (token) { // if token does not exist, then undefined will signify user is not logged in.
    decoded = jwt_decode(token);
} 

export default decoded;