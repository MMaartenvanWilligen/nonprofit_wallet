module.exports = function(req, res, next) {

    // User is allowed, proceed to the next policy,
    // or if this is the last policy, the controller
    if (req.session.authenticated) {

        if ( req.session.User.role === "admin") {
            console.log("admin");
            return next();
        } else {
            return res.forbidden('You are not permitted to perform this action. You need to be Admin');
        }
    }

    // User is not allowed
    // (default res.forbidden() behavior can be overridden in `config/403.js`)
    return res.forbidden('You are not permitted to perform this action. you need to be logged in');
};
