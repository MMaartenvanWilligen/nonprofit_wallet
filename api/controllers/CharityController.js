/**
 * Created by Gebruiker on 14-1-2018.
 */
var bcrypt = require('bcrypt');

module.exports = {

    overview: function (req, res) {
        return res.view();
    },

    show: function (req, res) {

        Charity.find().populate("likes").exec(function (err, records) {

            if (err) {
                return res.negotiate(err);
            } else {

                var charities = records;
            }

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

        validationService.searchForm(searchString, category, function (err) {

            if (err) {
                console.log("err validation. res");
                return res.redirect("charity/show");

            } else {
                console.log("go to search");
                searchCharity();
            }
        });

        function searchCharity() {
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

    like: function (req, res) {
        console.log(req.params.all());
        console.log(req.param("id"));

        if (req.param("id") && req.param("id") !== null) {
            createService.createLike(1, req.param("id")).then(function (records) {
                return res.redirect("charity/show");
            }).catch(function (err) {
                console.log(err);
                return res.negotiate(err);
            });
        }
    },

    add: function (req, res) {
        console.log(req.params.all());
        console.log(req.param("id"));

        if (req.param("id") && req.param("id") !== null) {
            createService.addCharityToWallet(req.session.User.id_user, req.param("id")).then(function (records) {
                return res.redirect("charity/show");
            }).catch(function (err) {
                console.log(err);
                return res.negotiate(err);
            });
        } else {
            console.log("id not there")
        }
    },

    /**
     *
     */
    detail: function (req, res) {
        console.log("detail");
        findService.searchCharityPopulateLikes(req.param("id")).then(function (records) {
            var charity = records;
            console.log(charity[0].category);
            findService.searchCategory(charity[0].category).then(function (record) {
                console.log(record);
                console.log(record.category);
                return res.view({records: charity, category: record[0].category});

            }).catch(function (err) {
                console.log(err);
                return res.negotiate(err);
            });


        }).catch(function (err) {
            console.log(err);
            return res.negotiate(err);
        });

    },

    homepage: function (req, res) {

        Charity.find({limit: 2}).populate("likes").exec(function (err, records) {
            if (err) {
                return res.negotiate(err);
            } else {
                return res.view("homepage",{records: records})
            }
        });

    }

};
