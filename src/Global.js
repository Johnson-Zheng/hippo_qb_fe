const devBaseUrl = 'http://api.hippo-exam.q7w.cn:8081';
const proBaseUrl = '/api';
let BASE_URL;
process.env.NODE_ENV === 'development' ? BASE_URL = devBaseUrl : BASE_URL = proBaseUrl ;
export default{
    BASE_URL
}
