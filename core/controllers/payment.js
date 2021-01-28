//import use cases
const Payment = require("../usecases/Payment")
const DateFormatter = require("../lib/DateFormatter");



exports.addPayment = async (data) => {
    if (!data.company) throw new Error('Payment Name is Required');
    if (!data.Services) throw new Error('Payment price is Required');
    let newPayment = {
        Company: data.company,
        Services: data.service }
    let savedRecord = await Payment.add(newPayment)
    return {
        id: savedRecord._id,
        Company: savedRecord.company,
        Services: savedRecord.service,
        created_on: DateFormatter.format(savedRecord.created_on),
        modified_on: DateFormatter.format(savedRecord.modified_on)
    }
}



// exports.getPayment = async (filters) => {

//     let filter = {};
//     if (filters.id) filter._id = filters.id;
//     if (filters.name) filter.name = filters.name;


//     let PaymentRecord = await Payment.get(filter)
//     let response = [];

//     response = PaymentRecord.map(it => {
//         return {
//             id: it._id,
//             name: it.name,
//             description: it.description,
//             price: it.price,
//             created_on: DateFormatter.format(it.created_on),
//             modified_on: DateFormatter.format(it.modified_on)
//         }
//     })

//     return response;
// }


// exports.deletePayment = async(Id) => {
//     if (!Id) throw new Error("Please Enter Payment Id");

//     let Response = await Payment.remove(Id)
//     return Response;
// }


// exports.updatePayment = async(Paymentprops) => {
//     let PaymentId = Paymentprops.id;
//     if(Paymentprops.reps){
//         Paymentprops.reps = (Paymentprops.reps).split(",");
//     }
//     if (!Paymentprops.id) throw new Error("Please provide Payment Id");
//     let filter = {}
//     if (Paymentprops.name) filter.name = Paymentprops.name;
//     if (Paymentprops.description) filter.description = Paymentprops.description;
//     if (Paymentprops.price) filter.price = Paymentprops.price;

//     let updatePayment = await Payment.update(PaymentId, filter);

//     return updatePayment;
// }