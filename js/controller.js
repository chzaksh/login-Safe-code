import * as view from "./view.js";
import * as model from "./model.js";
// import client  from "./modules/viewus.js";


var enter = null;
var enterCode = null;
var time = "";
var trueCode = ""; //סיסמה
var error = "";


export function init() {
    beginning();

}



function beginning() {
    view.ineerLogin(); //מעלה את הטופס
    aEL(); //קליק למספרים
    userCheck(); // בדיקת טופס כניסה
}

// function after(user_role_id) {

// }

function aEL() { // נותן קליק למספרים בכניסה ללוגין
    document.querySelectorAll('.numbers').forEach(btn => {
        btn.addEventListener("click", start);
    })
}

function rEL() { //מוריד קליק למספרים בכניסה ללוגין
    document.querySelectorAll('.numbers').forEach(btn => {
        btn.removeEventListener("click", start);
    })
}



function start() { //מה שקורה אחרי לחיצה על מספר בלוגין
    view.playSound("Beep");
    view.red(this); //הוספת צבע אדום למספר
    timer(); //הפעלת טיימר ללחיצות
    var b = this.id; //מקבל את המספר של הכפתור הנלחץ
    var c = b[b.length - 1]; //מוריד את ID
    trueCode += c; //מכניס את המספר למשתנה של הסיסמה
    $("#password").val(trueCode);
    if (trueCode.length == 4) {
        clearBtn(); // עוצר את האפשרות ללחוץ על הכפתורים אחרי 4 לחיצות
    }
}

function timer() { //שעון בין לחיצה ללחיצה
    clearTimeout(time);
    time = setTimeout(function () {
        clear(); //מאפס את הסיסמה והצבע אדום
    }, 3000);
}

function clear() { //ניקוי אחרי 3 שניות
    var a = $("#password");
    view.clearPassword(); //מאפס את הצבע האדום מהכפתורים
    a.val(""); //מוחק את האינפוט
    aEL(); //קליק למספרים
    trueCode = ""; //מאפס את הסיסמה
}

function userCheck() { //שליחת טופס לוגין לבדיקה
    $("#login").submit(function (event) {
        event.preventDefault(); //מבטל מחיקה של הטופס
        model.error1() //מורקן את הודעת השגיאה
        if (model.checkClier("#login") && model.cheksInput('#email', ".inputPassword", null)) { //בדיקה אם הנתונים שהוקשו מתאימים לבקשה שנשלחת
            user(new FormData(this)); //בדיקה של הטופס
        } else {
            view.myAlert(model.error); // הודעת שגיאה
        }
    })
}

function clearBtn() { //מה שקורה אחרי 4 כפתורים לחוצים
    clearTimeout(time); //עצירת טיימר ניקוי
    // trueCode = ""; //מאפס סיסמה
    rEL(); //עוצר את הלחיצות על הכפתורים
    $('#clearPassword').click(function () { //נותן קליק לכפתור המחיקה של המספרים
        clear();
    })
}

async function user(x) { //בדיקה של טופס לוגין מול הדטה בייס
    var result = await model.login(x); //שליחה לדטה בייס
    if (result) { //תשובה חיובית
        view.playSound("DoorBuzze");
        setTimeout(function () {
            view.welcome(result.first_name, result.role_id); //שולח שם משתמש לחלק העליון של העמוד
            if (result.role_id == 1) { //בדיקה אם נכנס מנהל
                admin1(); //פונקציות מנהל
                admin2();
            } else {
                client(result.token);
            }
        }, 1000)
    } else { //תשובה שלילית 
        view.playSound("no");
        setTimeout(function () {
            chckFalseCode(); //בדיקה כמה פעמים הקוד שגוי ופעולות בהתאמה
        }, 500)

    }
}

function chckFalseCode() { //בדיקה כמה פעמים הקוד שגוי
    if (model.getfalseCode()) {
        taimerMinute(); //דקה נעילה 
    } else {
        view.myAlert(`error try again.\n try ${model.falseCode}/3.`);
    }
}

function taimerMinute() { //נעילת הטופס לוגין לדקה אחרי 3 שגיאות
    $("#login").off('submit');
    view.playSound("Siren");
    clear();
    view.s60();
    view.bodyColor();
    view.timer();
    rEL();
    setTimeout(function () {
        userCheck();
        aEL();
        view.bodyColor();
        view.timer();
    }, 60000);
}

function admin1() { //אחראי על הצד השמאלי בעמוד של המנהל 
    putUsersInTable(); //מקבל נתונים מהדטה בייס ושולח לטבלה בעמוד מנהל
    clickRefresh(); //נותן קליק לכפתור רענון טבלה בעמוד המנהל
}

async function putUsersInTable() { //מקבל נתונים מהדטה בייס ושולח לטבלה בעמוד מנהל
    let users = await model.getOllUsers(); // מקבל את כל המשתמשים 
    let usersLen = users.length;
    view.crateTr(usersLen, users); //שולח את המשתמשים לטבלה
    deletUser(); // יוצר כפתור מחיקה בטבלת המשתמשים וגם מוחק
    uppdeteUser(); // יוצר כפתור עדכון ומעדכן
    document.getElementsByClassName("btn_changecode")[0].addEventListener("click", chengeCode); // נותן אפשרות להחליף קוד
    view.numbers(); //מכניס מספרים ליד השמות
}

function deletUser() {
    $('.remove, .adminRemove').click(function (tr) {
        if ($(this).hasClass('adminRemove')) { //לא נותן למחוק מנהל
            view.myAlert('You cannot delete a admin');
        } else {
            tr.preventDefault();
            removeTh($(this)); // מחיקה מהטבלה ומהדטה בייס
            view.numbers(); // מעדכן מספרים בטבלה אחרי מחיקה
        }
    })
}

function removeTh(x) { //מחיקה מהטבלה ומהדטה בייס
    x.parents('tr').remove(); //מוחק מהטבלה
    model.deleteUser(x.parent().find('.emailValue').text()); //מוחק מהדטה בייס
}

function clickRefresh() { //נותן קליק לכפתור רענון טבלה בעמוד המנהל
    $('#btn-refresh').click(async function () {
        putUsersInTable(); //מקבל נתונים מהדטה בייס ושולח לטבלה בעמוד מנהל  
    })

}
async function chengeCode() { //שינוי קוד מנהל
    enter = $('.btn_enter_password'); //כפתור 
    for (let i = 0; i < 3; i++) {
        var oldCode = prompt("enter old code:"); //הכנסת קוד ישן
        if (!oldCode) {
            break;
        }
        if (await model.checkOld(oldCode)) { //בדיקת התאמה לקוד הישן
            enter.click(langthNewCode); //הפעלת כפתור אישור
            view.myAlert("inpot your code");
            break;
        } else {
            view.myAlert("Password don't match try: " + (i + 1) + "/3");
        }
    }
}

async function langthNewCode() { //בדיקת קוד חדש של המנהל
    var enterVal = $('.inputPassword').val(); //קבלת ערך הקוד החדש
    enter.off("click", langthNewCode); //כיבוי כפתור אישור
    if (model.inputPassword('.inputPassword') && enterVal.length == 4) { //בדיקת אורך קוד חדש
        if (await model.putCodeIn(enterVal)) { //הכנסת הקוד החדש לדטה בייס
            view.myAlert("the code has been chenged");
            $('.inputPassword').val("")
        } else {
            view.myAlert("error");
        }
    } else {
        $('.inputPassword').val("");
        view.myAlert("enter 4 number");
        chengeCode();
    }
}


function uppdeteUser() { // עדכון נתוני משתמש
    escClick(); //סגירת חלון עדכון
    $('.uppdate_btn').click(function () { //נותן קליק לכפתורי העדכון
        var clickUppdate = ($(this)); //מקבל את מיקום הלחיצה
        getDetailsUppdete(clickUppdate); //מעדכן את הפרטים מול הדטה בייס והטבלה
    })
}

function escClick() { //סגירת חלון עדכון
    $('#esc').click(function () { //כפתור סגירה של חלון העדכון
        view.closeDiv();
    })
}

function getDetailsUppdete(clickUppdate) { //מעדכן את הפרטים מול הדטה בייס והטבלה
    var user = view.uppdeteUser($(clickUppdate)); //  מקבל את ערך האימייל הנוכחי של המשתמש 
    $('#uppdate_user').submit(async function (event) { // שליחת הטופס רק כשהוא מלא
        event.preventDefault(); //מבטל מחיקה של הטופס
        model.error1(); //ריקון הודעת שגיאה
        if (model.checkClier('#uppdate_user') && model.cheksInput('#email', "#tel", null)) {
            var result = await model.updateUser(user, new FormData(this)); //בדיקה ושליחה של הטופס
            putDetails(result, clickUppdate); //שליחת נתונים לטבלה ובדיקה שהם נכנסו לדטה בייס
        } else {
            view.myAlert(model.error);
        }
    })
}

function putDetails(result, clickUppdate) {
    if (result) { //בדיקה אם הטופס התעדכן
        view.upp_detals(clickUppdate); //מעדכן את הנתונים החדשים בטבלה
        view.myAlert("Details sent successfully");
        view.closeDiv(); //סוגר את הטופס
    } else {
        view.myAlert('error');
    }
}

function admin2() { //אחראי על הצד הימני של העמוד
    chekMailInDB() //בודק אימייל מול הדטה בייס
    $('#addUserAdmin').submit(function (event) {
        model.error1() //ריקון הודעת שגיאה
        event.preventDefault(); //מבטל מחיקה
        if (submitCheks()) { //בדיקת נתוני שאר האינפוטים
            addNewUser(new FormData(this)); //הכנסת משתמש וקבלת טוקן
        } else {
            view.myAlert(model.error);
        }
    })
}


function submitCheks() {
    if (model.checkClier('#addUserAdmin') &&
        model.cheksInput('#mailNew', '#passwordNew', '#telNew')) {
        return true
    }
}

function chekMailInDB() {
    $('#mailNew').change(async function () { //לבדוק למה הקאס יורד אחרי שליחה
        if (await model.emailUser($(this).val())) {
            $('#mailNew').addClass("error");
            $('input[type="submit"]').attr('disabled', 'disabled');
            view.myAlert("An email address exists on the system");
        } else {
            $('#mailNew').removeClass("error");
            $('input[type="submit"]').removeAttr('disabled');
        }
    })
}

function client(token) {
    $('#user_uppdate').submit(async function (e) {
        e.preventDefault();
        model.error1(); //ריקון הודעת שגיאה
        if (model.checkClier('#user_uppdate') && model.cheksInput('#email', "#tel", null)) {
            var result = await model.updateUser(user, new FormData(this)); //בדיקה ושליחה של הטופס
            putDetails(result, clickUppdate); //שליחת נתונים לטבלה ובדיקה שהם נכנסו לדטה בייס
        } else {
            view.myAlert(model.error);
        }

    })
}




async function addNewUser(from) { //הכנסת משתמש וקבלת טוקן
    var token = model.newToken() //מביא טוקן חדש
    var result = await model.userNew(from, token);
    if (result) {
        $('#addUserAdmin')[0].reset(); //מנקה את הטופס
        putUsersInTable();
        view.myAlert("Details sent successfully");
    }
}

// function tres111() {
//     if (trueCode.length == 4)  //להכניס כאן גם את האינפוט//
//         {
//         //לבדוק את הקוד מכאן
//             if (model.checkBtn(trueCode)) {
//             clearBtn(); //עוצר את האפשרות ללחוץ על הכפתורים
//             view.myAlert("your code true");
//         } else {
//             falseCode++;
//             view.myAlert("try again");
//             console.log(falseCode)
//         }
//     }}