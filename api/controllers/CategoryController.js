/**
 * Created by Gebruiker on 14-1-2018.
 */
/**
 * Created by Gebruiker on 14-1-2018.
 */
module.exports = {

    show: function (req, res) {

        findService.allCategories(function (err, records) {
            if (err) {
                return res.serverError(err);
            }

            // It worked!
            return res.view({records: records})
        })

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
                "category": "Dieren"
            },
            {
                "category": "Gezondheid"
            },
            {
                "category": "Armoede"
            },
            {
                "category": "Milieu"
            },
            {
                "category": "Mensenrechten"
            },
            {
                "category": "Kinderen"
            }
        ];


        Category.create(dummyData).exec(function (err, user) {
            if (err && err.invalidAttributes) {

                return res.redirect("category/show");

            } else {
                console.log('name is:', user.name);
                return res.redirect("category/show");
            }
        });

    }

};