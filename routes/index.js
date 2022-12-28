const router = require('express').Router();
//Imports
const apiRoutes = require('./api');

// add prefix for routes
router.use('/api', apiRoutes);

//Default route
router.use((req, res) => {
    res.status(404).send('404 Error Page Not Found!');
});

//Export
module.exports = router;