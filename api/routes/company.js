const router = require('express').Router()
const companyHandler = require('../handlers/company')


router.put('/', companyHandler.addCompany)

router.post('/update', companyHandler.updateCompany)

router.post("/", companyHandler.getCompany);

router.delete("/:id", companyHandler.deleteCompany);

module.exports = router