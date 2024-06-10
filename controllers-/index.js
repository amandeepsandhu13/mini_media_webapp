const router = require('express').Router();

const apiRoutes = require('./api');
const userControllerRoutes = require('./userControllerRoutes');

router.use('/', userControllerRoutes);
router.use('/api', apiRoutes);

module.exports = router;

