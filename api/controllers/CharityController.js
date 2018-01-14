/**
 * Created by Gebruiker on 14-1-2018.
 */
var bcrypt = require('bcrypt');

module.exports = {

    getAllCharitys: function (req, res) {
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

    dummydata: function (req, res, next) {

        var dummyData = [
            {"name": "John", "email": "john@mail.nl", "password": "password", "role": "user"},
            {"name": "User", "email": "user@mail.nl", "password": "password", "role": "user"},
            {"name": "Admin", "email": "admin@mail.nl", "password": "password", "role": "admin"},
            {"name": "Maarten", "email": "maarten@mail.nl", "password": "password", "role": "user"},
            {"name": "Felipe", "email": "felipe@mail.nl", "password": "password", "role": "user"},
            {"name": "iris", "email": "iris@mail.nl", "password": "password", "role": "user"}
        ];


        User.create(dummyData).exec(function (err, user) {
            if (err && err.invalidAttributes) {

                console.log(err.Errors);

                return res.ok();

            } else {
                console.log('name is:', user.name);
                return res.ok();
            }
        });

    }


};