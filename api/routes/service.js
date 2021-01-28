const router = require('express').Router()
const serviceHandler = require('../handlers/service')


router.put('/', serviceHandler.addService)

router.post('/update', serviceHandler.updateService)


router.post("/", serviceHandler.getService);

router.delete("/:id", serviceHandler.deleteService);

module.exports = router