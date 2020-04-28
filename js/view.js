import * as viewus from "./modules/viewus.js";

var inp = document.getElementsByClassName("container")[0];
var arrey = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];


function ineerLogin() {

    inp.innerHTML = viewus.login;

    createHtml();

}


function createHtml() {
    var master = document.getElementById("master");
    arrey.forEach(number => {
        var numDiv = document.createElement("div");
        numDiv.id = `main${number}`;
        numDiv.className = "numbers btn";
        if (number == 0) {
            numDiv.className += " zero";
        }
        numDiv.innerHTML = number;
        master.appendChild(numDiv);
    });
}

function clearPassword() {
    document.querySelectorAll('.red').forEach(x => {
        if ($(x).hasClass('zero')) {
            x.className = ("numbers btn zero");
        } else {
            x.className = ("numbers btn");
        }
    })
}



function red(x) {
    if ($(x).hasClass('zero')) {
        x.className += (" red a_zero");
    } else {
        x.className += (" red");
    }

    // var x = document.getElementById("email");
    // x.style.border = "1px red solid";
}

function myAlert(x) {
    alert(x)
}

function welcome(first_name, role_id) {
    inp.className -= ("flax");
    inp.innerHTML = `<section class="container">  <h2>welcome, ${first_name}</h2></section>`;
    if (role_id == 1) {
        inp.innerHTML += `${viewus.admin}`;
    } else if (role_id == 2) {
        inp.innerHTML += `${viewus.manager}`;
        console.log(2)
    } else if (role_id == 3) {
        inp.innerHTML += `${viewus.client}`;
        console.log(viewus.client)
        console.log(inp)
    }
}

function crateTr(numLain, tables) { //ממלא נתונים בטבלה
 
    $('#table_user tbody tr').remove();
    $('#table_user tbody').html('<tr> </tr>')
    
    if (numLain == null) {
        oneUser(tables);
    } else if (tables) {
        tables.forEach(table => {
            if (table.role_id == 1) {
                viewus.usersTable(table, 'adminRemove');
            } else {
                viewus.usersTable(table, 'remove');
            }
        });
    }
}



function oneUser(tables) { //ממלא נתונים בטבלה משתמש אחד
    viewus.userTable(tables);
    if (tables.role_id == 1) {
        $('.remove').removeClass('remove').addClass('adminRemove');
    }
}

function numbers() {
    var i = 1;
    $('.id_Value').each(function (index) {
        $(this).html(i);
        i++;
    });
}

function s60() {
    var c = document.getElementById("second");
    var a = 60;
    setInterval(() => {
        a--;
        c.innerHTML = a;
        c.style.marginLeft = "5px";
        if (a == 0) {
            a = 0;
            clearInterval();
        }
    }, 1000);

}

function timer() {
    var atimer = document.getElementById("timer");

    if (atimer.style.display == "block") {
        atimer.style.display = "none";
    } else {
        atimer.style.display = "block";

    }
}

function bodyColor() {
    var a = document.getElementById("loginContainer");
    if (a.style.backgroundColor == "red") {
        a.style.backgroundColor = "#f2e270";
    } else {
        a.style.backgroundColor = "red";

    }
}

function uppdeteUser(user) {
    $('#upp_none').css('display', 'block'); //מראה את טופס העדכון
    var emailUser = user.parents('tr').find('.emailValue').text() // מקבל את הערך של האימייל הישן
    $('#uppdate_user #email').val(emailUser); //ממלא את האימייל הישן בטבלת העדכון
    $('#uppdate_user #address').val(user.parents('tr').find('#addressValue').text()); //ממלא את הכתובת הישנה בטבלת העדכון
    return emailUser
}

function upp_detals(clickUppdate) {
    clickUppdate.parents('tr').find('.emailValue').html($('#uppdate_user #email').val());
    clickUppdate.parents('tr').find('#addressValue').html($('#uppdate_user #address').val());
    clickUppdate.parents('tr').find('#phoneValue').html($('#uppdate_user #tel').val());
}

function closeDiv() {
    $('#upp_none').css('display', 'none');
}


function playSound(sound){
    var audio = document.getElementById('myAudio');
    audio.src = `audio/${sound}.mp3`;
    audio.load();
    audio.play();
}
















export {
    ineerLogin,
    clearPassword,
    myAlert,
    red,
    welcome,
    s60,
    timer,
    bodyColor,
    crateTr,
    numbers,
    uppdeteUser,
    closeDiv,
    upp_detals,
    playSound


}