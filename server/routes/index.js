const express = require("express");
const router = express.Router({ mergeParams: true });

router.use('/regions', require('./region.routes'))
// router.use('/deputy', require('./deputy.routes'))
// router.use('/rule', require('./rule.routes'))
// router.use('/auth', require('./auth.routes'))
// router.use('/user', require('./user.routes'))
// router.use('/comment', require('./comment.routes'))
// router.use('/rat', require('./testRegions.routes'))


module.exports = router