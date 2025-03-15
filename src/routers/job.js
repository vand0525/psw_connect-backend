const {Router} = require('express');

const jobController = require('../controllers/job');
const validObjectId = require('../middleware/validObjectId');

const router = Router();

router.post('/', jobController.create);
router.get('/', jobController.getAll);

module.exports = router;