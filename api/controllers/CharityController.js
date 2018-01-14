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
    },

    dummydata: function (req, res, next) {

        var dummyData = [
            {
                "name": "Rode kruis",
                "description": "Dispatched entreaties boisterous say why stimulated. Certain forbade picture now prevent carried she get see sitting. Up twenty limits as months. Inhabit so perhaps of in to certain."
            },
            {
                "name": "Dierennood",
                "description": "Dispatched entreaties boisterous say why stimulated. Certain forbade picture now prevent carried she get see sitting. Up twenty limits as months. Inhabit so perhaps of in to certain."
            },
            {
                "name": "Kika",
                "description": "Dispatched entreaties boisterous say why stimulated. Certain forbade picture now prevent carried she get see sitting. Up twenty limits as months. Inhabit so perhaps of in to certain."
            },
            {
                "name": "Ronald Macdonald Fonds",
                "description": "Dispatched entreaties boisterous say why stimulated. Certain forbade picture now prevent carried she get see sitting. Up twenty limits as months. Inhabit so perhaps of in to certain."
            },
            {
                "name": "War Child",
                "description": "Dispatched entreaties boisterous say why stimulated. Certain forbade picture now prevent carried she get see sitting. Up twenty limits as months. Inhabit so perhaps of in to certain."
            },
            {
                "name": "Amnesty International",
                "description": "Dispatched entreaties boisterous say why stimulated. Certain forbade picture now prevent carried she get see sitting. Up twenty limits as months. Inhabit so perhaps of in to certain."
            },
            {
                "name": "Wereld Natuurfonds",
                "description": "Dispatched entreaties boisterous say why stimulated. Certain forbade picture now prevent carried she get see sitting. Up twenty limits as months. Inhabit so perhaps of in to certain."
            },
        ];


        Charity.create(dummyData).exec(function (err, user) {
            if (err && err.invalidAttributes) {

                return res.redirect("charity/show");

            } else {
                console.log('name is:', user.name);
                return res.redirect("charity/show");
            }
        });

    }

};