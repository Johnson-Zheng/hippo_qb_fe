const devBaseUrl = 'http://localhost:8081/api'
const proBaseUrl = '/api';
let BASE_URL;
process.env.NODE_ENV === 'development' ? BASE_URL = devBaseUrl : BASE_URL = proBaseUrl ;
export default{
    BASE_URL
}
