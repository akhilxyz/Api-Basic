const { request } = require("https")
const paymentController = require("../../core/controllers/payment")

const addPayment = async(req, res, next) => {
    try {
        let response = await paymentController.addPayment(req.body)
        req.data = response
        if (response)req.message = "added !"
         else throw new Error ("Something went wromg")
        next()
    } catch (e) {
        req.status = 400;
        next(e)
    }
}

// const getPayment = async(req, res, next) => {
//     try {
//         let response = await paymentController.getPayment(req.body)
//         req.data = response
//         next()
//     } catch (e) {
//         req.status = 400;
//         next(e)
//     }
// }

// const deletePayment = async(req, res, next) => {
//     try {
//         let response = await paymentController.deletePayment(req.params.id)
//         if (response)req.message = "deleted !"
//          else throw new Error ("Something went wromg")
//         next()
//     } catch (e) {
//         req.status = 400;
//         next(e)
//     }
// }

// const updatePayment = async(req, res, next) => {
//     try {
//         let response = await paymentController.updatePayment(req.body)
//         if (response)req.message = "updated !"
//          else throw new Error ("Something went wromg")
//         next()
//     } catch (e) {
//         req.status = 400;
//         next(e)
//     }
// }

module.exports = {
    addPayment,
    updatePayment,
    getPayment,
    deletePayment
}