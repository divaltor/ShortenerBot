const request = require('request-promise-native');
const API_BIT = process.env.API_BIT;
const GUID = process.env.GUID;

const API_URL = 'https://api-ssl.bitly.com/v4/shorten';

const headers = {
    'Authorization': `Bearer ${API_BIT}`,
    'Host': 'api-ssl.bitly.com',
    'Content-Type': 'application/json'
};

module.exports = (url) => {
    return request({
        method: 'POST',
        uri: API_URL,
        headers: headers,
        json: {
            'long_url': url,
            'group_guid': GUID
        }
    })

};