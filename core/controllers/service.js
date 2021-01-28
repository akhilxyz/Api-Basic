//import use cases
const Service = require("../usecases/service")
const DateFormatter = require("../lib/DateFormatter");

exports.getService = async (filters) => {

    let filter = {};
    if (filters.id) filter._id = filters.id;
    if (filters.name) filter.name = filters.name;


    let serviceRecord = await Service.get(filter)
    let response = [];

    response = serviceRecord.map(it => {
        return {
            id: it._id,
            name: it.name,
            description: it.description,
            price: it.price,
            created_on: DateFormatter.format(it.created_on),
            modified_on: DateFormatter.format(it.modified_on)
        }
    })

    return response;
}

exports.addService = async (data) => {

    if (!data.name) throw new Error('service Name is Required');
    if (!data.price) throw new Error('service price is Required');

    let newService = {
        name: data.name,
        description: data.description || null,
        price: data.price
    }
    let savedRecord = await Service.add(newService)
    return {
        id: savedRecord._id,
        name: savedRecord.name,
        description: savedRecord.description,
        price: savedRecord.price,
        created_on: DateFormatter.format(savedRecord.created_on),
        modified_on: DateFormatter.format(savedRecord.modified_on)
    }
}

exports.deleteService = async(Id) => {
    if (!Id) throw new Error("Please Enter Service Id");

    let Response = await Service.remove(Id)
    return Response;
}


exports.updateService = async(serviceprops) => {
    let serviceId = serviceprops.id;
    if(serviceprops.reps){
        serviceprops.reps = (serviceprops.reps).split(",");
    }
    if (!serviceprops.id) throw new Error("Please provide service Id");
    let filter = {}
    if (serviceprops.name) filter.name = serviceprops.name;
    if (serviceprops.description) filter.description = serviceprops.description;
    if (serviceprops.price) filter.price = serviceprops.price;  
    let updateService = await Service.update(serviceId, filter,) ;
    return {updateService };
}