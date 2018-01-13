module.exports = {
    attributes: {
        // e.g., "User"

        schema: true,

        name: {
            type: 'string',
            required: true
        },

        email: {
            type: 'email',
            required: true,
            unique: true
        },

        password: {
            required: true,
            type: "string"
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
