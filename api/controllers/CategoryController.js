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
    }


};