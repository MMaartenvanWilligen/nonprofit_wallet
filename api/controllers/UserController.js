module.exports = {
    login: function (req, res) {
        console.log("login");
        console.log(req.User);
        res.view();
    },

    signup: function (req, res, next) {


        User.create(req.params.all(), function userCreated(err, user) {


            if (err && err.invalidAttributes) {

                /*// store errors in session
                req.session.flash = {
                    formErrors: err
                };*/

                console.log(err.Errors);

                return res.view('user/signup', {formError: err.Errors});
            } else {
                return res.view('/login');
            }

        });
    }

};