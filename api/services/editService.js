/**
 * Created by Gebruiker on 20-1-2018.
 */

var Promise = require("bluebird");

module.exports = {

    updateUser: function (userId, user) {

        return new Promise(function (resolve, reject) {
            User.update(userId, user).exec(function afterwards(err, updated) {

                if (err) {
                    console.log(err.Errors);
                    return reject(err);

                } else {
                    return resolve();
                }

            });
        });

    },

    updateCharity: function (charityId, charity) {

        return new Promise(function (resolve, reject) {
            Charity.update(userId, charity).exec(function afterwards(err, updated) {

                if (err) {
                    console.log(err.Errors);
                    return reject(err);

                } else {
                    return resolve();
                }

            });
        });

    }


};
