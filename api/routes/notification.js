const router = require('express').Router()
const notificationsHandler = require('../handlers/notifications')


router.put('/', notificationsHandler.addNotifications)

router.post('/update', notificationsHandler.updateNotifications)

router.post('/send', notificationsHandler.updateNotifications)

router.post("/", notificationsHandler.getNotifications);

router.delete("/:id", notificationsHandler.deleteNotifications);

module.exports = router