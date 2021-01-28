//import use cases
const Notification = require("../usecases/notification")
const DateFormatter = require("../lib/DateFormatter");
const Mailer = require('../lib/Mailer');
require('dotenv').config();


exports.getNotifications = async (filters) => {

    let filter = {};
    if (filters.id) filter._id = filters.id;
    if (filters.company) filter.company = filters.company;

    let notifications = await Notification.get(filter)
    let response = [];

    response = notifications.map(it => {
        return {
            id: it._id,
            company: it.company,
            services: it.services,
            message: it.message,
            expiry: it.expiry,
            renew: it.renew,
            email: it.email,
            created_on: DateFormatter.format(it.created_on),
            modified_on: DateFormatter.format(it.modified_on)
        }
    })

    return response;
}

exports.addNotifications = async (data) => {
    
    if (!data.company) throw new Error('Company Name is Required');
    if (!data.services) throw new Error('Service Name is Required');
    if (!data.expiry) throw new Error('Expiry Date is Required');
    if (!data.message) throw new Error('Message is Required');
    if(!data.email) throw new Error('Email is Required');

    let msg = {
       message : data.message,
       service : data.service,
       expiry  : data.expiry,
       renew : data.renew  || null,
       
    }

    let msgBody = JSON.stringify(msg)
    let email = JSON.stringify(data.email)

    Mailer('Webhopers', email , msgBody)

    let newNotification = {
        company: data.company,
        services: data.services,
        message: data.message,
        expiry: data.expiry,
        email : data.email,
        renew: data.renew || null,
    }
    

    let savedRecord = await Notification.add(newNotification)
    return {
        id: savedRecord._id,
        company: savedRecord.name,
        services: savedRecord.services,
        message: savedRecord.message,
        expiry: savedRecord.expiry,
        renew: savedRecord.renew,
        created_on: DateFormatter.format(savedRecord.created_on),
        modified_on: DateFormatter.format(savedRecord.modified_on)
    }
}

exports.deleteNotifications = async(Id) => {
    if (!Id) throw new Error("Please Enter Notification Id");

    let Response = await Notification.remove(Id)
    return Response;
}


exports.updateNotifications = async(notificationprops) => {
    let notificationId = notificationprops.id;
    if(notificationprops.reps){
        notificationprops.reps = (notificationprops.reps).split(",");
    }
    if (!notificationprops.id) throw new Error("Please provide Notification Id");
    let filter = {}
    if (notificationprops.company) filter.company = notificationprops.company;
    if (notificationprops.services) filter.services = notificationprops.services;
    if (notificationprops.message) filter.message = notificationprops.message;
    if (notificationprops.expiry) filter.expiry = notificationprops.expiry;
    if (notificationprops.renew) filter.renew = notificationprops.renew;
    if (notificationprops.email) filter.email = notificationprops.email;

    let msg = {
        message : filter.message ,
        service : filter.services,
        expiry  : filter.expiry,
        renew : filter.renew || null,
     }
 
     let msgBody = JSON.stringify(msg)
     let email = JSON.stringify(filter.email)
 
     Mailer('Webhopers', email , msgBody)

    let updateNotifications = await Notification.update(notificationId , filter);

    return updateNotifications;
}