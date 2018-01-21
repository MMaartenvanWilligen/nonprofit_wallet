/**
 * Created by Gebruiker on 13-1-2018.
 */

module.exports = {


    dashboard: function (req, res) {

        findService.allUsers().then(function (records) {
            return res.view({records: records});
        }).catch(function (err) {
            console.log(err);
            return res.negotiate(err);
        });
    }


};