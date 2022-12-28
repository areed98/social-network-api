// Imports
const router = require('express').Router();
const userRoutes = require('./user-Routes');
const thoughtRoutes = require('./thought-routes');

//prefix
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

//Export
module.exports = router;