const { NotFoundError } = require('../middleware/errors');
const Job = require('../models/Job');

const create = async (name) => {
    const newJob = new Job({
        name,
    });
    await newJob.save();
    return newJob;
};

const getAll = async () => {
    const allJobs = await Job.find({});
    return allJobs;
}

module.exports = {
    create,
    getAll,
}