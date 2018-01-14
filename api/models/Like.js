module.exports = {
    connection: 'localServerSql',
    tableName: 'like',
    schema: true,

    attributes: {
        // e.g., "User"

        id_like: {
            type: 'integer',
            unique: true,
            primaryKey: true,
            columnName: 'id_charity'
        },

        //a like may have one user
        user: {
            model: 'user'
        },

        //a like may have one charity
        charity: {
            model: 'charity'
        }

    }

};
