/**
 * Created by Gebruiker on 16-1-2018.
 */

var err = [];

module.exports = {

    inputEmptyString: function (input, msg) {

        if (input === "") {
            if (msg) {
                err.push(msg);
                return msg
            }
            return "is empty string"
        }

    },

    inputEmailReg: function (input, msg) {
        // standard email validation
        var emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var validationEmail = emailRe.test(input);
        if (!validationEmail) {
            if (msg) {
                err.push(msg);
                return msg
            }
            return "invalid email"
        }
    },

    inputPasswordReg: function (input, msg) {
        console.log("passwordReg");

        // must be alphanumeric or @*# , 8 to 15 characters
        var passwordRe = /^([a-zA-Z0-9@*#]{8,15})$/;
        var validationPassword = passwordRe.test(input);

        if (!validationPassword) {
            if (msg) {
                err.push(msg);
                return msg
            }
            return "Invalid password: must be alphanumeric or @*# , 8 to 15 characters"

        }

        console.log("passwordRegEnd");
    },

    inputNameReg: function (input, msg) {

        // must be correct name, no numerics and special characters, weird letter combination
        var nameRe = /^[a-zA-Z]+(([\'\,\.\- ][a-zA-Z ])?[a-zA-Z]*)*$/;
        var validationName = nameRe.test(input);

        if (!validationName) {
            if (msg) {
                err.push(msg);
                return msg
            }
            return "Invalid name: must be only be letters and no special characters"
        }

    },

    inputSearchReg: function (input, msg) {

        // only letters
        var searchRe = /^[a-zA-Z]+$/;
        var searchName = searchRe.test(input);

        if (!searchName) {
            if (msg) {
                err.push(msg);
                return msg
            }
            return "Invalid search"
        }

        console.log("searchReg");

    },

    loginForm: function (email, password, done) {
        err = [];

        this.inputEmptyString(email, "Email is required");
        this.inputEmptyString(password, "Password is required");
        this.inputEmailReg(email);
        this.inputPasswordReg(password);

        console.log("err" + " " + err);

        if (typeof err !== 'undefined' && err.length > 0) {
            // the array is defined and has at least one element
            done(err);
        } else {
            done();
        }
    },

    signupForm: function (name, email, password, done) {

        err = [];
        this.inputEmptyString(email, "Email is required");
        this.inputEmptyString(password, "Password is required");
        this.inputEmptyString(name, "Name is required");
        this.inputEmailReg(email);
        this.inputPasswordReg(password);
        this.inputNameReg(name);

        console.log("err" + " " + err);

        if (typeof err !== 'undefined' && err.length > 0) {
            // the array is defined and has at least one element
            return done(err)
        } else {
            return done();
        }

    },

    searchForm: function (searchString, category, done) {
        err = [];

        console.log("searchForm");

        console.log("in promise searchForm");
        this.inputSearchReg(searchString, "invalid search: must be letters");
        this.inputSearchReg(category, "invalid category: must be letters");

        console.log("err" + " " + err);

        if (typeof err !== 'undefined' && err.length > 0) {
            // the array is defined and has at least one element
            console.log("reject searchform");
            return done(err)
        } else {
            console.log("resolve searchform");
            return done();
        }


    }


};
