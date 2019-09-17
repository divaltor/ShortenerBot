const axios = require('axios');

const headers = {
    'Authorization': `Bearer ${process.env.API_BIT}`,
    'Host': 'api-ssl.bitly.com',
    'Content-Type': 'application/json'
};

module.exports = async (url) => {
    return axios({
        method: 'POST',
        uri: process.env.API_URL,
        headers: headers,
        json: {
            'long_url': url,
            'group_guid': process.env.GUID
        }
    })

};