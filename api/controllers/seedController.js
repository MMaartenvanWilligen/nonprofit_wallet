/**
 * Created by Gebruiker on 19-1-2018.
 */

module.exports = {

    seed: function (req, res, next) {

        createService.createUser(seedService.User, function (err, records) {
            if (err && err.invalidAttributes) {
                console.log(err.Errors);
                return res.negotiate(err);

            } else {
                console.log('created user');

                /*
                *--------------------------------------------------------------------------------------
                *  seed category
                * */

                createService.createCategory(seedService.Category, function (err, records) {
                    if (err && err.invalidAttributes) {
                        console.log(err.Errors);
                        return res.negotiate(err);

                    } else {
                        console.log('created category')

                        /*
                         *--------------------------------------------------------------------------------------
                         *  seed charity
                         * */

                        createService.createCharity(seedService.Charity, function (err, records) {
                            if (err && err.invalidAttributes) {
                                console.log(err.Errors);
                                return res.negotiate(err);

                            } else {
                                console.log('created charity');

                                /*
                                 *--------------------------------------------------------------------------------------
                                 * likes
                                 * */
                                createlikes(function () {
                                    res.created();
                                });

                                function createlikes(callback) {
                                    for (var i = 1; i < seedService.User.length; i++) {
                                        var userId = Math.floor(Math.random() * seedService.User.length) + 1;
                                        var charityId = Math.floor(Math.random() * seedService.Charity.length) + 1;
                                        createService.createLike(userId, charityId, function (err, records) {
                                            if (err && err.invalidAttributes) {
                                                console.log(err.Errors);
                                                res.negotiate(err);

                                            } else {
                                                console.log('created like');

                                            }
                                        });
                                    }
                                    callback();
                                }

                            }
                        });


                    }
                });


            }
        });


    }

};