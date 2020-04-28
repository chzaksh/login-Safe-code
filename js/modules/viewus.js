var admin = `
<section class="container flax">
    <div id="mainAdmin" class="width48">
        
        <div class="boxpass"><input class="inputPassword " name="theCode" type="password" maxlength="4"
                placeholder="  enter here your code:"><button
                class="btn_click btn_enter_password">enter</button>
            <button class="btn_click btn_changecode">changeCode</button>
        </div>
    
        <div id="upp_none" >
       <div class="uppdate_user">
       <button id="esc">x</button>
        <form id="uppdate_user" method="post">
        <input id="email" type="email" name="email" value="" placeholder="type yoar email" class="lainInput">
        <input id="address" type="text" name="address" value="" placeholder="type yoar address" class="lainInput">
        <input id="tel" type="tel" name="phone" value="" placeholder="type yoar phone" class="lainInput">
        <input id="uppdate_btn" type="submit" value="send" id="loginSubmit" class="btn_click">
        </form>
    
        </div>
        </div>

        <div class="div_table">
        <figure><img src="/חדש/img/refresh.jpg" alt="refresh" id="btn-refresh"></figure>
        <div class="table" style="overflow:auto;">
          <table id="table_user">
              <thead>
                  <tr>
                      <th scope="col">#</th>
                      <th scope="col">First</th>
                      <th scope="col">Last</th>
                      <th scope="col">email</th>
                      <th scope="col">address</th>
                      <th scope="col">phone</th>
                      <th scope="col">dateCreated</th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                  </tr>
              </thead>
              <tbody id="tbody">
                  <tr>
                  </tr>
              </tbody>
          </table>
          </div>
        </div>
     </div>



    <div id="formNewUser" class="width48">
        <form id="addUserAdmin" >
            <h3> Make sure you fill in all fields </h3>
            <label>first name</label><input type="text" class="lainInput" name="first_name" placeholder="first name">
            <label>last name</label><input type="text"  class="lainInput" name="last_name" placeholder="last name">
            <label>email</label><input id="mailNew" type="email" class="lainInput" name="email" placeholder="email">
            <label>address</label><input type="text" class="lainInput" name="address" placeholder="address">
            <label>fhone</label><input  id="telNew" type="tel" class="lainInput" name="phone" placeholder="phone">
            <label>password</label> <input id="passwordNew" type="password" class="lainInput" name="password" placeholder="password" maxlength="4">
            <label >role</label><select name="role_id" id="" class="lainInput">
                <option>select:</option>
                <option value="2">manager</option>
                <option value="3" selected>client</option>

            </select>

            <input type="submit" value="Add The User" class="btn_click">
        </form>

    </div>
</section>`

var login =`
<div id="loginContainer" method="post">
    <div>
    <div id="timer">The lock will open in:<span id="second"> 60</span></div>
        <button id="clearPassword" class="btn_click">clearPassword</button></div>

        <h1>login:</h1>
        <form id="login"  method="POST">
            <input id="email" class="lainInput" type="email" name="email" placeholder="enter here your email:" >
            <div id="master">
            <input id="password"  class="inputPassword lainInput" type="password" name="password" value="" placeholder="enter here your password:" maxlength="4">
            
            </div>
            <input type="submit" value="send" id="loginSubmit" class="btn_click">
            
                                            
        </form>

    
 </div>
`

var manager=`
<div >
    <div class="uppdate_user">
        <button id="esc">x</button>
        <form id="user_uppdate" method="post">
            <input id="email" type="email" name="email" value="" placeholder="type yoar email"
                class="lainInput">
            <input id="address" type="text" name="address" value="" placeholder="type yoar address"
                class="lainInput">
            <input id="tel" type="tel" name="phone" value="" placeholder="type yoar phone" class="lainInput">
            <input id="uppdate_btn" type="submit" value="send" id="loginSubmit" class="btn_click">
        </form>

    </div>
</div>`;

var client =`
<div >
    <div class="uppdate_user">
        <button id="esc">x</button>
        <form id="user_uppdate" method="post">
            <input id="email" type="email" name="email" value="" placeholder="type yoar email"
                class="lainInput">
            <input id="address" type="text" name="address" value="" placeholder="type yoar address"
                class="lainInput">
            <input id="tel" type="tel" name="phone" value="" placeholder="type yoar phone" class="lainInput">
            <input id="uppdate_btn" type="submit" value="send" id="loginSubmit" class="btn_click">
        </form>

    </div>
</div>`;


function usersTable(table, className){
    $('tbody tr:last').after(`<tr> <th scope="row" class="id_Value"></th><td class="firstlValue">${table.first_name}</td><td>${table.last_name}</td><td class="emailValue">${table.email}</td><td id="addressValue">${table.address}</td><td id="phoneValue">${table.phone}</td><td>${table.dateCreated}</td><td class="${className}"><button class="btn_click Tbtn">X</button><td><button class="uppdate_btn Tbtn btn_click">uppdate</button></td></tr>`);
}  
function userTable(tables){
$('tbody').append(`<tr><th scope="row" class="id_Value"></th><td class="firstlValue">${tables.first_name}</td><td>${tables.last_name}</td><td class="emailValue">${tables.email}</td><td id="addressValue">${tables.address}</td><td id="phoneValue">${tables.phone}</td><td>${tables.dateCreated}</td><td class="remove"><button class="btn_click Tbtn">X</button><td><button class="uppdate_btn btn_click Tbtn">uppdate</button></td></tr>`); 
}


 

export {
  admin,
  login,
  usersTable,
  userTable,
  manager,
  client
}