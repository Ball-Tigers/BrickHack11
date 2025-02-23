const fetch = require('node-fetch-commonjs');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 3600 });

const parseOrgId = async (req, res, next) => {
    const authorization = req.headers.authorization;

    const cached = cache.get(authorization)
    if(cached !== undefined) {
        req.orgId = cached;
        next();
        return;
    }

    fetch(process.env.AUTH0_DOMAIN + '/userinfo', {
        method: 'GET',
        headers: {
            'Authorization': authorization
        }
    }).then(res => res.json()).then(json => {
        req.orgId = json.sub;
        cache.set(authorization, req.orgId);
        next();
    }).catch(e => {
        console.error(e);
        res.status(400).send({ code: 400, message: 'Invalid or missing access token' });
    });
}

module.exports = {
    parseOrgId: parseOrgId
}