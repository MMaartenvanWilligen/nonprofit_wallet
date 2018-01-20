/**
 * Created by Gebruiker on 19-1-2018.
 */
var Promise = require('bluebird');

module.exports = {

    seed: function (req, res, next) {

        createUser();

        function createUser() {
            createService.createUser(seedService.User).then(function (result) {
                createCategory();
            }).catch(function (err) {
                console.log(err.Errors);
                return res.negotiate(err);
            });
        }

        function createCategory() {
            createService.createCategory(seedService.Category).then(function (result) {
                createCharity();
            }).catch(function (err) {
                if (err && err.invalidAttributes) {
                    console.log(err.Errors);
                    return res.negotiate(err);

                }
                return res.negotiate(err);
            });
        }

        function createCharity() {
            createService.createCharity(seedService.Charity).then(function (result) {
                createLikes(function () {
                    res.created();
                });
            }).catch(function (err) {
                if (err && err.invalidAttributes) {
                    console.log(err.Errors);
                    return res.negotiate(err);

                }
                return res.negotiate(err);
            });
        }

        function createLikes(done) {

            for (var i = 1; i < seedService.User.length; i++) {
                var userId = Math.floor(Math.random() * seedService.User.length) + 1;
                var charityId = Math.floor(Math.random() * seedService.Charity.length) + 1;

                createService.createLike(userId, charityId).then(function (result) {
                    console.log('created like');

                }).catch(function (err) {
                    console.log(err.Errors);
                });
            }
            done();
        }
    }
};