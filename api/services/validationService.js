/**
 * Created by Gebruiker on 16-1-2018.
 */
module.exports = {

    inputExists: function (input, msg) {

        if (!input) {
            console.log("required");
            if (msg) {
                return msg
            }
            return "is required"
        }
    },

    inputUndefined: function (input, msg) {

        if (input === undefined || input === null) {
            if (msg) {
                return msg
            }
            return "is Undefined or null"
        }
    },

    inputEmptyString: function (input, msg) {

        if (input === "" ) {
            if (msg) {
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
                return msg
            }
            return "invalid email"
        }
    },

    inputPasswordReg: function (input, msg) {

        // must be alphanumeric or @*# , 8 to 15 characters
        var passwordRe = /^([a-zA-Z0-9@*#]{8,15})$/;
        var validationPassword = passwordRe.test(input);

        if (!validationPassword) {
            if (msg) {
                return msg
            }
            return "Invalid password: must be alphanumeric or @*# , 8 to 15 characters"

        }
    },

    inputNameReg: function (input, msg) {

        // must be correct name, no numerics and special characters, weird letter combination
        var nameRe = /^[a-zA-Z]+(([\'\,\.\- ][a-zA-Z ])?[a-zA-Z]*)*$/;
        var validationName = nameRe.test(input);

        if (!validationName) {
            if (msg) {
                return msg
            }
            return "Invalid name"

        }
    }

};
