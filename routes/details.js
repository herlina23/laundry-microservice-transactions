const express = require('express')
const verifyToken = require('../middlewares/verifyToken')
const router = express.Router()

const { index, show, store, update, search, destroy } = require('../controllers/detail')


router.get('/',index)
router.get('/:id',show)
router.use(verifyToken)
router.post('/',store)
router.put('/:id',update)
router.delete('/:id',destroy)

module.exports = router