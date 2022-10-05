const router = require('express').Router();
const thoughtRoutes = require ('thoughtRoutes')
const userRoutes = require('userRoutes');


router.use('/api', userRoutes);
router.use('/api', thoughtRoutes)

module.exports = router; 