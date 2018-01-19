/**
 * Created by Gebruiker on 18-1-2018.
 */

module.exports = {

    addCharityToWallet: function (options, done) {

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

    createUser: function (user, done) {

        User.create(user).exec(function (err, user) {
            if (err && err.invalidAttributes) {

                console.log(err.Errors);

                return done(err);

            } else {

                return done();
            }
        });

    },

    createWallet: function (wallet, userId, done) {

        User.findOne(userId)
            .populate('wallet')
            .exec(function (err, records) {

                records[1].wallet.add(wallet);

                records[1].save(function (err) {
                    if (err) {
                        console.log("error save wallet");
                        // handle error (e.g. `return res.serverError(err);` )
                        return done(err);
                    }
                    else {
                        return done();
                    }

                });

            });
    },

    createLike: function (userId, charityId, done) {

        User.findOne(userId).exec(function (err, user) {

            if (err) {
                console.log("error find user in like");
                // handle error (e.g. `return res.serverError(err);` )
                return done(err);
            }
            else {
                // Queue up a new pet to be added and a record to be created in the join table
                user.likes.add(charityId);

                // Save the user, creating the new pet and associations in the join table
                user.save(function (err) {
                    if (err) {
                        console.log("error save wallet");
                        // handle error (e.g. `return res.serverError(err);` )
                        return done(err);
                    }

                    return done();
                });

            }

        });

    },

    createCategory: function (category, done) {

        Category.create(category).exec(function (err, records) {
            if (err && err.invalidAttributes) {

                console.log(err.Errors);

                return done(err);

            } else {

                return done();
            }
        });
    },

    createCharity: function (charity, done) {

        Charity.create(charity).exec(function (err, records) {
            if (err && err.invalidAttributes) {

                console.log(err.Errors);

                return done(err);

            } else {

                return done();
            }
        });
    }

};


