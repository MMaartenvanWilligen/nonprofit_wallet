module.exports = function (req, res, next) {

    // User is allowed, proceed to the next policy,
    // or if this is the last policy, the controller
    if (req.session.authenticated) {

        if (req.session.User) {

            findService.searchUserPopulateLikes(req.session.User.id_user).then(function (records) {
                _.each(records, function (record) {
                    var likesCount = record.likes.length;

                    if (likesCount > 3) {
                        return next();
                    }
                    else {
                        res.forbidden("perform a minimal of three likes")
                    }
                });

            }).catch(function (err) {

            });


        } else {
            console.log("forbidden");
            var formError = ['You are not permitted to perform this action. You need to be logged in'];
            return res.view('user/login', {formError: formError});
        }
    } else {
        var formError = ['You are not permitted to perform this action. You need to be logged in'];
        return res.view('user/login', {formError: formError});
    }

};