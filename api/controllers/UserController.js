module.exports = {
    login: function (req, res) {
        console.log(req.User);
        res.view("user/login");
    },

    signup: function (req, res) {
        console.log(req.User);
        res.view("user/login");
    },

    logout: function (req, res) {
        console.log(req.User);
        res.view("user/login");
    }


};