const { model, Schema} = require('mongoose');

const userSchema = new Schema(
    {
        auth0Id: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['client', 'provider', 'unassigned'],
            default: 'unassigned'
        }

    },
    {
        timestamps: true,
    }
)

module.exports = model('User', userSchema);