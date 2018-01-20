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

            findService.allCategories().then(function (records) {
                return res.view({categories: records, records: charities})
            }).catch(function (err) {
                return res.negotiate(err);
            });

        });

    },

    search: function (req, res) {
        console.log("search" + " " + req.params.all());
        console.log(req.params.all());
        var searchString = req.param("searchString");
        var category = req.param("category");

        validationService.searchForm(searchString, category).then(function () {
            console.log("go to search");
            searchCharity();
        }).catch(function (err) {
            return res.view('charity/show', {formError: err});
        });

        function searchCharity () {
            console.log("in search");

            findService.searchCharities(req.params.all()).then(function (records) {

                console.log("search done");
                console.log(records);
                var charities = records;

                findService.allCategories().then(function (records) {
                    return res.view("charity/show", {categories: records, records: charities});
                }).catch(function (err) {
                    return res.negotiate(err);
                });

            }).catch(function (err) {
                if (err) {
                    return res.negotiate(err);
                } else {
                    return res.redirect("charity/show");
                }
            })
        }
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