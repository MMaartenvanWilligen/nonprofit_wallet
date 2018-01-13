var bcrypt = require('bcrypt');

module.exports = {
    connection: 'localServerSql',
    tableName: 'user',
    schema: true,

    attributes: {
        // e.g., "User"

        id: {
            type: 'integer',
            unique: true,
            primaryKey: true,
            columnName: 'id'
        },
        name: {
            type: 'string',
            required: true,
            columnName: 'name'
        },

        email: {
            type: 'email',
            required: true,
            unique: true,
            columnName: 'email'
        },

        password: {
            required: true,
            type: "string",
            columnName: 'password'
        },

        role: {
            type: "string",
            columnName: 'role'
        }
    },

    validationMessages: {
        name: {
            required: 'Name is required',
            type: "must be a string"
        },

        email: {
            required: 'Email is required',
            email: 'Invalid email',
            unique: 'Email already in use'
        },

        password: {
            required: 'Password is required',
            type: "must be a string"
        }

    },

    beforeCreate: function (values, cb) {

        sails.log("before create");

        bcrypt.hash(values.password, 10, function(err, hash) {
            if(err) return cb(err);
            values.password = hash;
            //calling cb() with an argument returns an error. Useful for canceling the entire operation if some criteria fails.
            cb();
        });
    }
};

/*
module.exports = {
    connection: 'rustyOldMySQLDatabase',
    tableName: 'our_users',
    attributes: {
        id: {
            type: 'integer',
            unique: true,
            primaryKey: true,
            columnName: 'the_primary_key'
        },
        name: {
            type: 'string',
            columnName: 'full_name'
        },
        password: {
            type: 'string',
            columnName: 'seriously_encrypted_password'
        },
        email: {
            type: 'email',
            unique: true,
            columnName: 'email_address'
        }
    }
};*/
