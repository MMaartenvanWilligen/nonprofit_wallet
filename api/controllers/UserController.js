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
            if (err) {
                return res.view('user/login', {formError: err});
            }
            login();
        });

        function login() {
            console.log("else");
            User.findOneByEmail(req.param("email")).exec(function (err, user) {

                if (user === undefined || user === null) {

                    var formError = ["Email dit not match with registered account"];
                    return res.view('user/login', {formError: formError});
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
                            var formError = ["password did not match"];
                            res.view('user/login', {formError: formError});

                        } else {
                            console.log('name is:', user.name);
                            req.session.authenticated = true;
                            req.session.User = user;
                            console.log("loggedId");
                            if (user.role === "admin") {
                                return res.redirect('admin/dashboard');
                            } else {
                                return res.redirect('homepage');
                            }
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

        validationService.signupForm(req.param("name"), req.param("email"), req.param("password"), function (err) {
            if (err) {
                console.log("err validation. res");
                return res.redirect("user/signup");

            } else {
                console.log("create User");
                createUser();
            }
        });

        function createUser() {

            User.create(req.params.all()).exec(function (err, user) {
                if (err && err.invalidAttributes) {

                    console.log(err.Errors);
                    return res.view('user/signup', {formError: err.Errors});

                } else {
                    console.log('name is:', user.name);
                    return res.view('user/login', {succesSignup: "the Sign Up was successful"});
                }
            });
        }

    },

    logout: function (req, res, next) {

        // "Forget" the user from the session.
        // Subsequent requests from this user agent will NOT have `req.session.me`.
        req.session.authenticated = null;
        req.session.User = null;


        // Otherwise if this is an HTML-wanting browser, do a redirect.
        return res.redirect('user/login');

    },

    profile: function (req, res, next) {
        console.log("profile");
        findService.searchCharitiesInWallet(req.session.User.id_user).then(function (records) {
            return res.view({wallet: records});
        }).catch(function (err) {
            console.log(err);
            return res.negotiate(err);
        });

    },

    edit: function (req, res) {
        console.log("edit");
        findService.searchUser(req.param("id")).then(function (records) {
            return res.view({user: records});
        }).catch(function (err) {
            console.log(err);
            return res.negotiate(err);
        });
    },

    update: function (req, res) {
        var user = req.params.all();
        editService.updateUser(req.param("id"), user).then(function (records) {
            return res.redirect("admin/dashboard")
        }).catch(function (err) {
            console.log(err);
            return res.view('user/edit/' + req.param("id"), {formError: err.Errors});
        });
    },

    destroy: function (req, res) {
        console.log("edit");
        destroyService.destroyUser(req.param("id")).then(function (records) {
            return res.redirect("admin/dashboard");
        }).catch(function (err) {
            console.log(err);
            return res.negotiate(err);
        });
    }



};