import * as ajax from "./modules/ajax.js";
var falseCode = 0;
var error = "error:\n";

function inputPassword(input) {
    var inputPassword = $(input);
    var mailformat = /[0-9-()+]{3,20}/;
    if (inputPassword.val().match(mailformat)) {
        inputPassword.removeClass("error");
        return true
    } else if ($(inputPassword).length > 0) {
        $(inputPassword).addClass("error");
        error += "the password can be only numbers.\n"
        return false
    }
}

function error1() { //ריקון שגיאה
    error = "error:\n";
}

function inputEmail(input) { //בדיקת התאמה למייל
    var email = $(input);
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;;
    if (email.val().match(mailformat)) {
        email.removeClass("error");
        return true
    } else {
        error += "Mail should be written correctly.\n";
        email.addClass("error");
        return false
    }
}

function inputTel(input) { //בדיקת התאמה לטלפון
    var inputTel = $(input);
    var mailformat = /[0-9-()+]{3,20}/;
    if (inputTel.val().match(mailformat) && inputTel.val().length > 7) {
        inputTel.removeClass("error");
        return true
    } else {
        inputTel.addClass("error");
        error = "Press 8 minimum numbers\n";
        return false
    }
}

function checkClier(from) { //בדיקת תאי אינפוט ריקים
    var arrayFrom = $(from).find('input');
    var ans = 0;
    $(arrayFrom).each(function (i) {
        if ($(this).val() == "") {
            $(this).addClass("error")
            ans++
        } else {
            $(this).removeClass("error");
        }
    })
    if (ans == 0) {
        return true
    } else {
        error += "You must fill in all fields\n";
    }
}

function cheksInput(email, password_tel, y) { //בדיקת אינפוט מייל, קוד,טלפון
    if (y == null) {
        if (password_tel == '#tel') {
            if (inputEmail(email) && inputTel(password_tel)) {
                return true
            }
        } else if (inputEmail(email) && inputPassword(password_tel)) {
            return true
        }
    } else if (inputEmail(email) && inputPassword(password_tel) && inputTel(y)) {
        return true
    }
}

// function checkError(from) {//
//     if ($(from).find('input').hasClass() == 'error') {
//         return false
//     }
// }
async function login(formData) { //כניסה למערכת
    var result = null;
    var arr = [];
    for (const input of formData.entries()) {
        arr.push(input[1])
    }
    var settings = {
        "url": "https://123-61691b.appdrag.site/api/client/login",
        "data": {
            "emeil": arr[0],
            "password": arr[1],
            "AD_PageNbr": "1",
            "AD_PageSize": "500"
        },
        "method": "POST",
        "async": true,
        "crossDomain": true,
        "processData": true
    };
    result = await ajax.select(settings);
    return result
}

function getfalseCode() { // בדיקת נסינות החלפת קוד
    falseCode++;
    if (falseCode == 3) {
        falseCode = 0;
        return true;
    }
}

async function checkOld(x) { //בדיקת קוד מנהל ישן
    var settings = {
        "url": "https://123-61691b.appdrag.site/api/client/getOneByPassword",
        "data": {
            "password": x,
            "AD_PageNbr": "1",
            "AD_PageSize": "500"
        },
        "method": "POST",
        "async": true,
        "crossDomain": true,
        "processData": true
    };
    var result = null;
    result = await ajax.select(settings);
    return result
}

async function getOllUsers() { //מקבל את כל המשתמשים לטבלת המנהל
    var result = null;
    var settings = {
        "url": "https://123-61691b.appdrag.site/api/client/getOllUsers",
        "data": {
            "AD_PageNbr": "1",
            "AD_PageSize": "500"
        },
        "method": "POST",
        "async": true,
        "crossDomain": true,
        "processData": true
    };
    result = await ajax.select(settings);
    return result
}

async function deleteUser(email) { //מחיקת משתמש
    var result = null;
    var settings = {
        "url": "https://123-61691b.appdrag.site/api/client/deleteUser",
        "data": {
            "email": email
        },
        "method": "POST",
        "async": true,
        "crossDomain": true,
        "processData": true
    }
    result = await ajax.updateOrDelete(settings);
    return result
}

async function putCodeIn(x) { //מכניס קוד מנהל חדש
    var result = null;
    var settings = {
        "url": "https://123-61691b.appdrag.site/api/client/updateAdminPassword",
        "data": {
            "password": x,
            "id": "1"
        },
        "method": "POST",
        "async": true,
        "crossDomain": true,
        "processData": true
    };
    result = await ajax.updateOrDelete(settings);
    return result
}

async function updateUser(emailHold, formData) { // מכניס את הנתונים החדשים של המשתמש למערכת
    var result = null;
    var arr = [];
    for (const input of formData.entries()) {
        arr.push(input[1]);
    }
    var settings = {
        "url": "https://123-61691b.appdrag.site/api/client/updateUser",
        "data": {
            "email": arr[0],
            "phone": arr[2],
            "adderss": arr[1],
            "emailHold": emailHold
        },
        "method": "POST",
        "async": true,
        "crossDomain": true,
        "processData": true
    };
    result = await ajax.updateOrDelete(settings);
    return result
}

async function emailUser(mail) { // בודק אם המייל של המשתמש קיים במערכת
    var result = null;
    var url = `https://123-61691b.appdrag.site/api/client/getOneByEmail?email=${mail}`
    result = await ajax.emailUser(url);
    return result
}

function newToken() { //מביא טוקן חדש
    var token = "token" + (Math.floor(Math.random() * 999999999) + 100000000);
    return token
}

async function userNew(formData, token) { //מכניס משתמש חדש מהטבלה של המנהל + טוקן
    var result = null;
    var arr = [];
    for (const input of formData.entries()) {
        arr.push(input[1])
        console.log(input)
        console.log(arr)

    }
    console.log(arr)
    var settings = {
        "url": "https://123-61691b.appdrag.site/api/client/register",
        "data": {
            "first_name": arr[0],
            "last_name": arr[1],
            "email": arr[2],
            "address": arr[3],
            "phone": arr[4],
            "password": arr[5],
            "role_id": arr[6],
            "token": token
        },
        "method": "POST",
        "async": true,
        "crossDomain": true,
        "processData": true
    };

    result = await ajax.updateOrDelete(settings);
    return result
}

async function userUpdate(token, formData) { // מכניס את הנתונים החדשים של המשתמש למערכת
    var result = null;
    var arr = [];
    for (const input of formData.entries()) {
        arr.push(input[1]);
    }
    var settings = {
        "url": "https://123-61691b.appdrag.site/api/client/UpdatePersonalDetails",
        "data": {
            "email": arr[0],
            "phone": arr[2],
            "adderss": arr[1],
            "token": token
        },
        "method": "POST",
        "async": true,
        "crossDomain": true,
        "processData": true
    };
    result = await ajax.updateOrDelete(settings);
    return result
}














export {
    // checkBtn,
    login,
    getfalseCode,
    checkOld,
    deleteUser,
    putCodeIn,
    getOllUsers,
    inputPassword,
    inputEmail,
    inputTel,
    falseCode,
    updateUser,
    cheksInput,
    error1,
    checkClier,
    error,
    userNew,
    emailUser,
    // checkError,
    newToken,
    userUpdate
    //     userNew,
    //     emailUser
}