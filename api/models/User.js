module.exports = {
    attributes: {
        // e.g., "User"
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