/**
 * Created by Gebruiker on 14-1-2018.
 */

module.exports = {

    allCategories: function (done) {

        Category.find().exec(function (err, records) {
            if (err) {
                done(err, records)
            }

            if (records) {
                done(err, records);
            }
        });

    },

    searchCharities: function (options, done) {

        console.log("searchCharities");
        console.log(options);
        console.log(options.category);
        console.log(options.searchString);


        if (options.category && options.searchString) {

            Charity.find({
                category: options.category,
                or: [
                    {name: options.searchString},
                    {description: options.searchString}
                ]
            }).exec(function (err, records) {
                if (err) {
                    done(err, records)
                }

                if (records) {
                    done(err, records);
                }
            });

        }

        else if (options.category) {
            Charity.find({
                category: options.category
            }).exec(function (err, records) {
                if (err) {
                    done(err, records)
                }

                if (records) {
                    done(err, records);
                }
            });
        }

        else {

            Charity.find({
                or: [
                    {name: options.searchString},
                    {description: options.searchString}
                ]
            }).exec(function (err, records) {
                if (err) {
                    done(err, records)
                }

                if (records) {
                    done(err, records);
                }
            });
        }
    },

    searchCharitiesInWallet: function (options, done) {

        console.log("searchCharities");
        console.log(options);
        console.log(options.userId);


        Wallet.find({user: options.UserId})
            .populate("charities")
            .exec(function (err, users) {
                // handle error

                // The users object would look something like the following
                // [{
                //   id: 123,
                //   firstName: 'Foo',
                //   lastName: 'Bar',
                //   pets: [{
                //     id: 1,
                //     breed: 'labrador',
                //     type: 'dog',
                //     name: 'fido',
                //     user: 123
                //   }]
                // }]
            });
    },




};