const expressJwt = require('express-jwt');
const config = require('config.json');
//const userService = require('../users/user.service');
const mentoruserService = require('../mentorUsers/mentorUsers.service');
module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, algorithms: ['HS256'], isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            // '/users/authenticate',
            // '/users/register',
            '/mentorUsers/authenticate',
            '/mentorUsers/register'
        ]
    });
}

// async function isRevoked(req, payload, done) {
//     const user = await userService.getById(payload.sub);

//     // revoke token if user no longer exists
//     if (!user) {
//         return done(null, true);
//     }

//     done();
// };
async function isRevoked(req, payload, done) {
    const user = await mentoruserService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};