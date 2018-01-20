/**
 * Created by Gebruiker on 20-1-2018.
 */

var Promise = require("bluebird");

module.exports = {

    destroyUser: function (options) {
        return new Promise(function (resolve, reject) {


            User.destroy(userId).exec(function (err) {
                if (err) {
                    return reject()
                }
                sails.log('Deleted user');
                return resolve();
            });
        })
    },

    destroyCharity: function (options) {
        return new Promise(function (resolve, reject) {

            User.destroy(userId).exec(function (err) {
                if (err) {
                    return reject()
                }
                sails.log('Deleted user');
                return resolve();
            });
        })
    }
};
