module.exports = function(req, res, next) {

    // User is allowed, proceed to the next policy,
    // or if this is the last policy, the controller
    if (req.session.authenticated) {

        if ( req.session.User.role === "admin") {
            console.log("admin");
            return next();
        } else {
            var formError = ['You are not permitted to perform this action. You need to be logged in as admin'];
            return res.view('user/login', {formError: formError});
        }
    } else {
        var formError = ['You are not permitted to perform this action. You need to be logged in as admin'];
        return res.view('user/login', {formError: formError});
    }

};
