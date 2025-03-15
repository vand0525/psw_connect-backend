const jobService = require('../services/job');

const create = async (req, res, next) => {
    try {
        const {name} = req.body;
        const newJob = await jobService.create(name);
        res.status(201).json({
            data: newJob,
        });
    } catch (err) {
        next(err);
    }
};

const getAll = async (req, res, next) => {
    try {
        const jobs = await jobService.getAll();
        res.status(200).json({
            data: jobs,
        });
    } catch (err){
        next(err);
    }
}

module.exports = {
    create,
    getAll,
}