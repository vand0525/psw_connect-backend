const { model, Schema} = require('mongoose');

const jobSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
)

module.exports = model('Job', jobSchema);