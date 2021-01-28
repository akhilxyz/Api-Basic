//import use cases
const Company = require("../usecases/company")
const DateFormatter = require("../lib/DateFormatter");

exports.getCompany = async (filters) => {

    let filter = {};
    if (filters.id) filter._id = filters.id;
    if (filters.name) filter.name = filters.name;


    let serviceRecord = await Company.get(filter)
    let response = [];

    response = serviceRecord.map(it => {
        return {
            id: it._id,
            name: it.name,
            vat: it.vat,
            phone: it.phone || null,
            website: it.website || null,
            address: it.address,
            service: it.service,
            created_on: DateFormatter.format(it.created_on),
            modified_on: DateFormatter.format(it.modified_on)
        }
    })

    return response;
}




exports.addCompany = async (data) => {

    if (!data.name) throw new Error('Company Name is Required');
    if (!data.vat) throw new Error('Company Vat No. is Required');
    if (!data.address) throw new Error('Company Address is Required');
    if (!data.service) throw new Error('Service name is Required ');

    let newCompany = {
        name: data.name,
        vat: data.vat,
        phone: data.phone || null,
        website: data.website || null,
        address: data.address,
        service: data.service,
        
    }

    let savedRecord = await Company.add(newCompany)
    return {
        id: savedRecord._id,
        name: savedRecord.name,
        vat: savedRecord.vat,
        phone: savedRecord.phone,
        website: savedRecord.website,
        address: savedRecord.address,
        service: savedRecord.service,
        created_on: DateFormatter.format(savedRecord.created_on),
        modified_on: DateFormatter.format(savedRecord.modified_on)
    }
}

exports.deleteCompany = async(Id) => {
    if (!Id) throw new Error("Please Enter Company Id");

    let Response = await Company.remove(Id)
    return Response;
}


exports.updateCompany = async(companyprops) => {
    let companyId = companyprops.id;
    if(companyprops.reps){
        companyprops.reps = (companyprops.reps).split(",");
    }
    if (!companyprops.id) throw new Error("Please provide company Id");
    let filter = {}
    if (companyprops.name) filter.name = companyprops.name;
    if (companyprops.vat) filter.vat = companyprops.vat;
    if (companyprops.phone) filter.phone = companyprops.phone;
    if (companyprops.website) filter.website = companyprops.website;
    if (companyprops.address) filter.address = companyprops.address;
    if (companyprops.service) filter.service = companyprops.service;



    let updateCompany = await Company.update(companyId, filter);

    return updateCompany;
}