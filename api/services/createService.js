/**
 * Created by Gebruiker on 18-1-2018.
 */

var Promise = require("bluebird");

module.exports = {

    addCharityToWallet: function (userId, charityId, wallet) {
        return new Promise(function (resolve, reject) {

            if (!wallet) {
                var wallet = {name: "My first wallet", public: true, user: userId};
            }
            //check if there is a wallet associated with the user. Else create a wallet with the wallet object in options
            Wallet.findOrCreate({user: userId}, wallet).exec(function createFindCB(err, wallet) {
                console.log("wallet find or create result" + " " + wallet.id_wallet);
                //When wallet is created or found populate it with the charity
                if (err) {
                    return reject(err);
                }
                else {
                    Wallet.findOne(wallet.id_wallet).exec(function (err, wallet) {
                        if (err) {
                            return reject(err);
                        }
                        console.log("wallet findone" + " " + wallet);
                        // Queue up a new charity to be added and a record to be created in the join table
                        wallet.charities.add(charityId);

                        // Queue up a new user to be added and a record to be created in the join table
                        //wallet.user.add(userId);

                        // Save the wallet, creating the new charity and associations in the join table
                        wallet.save(function (err) {
                            if (err) {
                                return reject(err);
                            } else {
                                resolve()
                            }
                        });
                    });
                }
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
                            console.log("error save like");
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


