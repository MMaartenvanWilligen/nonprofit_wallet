/**
 * Created by Gebruiker on 14-1-2018.
 */

var Promise = require("bluebird");

module.exports = {

    allCategories: function () {

        return new Promise(function (resolve, reject) {

            Category.find().exec(function (err, records) {
                if (err) {
                    reject(err)
                }

                if (records) {
                    resolve(records)
                }
            });
        });
    },

    searchCharities: function (options) {

        console.log("searchCharities");
        console.log(options.category);
        console.log(options.searchString);

        return new Promise(function (resolve, reject) {

            if (options.category && options.searchString && options.category !== "" && options.searchString !== "") {
                console.log("category and string");
                Charity.find({
                    category: options.category,
                    or: [{
                        or : [
                            { name: {contains: options.searchString}},
                            { description: {contains: options.searchString}}
                        ]
                    }]
                }).populate('likes').exec(function (err, records) {
                    if (err) {
                        reject(err)
                    }

                    if (records) {
                        resolve(records)
                    }
                });

            }
            else if (options.searchString && options.searchString !== "") {
                console.log("searchstring");
                console.log(options.searchString);

                Charity.find({
                    or : [
                        { name: {contains: options.searchString}},
                        {description: {contains: options.searchString}}
                    ]
                }).populate("likes").exec(function (err, records) {
                    if (err) {
                        reject(err)
                    }

                    if (records) {
                        resolve(records)
                    }
                });
            }

            else if (options.category && options.category !== "") {
                console.log("category");
                Charity.find({
                    category: options.category
                }).populate("likes").exec(function (err, records) {
                    if (err) {
                        reject(err)
                    }

                    if (records) {
                        resolve(records)
                    }
                });
            }

            else {
                reject("no valid search")
            }
        });
    },

    searchCharitiesInWallet: function (userId) {

        console.log("searchCharities");
        console.log(userId);

        return new Promise(function (resolve, reject) {

            Wallet.find({user: options.UserId})
                .populate("charities")
                .exec(function (err, users) {
                    if (err) {
                        reject(err)
                    }

                    if (users) {
                        resolve(users)
                    }
                });
        });
    }




};