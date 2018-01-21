/**
 * Created by Gebruiker on 20-1-2018.
 */

var Promise = require("bluebird");

module.exports = {

    destroyUser: function (userId) {
        return new Promise(function (resolve, reject) {

            User.find(userId).populate('likes').exec(function (err, users) {
                if (err) {
                    return reject()
                }
                console.log(users);

                removeAllLikeAssociations(function () {
                    User.destroy(userId).exec(function (err) {
                        if (err) {
                            return reject()
                        }
                        sails.log('Deleted user');
                        return resolve();
                    });
                });

                function removeAllLikeAssociations(done) {
                    console.log("removeAllLikesFunction");
                    console.log("each likes" + " " + users[0].likes);
                    _.each(users[0].likes, function (record) {
                        console.log("each");
                        users[0].likes.remove(record.id_charity);

                        users[0].save(function (err) {
                            if (err) {
                                return reject(err)
                            }

                            sails.log('Deleted charity form wallet');
                        });
                    });
                    done()
                }

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
