/**
 * Created by Gebruiker on 13-1-2018.
 */
module.exports = function (req, res, next) {

    // User is allowed, proceed to the next policy,
    // or if this is the last policy, the controller
    if (req.session.authenticated) {

        return next();
    } else {
        console.log("forbidden");
        var formError = ['You are not permitted to perform this action. You need to be logged in'];
        return res.view('user/login', {formError: formError});
    }


};
