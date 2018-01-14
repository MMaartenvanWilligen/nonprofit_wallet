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

        if (options.category) {

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

        } else {

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
    }

};