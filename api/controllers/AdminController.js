/**
 * Created by Gebruiker on 13-1-2018.
 */

module.exports = {


    edit: function (req, res) {
        return res.json({
            todo: 'Not implemented yet!'
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

    dashboard: function (req, res) {

        findService.allUsers().then(function (records) {
            return res.view({records: records});
        }).catch(function (err) {
            console.log(err);
            return res.negotiate(err);
        });
    },

    /**
     * CommentController.tag()
     */
    activateNonProfit: function (req, res) {
        return res.json({
            todo: 'Not implemented yet!'
        });
    },

    deActivateNonProfit: function (req, res) {
        return res.json({
            todo: 'Not implemented yet!'
        });
    },

    showUsers: function (req, res) {
        return res.json({
            todo: 'Not implemented yet!'

        });
    }


};