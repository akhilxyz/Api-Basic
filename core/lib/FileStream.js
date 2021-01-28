const fs = require('fs');

exports.createConfigFileInDashboard = (filePath, appName, mode = true,OtherProps) =>{
    let props = '';
    for (const [key, value] of Object.entries(OtherProps)) {
        if(value != undefined)
        props +=`${key}: ${value}, `;
    }

    // if(!fs.existsSync(filePath)){
        let data = `app.constant('config', { APP_NAME :"${appName}", PRODUCTION: ${mode}, ${props} });`;
        fs.writeFileSync(filePath, data)
    // }
};

exports.dataOfStateCitiesFile = () => {
    let data = fs.readFileSync(`${__dirname}/state_cities.json`);
    return (JSON.parse(data))
}

exports.createEssentialDirectories = () => {
    let uploads = './core/uploads';
    let admin = `${uploads}/admin`;
    let download = `${uploads}/download`;
    let franchisee = `${uploads}/franchisee`;
    let offers = `${uploads}/offers`;
    let products = `${uploads}/products`;
        let img = `${products}/img`;
        let techDetails = `${products}/techDetails`;
        let vis = `${products}/vis`;
    let reps = `${uploads}/reps`;
    let temp = `${uploads}/temp`;
    let companyAbout = `${uploads}/companyAbout`;
    let promotinalPics = `${uploads}/promotinalPics`;
    let certificates = `${uploads}/certificates`;

    if(!fs.existsSync(uploads)){
        fs.mkdirSync(uploads);
        fs.mkdirSync(admin);
        fs.mkdirSync(download);
        fs.mkdirSync(franchisee);
        fs.mkdirSync(offers);
        fs.mkdirSync(reps);
        fs.mkdirSync(temp);
        fs.mkdirSync(products);
        fs.mkdirSync(img);
        fs.mkdirSync(techDetails);
        fs.mkdirSync(vis);
        fs.mkdirSync(companyAbout);
        fs.mkdirSync(promotinalPics);
        fs.mkdirSync(certificates);
    }
    else{
        if(!fs.existsSync(admin)) fs.mkdirSync(admin);
        if(!fs.existsSync(download)) fs.mkdirSync(download);
        if(!fs.existsSync(franchisee)) fs.mkdirSync(franchisee);
        if(!fs.existsSync(offers)) fs.mkdirSync(offers);
        if(!fs.existsSync(reps)) fs.mkdirSync(reps);
        if(!fs.existsSync(temp)) fs.mkdirSync(temp);
        if(!fs.existsSync(companyAbout)) fs.mkdirSync(companyAbout);
        if(!fs.existsSync(promotinalPics)) fs.mkdirSync(promotinalPics);
        if(!fs.existsSync(certificates)) fs.mkdirSync(certificates);

        if(!fs.existsSync(products)) fs.mkdirSync(products);
        else{
            if(!fs.existsSync(img)) fs.mkdirSync(img);
            if(!fs.existsSync(techDetails)) fs.mkdirSync(techDetails);
            if(!fs.existsSync(vis)) fs.mkdirSync(vis);
        }     
    }
}
