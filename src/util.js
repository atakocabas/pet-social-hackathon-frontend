const axios = require('axios');

export const makeGetRequest = async (url) => {

    const config = {
        method: 'get',
        url: url
    }

    let res = await axios(config)

    console.log(res.status);
    return res
}
