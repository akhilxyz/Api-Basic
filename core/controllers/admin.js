//import use cases
const addAdmin = require("../usecases/admin/addAdmin")
const getAdmin = require("../usecases/admin/getAdmin")
const updateAdmin = require("../usecases/admin/updateAdmin")
const jwt = require("jsonwebtoken");
const comparaPassword = require("../usecases/admin/comparePassword");
const nodemailer = require("nodemailer");

//import bcrypt for pasword hashing
const bcrypt = require("bcrypt");


exports.getAdminDetails = async() =>{

    let adminRecord = await getAdmin({});
    if(!adminRecord) return null;
    return {
        name: adminRecord.name,
        email: adminRecord.email,
        phone: adminRecord.phone,
        company: adminRecord.company
    }
}

//Add admin
exports.addAdmin = async (admin)=>{

    if (!admin.name) throw new Error('admin Name is Required');
    if (!admin.email) throw new Error('admin email is Required');
    if (!admin.phone) throw new Error('admin phone is Required');
    if (!admin.company) throw new Error('admin company is Required');
    if (!admin.password) throw new Error('admin password is Required');

    //hashing password
    let passwordHash = bcrypt.hashSync(admin.password,10);
    
    let newadmin = {
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        company:admin.company,
        profile_pic:null,
        password_hash:passwordHash,
        created_on: new Date(Date.now())
    }
    let savedadmin = await addAdmin(newadmin);

    delete savedadmin.__v
    delete savedadmin.modified_on
    delete savedadmin.created_on
    delete savedadmin.password_hash

    return savedadmin;
}

exports.adminLogin = async(adminprops)=>{
    let adminRecord = await getAdmin({email:adminprops.email})

    if(!adminRecord)
        return {Error:"Invalid Email"}
    const PasswordMatch = await bcrypt.compare(adminprops.password, adminRecord.password_hash);
    if(!PasswordMatch)
        return {Error:"Password not matched"}
   
    const token = jwt.sign(
            {
                Id: adminRecord._id,
                Name:adminRecord.name,
                Company:adminRecord.company,
                Email:adminRecord.email,
                Phone:adminRecord.phone,
                Profile_pic:adminRecord.profile_pic
            },
            "secret"
            ,
            { expiresIn: 619999}
        );

    adminRecord =  {
        token:token
    }
    return adminRecord;
}

exports.adminProfile = async(admin)=>{
   let adminData = {
        id:admin.Id,
        name:admin.Name,
        email:admin.Email,
        phone:admin.Phone,
        company:admin.Company,
        profile_pic:admin.Profile_pic
   };
   return adminData;
}

//update admin
exports.updateAdmin = async(pic,props)=>{
    let adminId = props.id;
    if(!props.id) throw new Error("Please provide admin Id");
    let filter = {}
    if(props.name) filter.name = props.name;
    if(props.company) filter.company = props.company;
    if(props.email) filter.email = props.email;
    if(props.phone) filter.phone = props.phone;
    if (pic) filter.profile_pic = pic.path;
    filter.modified_on = new Date(Date.now());
    let adminRecord = await updateAdmin(adminId,filter);
    return adminRecord;
}

exports.changePassword = async(props)=>{
    let adminId = props.id;
    if(!props.id) throw new Error("Please provide rep Id");
    if(!props.oldPassword) throw new Error("Please provide Old Password");
    if(!props.newPassword) throw new Error("Please provide New Password");

    let id = props.id;
    let oldPassword = props.oldPassword;
    let response = await comparaPassword(id,oldPassword);
    if(!response) throw new Error("Password Not Matched!")
    
    let filter = {}
    filter.password_hash = bcrypt.hashSync(props.newPassword,10);
    filter.modified_on = new Date(Date.now());
    let adminRecord = await updateAdmin(adminId,filter);
    return adminRecord
}


exports.resetPassword = async(props)=>{

       
    if(!props.email) throw new Error("Please provide email ")
    let adminRecord = await getAdmin({email:props.email})
    if(!adminRecord)
    return {Error:"Invalid Email"}
    
    let filter = {}
    if(props.email) filter.email = props.email;

    async.waterfall([  
        function(done) {  
            crypto.randomBytes(20, function(err, buf) {  
                var token = buf.toString('hex');  
                done(err, token);  
            });  
        },   
        function(token, result, done,Username,password) {  
            var emailVal = result[0].Email;  
            console.log(emailVal);  
            var Username="";  
            var password="";  
            MongoClient.connect(url, function(err, db){   
            var smtpTransport = nodemailer.createTransport({  
                service: 'SendGrid',  
                auth: {  
                  user: Username,  
                  pass: password  
                }  
              });  
            const mailOptions = {  
                to: email,  
                from: 'info@webhopers.com',  
                subject: 'Webhopers Password Reset',  
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +  
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +  
                    'http://' + req.headers.host + '/reset/' + token + '\n\n' +  
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'  
            };  
            smtpTransport.sendMail(mailOptions, function(err) {                 
                console.log("HI:"+emailVal);  
                res.json({status : 'success', message : 'An e-mail has been sent to ' + emailVal + ' with further instructions.'});              
                done(err, 'done');  
            });  
        })  
        }    
    ])
}
      


