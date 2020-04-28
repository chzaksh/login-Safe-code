async function select(settings) {
    var result = false;
    await $.ajax(settings).done(function (response) {
        if (response.Table.length == 1) {
            result = response.Table[0];
        } else if (response.Table.length > 1) {
            result = response.Table;
        }
    });
    // console.log(result)
    return result
}


async function updateOrDelete(settings) {
    var result = false;
    await $.ajax(settings).done(function (response) {
        if (response.status == "OK" && response.affectedRows == 1) {
            result = true
            console.log(response, 132)
        }
    });
    
    console.log(result,456)
    return result
}

async function emailUser(_url) {
    var result = false;
    await $.get(_url).done(function (response) {
        if (response.Table.length == 1) {
            result = true
        }
    });
    return result
}



export {
    select,
    updateOrDelete,
    emailUser
}