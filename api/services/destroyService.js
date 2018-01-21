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
    },

    destroyCharityfromWallet: function (userId, charityId) {
        return new Promise(function (resolve, reject) {


            Wallet.findOne({user: userId}).exec(function (err, wallet) {
                if (err) {
                    return reject(err)
                }

                // Queue up a join table record to remove
                wallet.charities.remove(charityId);

                // Save the user, creating the new pet and syncing the associations in the join table
                wallet.save(function (err) {
                    if (err) {
                        return reject(err)
                    }

                    sails.log('Deleted charity form wallet');
                    return resolve();
                });
            });
        })
    }

};
