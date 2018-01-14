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
            columnName: 'id_charity'
        },

        name: {
            type: 'string',
            required: true,
            columnName: 'name'
        },

        description: {
            type: 'string',
            columnName: 'description'
        },

        // charity may have one category

        category: {
            model:'category'
        },

        // charity may have many wallets
        wallets: {
            collection: 'wallet',
            via: 'charity'
        },

        // charity may have many likes
        likes: {
            collection: 'like',
            via: 'charity'
        }

    },

    validationMessages: {
        name: {
            required: 'Name is required',
            type: "must be a string"
        },

        description: {
            type: "must be a string"
        }


    }

};
