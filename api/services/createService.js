/**
 * Created by Gebruiker on 18-1-2018.
 */

var Promise = require("bluebird");

module.exports = {

    addCharityToWallet: function (options) {

        //check if there is a wallet associated with the user. Else create a wallet with the wallet object in options
        Wallet.findOrCreate({user: optionsUserId}, options.WalletObject).exec(function createFindCB(error, createdOrFoundRecords) {
            console.log('What\'s cookin\' ' + createdOrFoundRecords.name + '?');
        });

        //When wallet is created or found populate it with the charity
        Wallet.findOne(walletId).exec(function (err, wallet) {
            if (err) // handle error

            // Queue up a new pet to be added and a record to be created in the join table
                wallet.charities.add(charityId);

            // Save the user, creating the new pet and associations in the join table
            wallet.save(function (err) {
            });
        });

    },

    createUser: function (user) {

        return new Promise(function (resolve, reject) {

            User.create(user).exec(function (err, user) {
                if (err && err.invalidAttributes) {

                    console.log(err.Errors);
                    return reject(err);

                } else {
                    return resolve(user);
                }
            });

        });
    },

    createWallet: function (wallet, userId) {

        return new Promise(function (resolve, reject) {

            User.findOne(userId)
                .populate('wallet')
                .exec(function (err, records) {

                    records[1].wallet.add(wallet);

                    records[1].save(function (err) {
                        if (err) {
                            console.log("error save wallet");
                            // handle error (e.g. `return res.serverError(err);` )
                            return reject(err);
                        }
                        else {
                            return resolve();
                        }

                    });

                });
        })

    },

    createLike: function (userId, charityId) {

        return new Promise(function (resolve, reject) {

            User.findOne(userId).exec(function (err, user) {

                if (err) {
                    console.log("error find user in like");
                    // handle error (e.g. `return res.serverError(err);` )
                    return reject(err)
                }
                else {
                    // Queue up a new pet to be added and a record to be created in the join table
                    user.likes.add(charityId);

                    // Save the user, creating the new pet and associations in the join table
                    return user.save(function (err) {
                        if (err) {
                            console.log("error save wallet");
                            // handle error (e.g. `return res.serverError(err);` )
                            return reject(err)
                        }

                        return resolve();
                    });
                }
            });
        });
    },

    createCategory: function (category) {

        return new Promise(function (resolve, reject) {
            Category.create(category).exec(function (err, records) {
                if (err && err.invalidAttributes) {
                    console.log(err.Errors);
                    return reject(err);

                } else {

                    return resolve();
                }
            });
        });

    },

    createCharity: function (charity) {

        return new Promise(function (resolve, reject) {
            Charity.create(charity).exec(function (err, records) {
                if (err && err.invalidAttributes) {

                    console.log(err.Errors);

                    return reject(err);

                } else {

                    return resolve();
                }
            });
        });

    }

};


