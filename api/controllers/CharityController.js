/**
 * Created by Gebruiker on 14-1-2018.
 */
var bcrypt = require('bcrypt');

module.exports = {

    overview: function (req, res) {
        return res.view();
    },

    show: function (req, res) {

        Charity.find().exec(function (err, records) {

            if (err) {
                return res.negotiate(err);
            }

            var charities = records;

            findService.allCategories(function (err, records) {
                if (err) {
                    return res.negotiate(err);
                }

                // It worked!
                return res.view({categories: records, records: charities})
            });

        });

    },

    search: function (req, res) {
        console.log(req.params.all());
        var options = req.params.all();


        findService.searchCharities(options, function (err, records) {
            if (err) {
                return res.negotiate(err);
            }
            console.log("search done");
            console.log(records);
            var charities = records;

            findService.allCategories(function (err, records) {
                if (err) {
                    return res.negotiate(err);
                }

                // It worked!
                return res.view("charity/show", {categories: records, records: charities})
            });
        });
    },


    /**
     * CommentController.destroy()
     */
    destroy: function (req, res) {
        return res.json({
            todo: 'Not implemented yet!'
        });
    }


};