module.exports = {
    connection: 'localServerSql',
    tableName: 'category',
    schema: true,

    attributes: {
        // e.g., "User"

        id_category: {
            type: 'integer',
            unique: true,
            primaryKey: true,
            autoIncrement: true,
            columnName: 'id_category'
        },

        category: {
            type: 'string',
            size: 80,
            required: true,
            columnName: 'category'
        },

        //a category may have multiple Charity's
        charitys:{
            collection:'charity',
            via:'category'
        }

    },

    validationMessages: {

        category: {
            required: 'Category is required',
            type: "must be a string"
        }

    }

};
