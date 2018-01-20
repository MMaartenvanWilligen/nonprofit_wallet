var bcrypt = require('bcrypt');

module.exports = {
    login: function (req, res) {
        console.log("login");
        res.view();
    },

    loginPost: function (req, res) {
        //validation service to do
        var email = req.param("email");
        var password = req.param("password");

        validationService.loginForm(email, password, function (err) {
            if(err){
                return res.view('user/login', {formError: err});
            }
            login();
        });

        function login() {
            console.log("else");
            User.findOneByEmail(req.param("email")).exec(function (err, user) {

                if (user === undefined || user === null) {
                    return res.view('user/login', {formError: "Email dit not match with registered account"});
                }

                else if (err) {
                    console.log("else if error");
                    return res.negotiate(err);

                } else {
                    console.log("user found");
                    console.log(user);

                    bcrypt.compare(req.param("password"), user.password, function (err, match) {
                        // res = false
                        if (err || !match) {

                            console.log(err);
                            res.view('user/login', {formError: "password did not match"});

                        } else {
                            console.log('name is:', user.name);
                            req.session.authenticated = true;
                            req.session.User = user;
                            res.redirect('homepage');
                        }

                    });
                }
            });
        }
    },


    signup: function (req, res, next) {
        return res.view();
    },

    create: function (req, res, next) {

        validationService.signupForm(req.param("name"), req.param("email"), req.param("password")).then(function (result) {
            login();
        }).catch(function (err) {
            return res.view('user/signup', {formError: err});
        });

        User.create(req.params.all()).exec(function (err, user) {
            if (err && err.invalidAttributes) {

                console.log(err.Errors);
                return res.view('user/signup', {formError: err.Errors});

            } else {
                console.log('name is:', user.name);
                return res.view('user/login', {succesSignup: "the Sign Up was successful"});
            }
        });

    },

    logout: function (req, res, next) {

        // "Forget" the user from the session.
        // Subsequent requests from this user agent will NOT have `req.session.me`.
        req.session.authenticated = null;
        req.session.User = null;


        // Otherwise if this is an HTML-wanting browser, do a redirect.
        return res.redirect('user/login');

    }


};