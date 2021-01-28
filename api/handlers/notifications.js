const { request } = require("https")
const notificationsController = require("../../core/controllers/notification")

const addNotifications = async(req, res, next) => {

    try {
        let response = await notificationsController.addNotifications(req.body)
        req.data = response
        if (response)req.message = "added !"
          else throw new Error ("Something went wromg")
        next()
    } catch (e) {
        req.status = 400;
        next(e)
    }
}

const getNotifications = async(req, res, next) => {
    try {
        let response = await notificationsController.getNotifications(req.body)
        req.data = response
        next()
    } catch (e) {
        req.status = 400;
        next(e)
    }
}

const deleteNotifications = async(req, res, next) => {
    try {
        let response = await notificationsController.deleteNotifications(req.params.id)
        if (response)req.message = "deleted !"
         else throw new Error ("Something went wromg")
        next()
    } catch (e) {
        req.status = 400;
        next(e)
    }
}

const updateNotifications = async(req, res, next) => {
    try {
        let response = await notificationsController.updateNotifications(req.body)
        if (response)req.message = "updated !"
         else throw new Error ("Something went wromg")
        next()
    } catch (e) {
        req.status = 400;
        next(e)
    }
}

const sendNotifications = async(req, res, next) => {
    try {
        let response = await notificationsController.sendNotifications(req.body)
        if (response)req.message = "updated !"
         else throw new Error ("Something went wromg")
        next()
    } catch (e) {
        req.status = 400;
        next(e)
    }
}

module.exports = {
    addNotifications,
    updateNotifications,
    getNotifications,
    deleteNotifications,
    sendNotifications
}