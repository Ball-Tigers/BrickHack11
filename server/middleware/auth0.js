const fetch = require('node-fetch-commonjs');

const parseOrgId = async (req, res, next) => {
    const authorization = req.headers.authorization;
    fetch(process.env.AUTH0_DOMAIN + '/userinfo', {
        method: 'GET',
        headers: {
            'Authorization': authorization
        }
    }).then(res => res.json()).then(json => {
        req.orgId = json.sub;
        next();
    }).catch(e => {
        console.error(e);
        res.status(400).send({ code: 400, message: 'Invalid or missing access token' });
    });
}

module.exports = {
    parseOrgId: parseOrgId
}