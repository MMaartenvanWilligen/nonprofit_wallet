var bcrypt = require('bcrypt');

module.exports = {
    login: function (req, res) {
        console.log("login");
        res.view();
    },

    loginPost: function (req, res) {
        console.log("loginPost");

        if (!req.param("email") || !req.param("password")) {
            console.log("requires password and email");
            res.view("user/login", {formError: "email and password are required"})
        } else {

            console.log("else");
            User.findOneByEmail(req.param("email")).exec(function (err, user) {

                if (err) {

                    console.log(err);
                    res.view('user/login', {formError: "Email does not match a account"});

                } else {
                    console.log("email found");
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
        res.view();
    },

    create: function (req, res, next) {

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

    },

    dummydata: function (req, res, next) {

        var dummyData = [
            {"name": "John", "email": "john@mail.nl", "password": "password", "role": "user"},
            {"name": "User", "email": "user@mail.nl", "password": "password", "role": "user"},
            {"name": "Admin", "email": "admin@mail.nl", "password": "password", "role": "admin"},
            {"name": "Maarten", "email": "maarten@mail.nl", "password": "password", "role": "user"},
            {"name": "Felipe", "email": "felipe@mail.nl", "password": "password", "role": "user"},
            {"name": "iris", "email": "iris@mail.nl", "password": "password", "role": "user"}
        ];


        User.create(dummyData).exec(function (err, user) {
            if (err && err.invalidAttributes) {

                console.log(err.Errors);

                return res.ok();

            } else {
                console.log('name is:', user.name);
                return res.ok();
            }
        });

    }


};