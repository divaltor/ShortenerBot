const axios = require('axios');

const headers = {
    'Authorization': `Bearer ${process.env.API_BIT}`,
    'Host': 'api-ssl.bitly.com',
    'Content-Type': 'application/json'
};

module.exports = async (url) => {
    return axios.post(
        'https://api-ssl.bitly.com/v4/shorten',
        {
            long_url: url
        },
        {
            headers: headers
        }
    );

};