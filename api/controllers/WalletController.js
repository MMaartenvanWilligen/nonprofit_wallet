/**
 * Created by Gebruiker on 21-1-2018.
 */

module.exports = {

    show: function (req, res) {
        findService.searchCharitiesInWallet(req.session.User.id_user).then(function (records) {
            return res.view({wallet: records});
        }).catch(function (err) {
            console.log(err);
            return res.negotiate(err);
        });
    },

    delete: function (req, res) {

        destroyService.destroyCharityfromWallet(req.session.User.id_user, req.param("id")).then(function (records) {
            return res.redirect("user/profile");
        }).catch(function (err) {
            console.log(err);
            return res.negotiate(err);
        });
    }

};