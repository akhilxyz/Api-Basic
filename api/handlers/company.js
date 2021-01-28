const { request } = require("https")
const companyController = require("../../core/controllers/company.js")

const addCompany = async(req, res, next) => {
    try {
        let response = await companyController.addCompany(req.body)
        req.data = response
        if (response)req.message = "added !"
         else throw new Error ("Something went wromg")
        next()
    } catch (e) {
        req.status = 400;
        next(e)
    }
}

const getCompany = async(req, res, next) => {
    try {
        let response = await companyController.getCompany(req.body)
        req.data = response
        next()
    } catch (e) {
        req.status = 400;
        next(e)
    }
}

const deleteCompany = async(req, res, next) => {
    try {
        let response = await companyController.deleteCompany(req.params.id)
        if (response)req.message = "deleted !"
         else throw new Error ("Something went wromg")
        next()
    } catch (e) {
        req.status = 400;
        next(e)
    }
}
const updateCompany = async(req, res, next) => {
    try {
        let response = await companyController.updateCompany(req.body)
        if (response)req.message = "updated !"
         else throw new Error ("Something went wromg")
        next()
    } catch (e) {
        req.status = 400;
        next(e)
    }
}

module.exports = {
    addCompany,
    updateCompany,
    getCompany,
    deleteCompany
}