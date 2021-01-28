const moment = require('moment');



exports.format = (date, type = '') => {
    let rs = null;

    switch(type){
        case "dd/mm/yyyy": rs = moment(date).format('L');
        break;
        case "Mon Day Year": rs = moment(date).format('LL');
        break;
        case "dd/mm/yyyy": rs = moment(date).format('L');
        break;
        default: rs = moment(date).format('lll');
    }

    return rs;
}

// .format('L')      // 06/09/2014
// .format('l')      // 6/9/2014
// .format('LL')     // June 9 2014
// .format('ll')     // Jun 9 2014
// .format('LLL')    // June 9 2014 9:32 PM
// .format('lll')    // Jun 9 2014 9:32 PM
// .format('LLLL')   // Monday, June 9 2014 9:32 PM
// .format('llll')   // Mon, Jun 9 2014 9:32 PM