/* eslint-disable */
import axios from 'axios';
import localStorage from 'local-storage';

const callApi = async (data, method, url) => {
try {
const baseUrl = 'http://localhost:9000/api' + url;
const response = await axios({
method,
url: baseUrl,
data,
headers: {
authorization: localStorage.get('token'),
},
});
return response.data;
} catch (error) {
return { status: 'error', message: 'This is a error message' };
}
};
export default callApi;
