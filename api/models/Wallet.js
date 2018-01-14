/**
 * Created by Gebruiker on 14-1-2018.
 */

/**
 * Created by Gebruiker on 14-1-2018.
 */
module.exports = {
    connection: 'localServerSql',
    tableName: 'wallet',
    schema: true,

    attributes: {
        // e.g., "User"

        id_wallet: {
            type: 'integer',
            unique: true,
            primaryKey: true,
            autoIncrement: true,
            columnName: 'id_wallet'
        },

        name: {
            type: 'string',
            size: 80,
            required: true,
            columnName: 'name'
        },

        public: {
            type: "boolean",
            required: true,
            columnName: 'public'
        },

        // wallet may have one user
        user:{
            model:'user',
            unique: true
        },

        // wallet may have many charity's
        charitys: {
            collection: 'charity',
            via: 'wallets',
            dominant: true
        }


    },

    validationMessages: {
        name: {
            required: 'Name is required',
            type: "must be a string"
        },

        public: {
            required: 'public is required',
            type: "must be a boolean"
        }

    }

};
