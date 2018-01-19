/**
 * Created by Gebruiker on 14-1-2018.
 */
module.exports = {
    connection: 'localServerSql',
    tableName: 'charity',
    schema: true,

    attributes: {
        // e.g., "User"

        id_charity: {
            type: 'integer',
            unique: true,
            primaryKey: true,
            autoIncrement: true,
            columnName: 'id_charity'
        },

        name: {
            type: 'string',
            size: 120,
            required: true,
            columnName: 'name'
        },

        description: {
            type: 'text',
            size: 300,
            columnName: 'description'
        },

        // charity may have one category
        category: {
            model:'category',
            required: true
        },

        // charity may have many wallets
        wallets: {
            collection: 'wallet',
            via: 'charities'
        },

        // charity may have many likes
        likes: {
            collection: 'user',
            via: 'charity',
            through: 'like'
        }

    },

    validationMessages: {
        name: {
            required: 'Name is required',
            type: "must be a string"
        },

        description: {
            type: "must be a string"
        },

        category: {
            required: 'Name is required'
        }

    }

};
