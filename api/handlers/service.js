const { request } = require("https")
const serviceController = require("../../core/controllers/service")

const addService = async(req, res, next) => {

    try {
        let response = await serviceController.addService(req.body)
        req.data = response
        if (response)req.message = "added !"
         else throw new Error ("Something went wromg")
        next()
    } catch (e) {
        req.status = 400;
        next(e)
    }
}

const getService = async(req, res, next) => {
    try {
        let response = await serviceController.getService(req.body)
        req.data = response
        next()
    } catch (e) {
        req.status = 400;
        next(e)
    }
}

const deleteService = async(req, res, next) => {
    try {
        let response = await serviceController.deleteService(req.params.id)
        if (response)req.message = "deleted !"
         else throw new Error ("Something went wromg")
        next()
    } catch (e) {
        req.status = 400;
        next(e)
    }
}

const updateService = async(req, res, next) => {
    try {
        let response = await serviceController.updateService(req.body)
        if (response)req.message = "updated !"
         else throw new Error ("Something went wromg")
        next()
    } catch (e) {
        req.status = 400;
        next(e)
    }
}

module.exports = {
    addService,
    updateService,
    getService,
    deleteService
}