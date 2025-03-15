const User = require('../models/User');

const syncUser = async (req, res, next) => {
    try {
        if (!req.oidc || !req.oidc.user) return next();
        const {sub, email, name} = req.oidc.user;

        let user = await User.findOne({auth0Id: sub});
        if (!user) {
            user = await User.create({auth0Id: sub, email, name});
            console.log('New user:', user);
        }
        req.user = user;
        next();
    } catch (err) {
        console.error('Error syncing user:', err);
        next(err);
    }
}

module.exports = {syncUser};