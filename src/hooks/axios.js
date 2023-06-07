import axios from 'axios';
const baseUrl = process.env.REACT_APP_API_URL;

const fetchSinToken = (endpoint, data, method = "GET", headers) => {
  const url = `${baseUrl}/${endpoint}`;

  if (method === "GET") {
    return axios(url, headers = headers);
  } else {
    return axios({
    url: url, 
    method: method,
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    data: data
    });
}
};


const fetchConToken = (endpoint, data, method = "GET") => {
  const url = `${baseUrl}/${endpoint}`;
  const token = localStorage.getItem('token') || '';
  if (method === "GET") {
    return axios(url, {
      method,
      headers: {
        "Authorization": `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*"
      }
    });
  } else {
    return axios({
      url: url, 
      method: method,
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*"

      },
      data: data
      });
  }
};

export { fetchSinToken, fetchConToken };