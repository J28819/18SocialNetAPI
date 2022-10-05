const router = require('express').Router();
const thoughtRoutes = require ('./api/thoughtRoutes')
const userRoutes = require('./api/userRoutes');


router.use('/api', userRoutes);
router.use('/api', thoughtRoutes)

module.exports = router; 