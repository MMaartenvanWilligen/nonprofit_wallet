module.exports = {
    attributes: {
        // e.g., "User"

        schema: true,

        name: {
            type: 'string',
            required: true
        },

        email: {
            type: 'string',
            email: true,
            required: true,
            unique: true
        },

        encryptedPassword: {
            type: "string"
        }

    }
};