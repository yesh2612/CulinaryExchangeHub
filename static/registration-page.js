var form = document.forms.myform;

var validation_flag = true;

function display_user_not_found_msg(xmlhttp) {
  console.error("Request failed with status", xmlhttp.status);
  document.getElementById("main-holder").style.backgroundColor = "red";
  document.getElementById("login-error-msg").style.borderColor = "black";
  document.getElementById("login-error-msg").textContent =
    "Login Failed: Password Mismatch";
  document.getElementById("login-error-msg").style.color = "white";
  console.log("error", JSON.parse(xmlhttp.responseText));
}

function display_login_success(xmlhttp) {
  console.log("response=", JSON.parse(xmlhttp.responseText));
  document.getElementById("main-holder").style.backgroundColor = "#00ff99";
  document.getElementById("login-error-msg").style.borderColor = "black";
  document.getElementById("login-error-msg").textContent =
    "User Logged in Successfully";
  document.getElementById("login-error-msg").style.color = "white";
}

function display_response_failure_msg(xmlhttp) {
  console.error("Request failed with status", xmlhttp.status);
  document.getElementById("main-holder").style.backgroundColor = "red";
  // document.getElementById("login-error-msg").style.borderColor = "black";
  val = JSON.parse(xmlhttp.responseText);
  parts = val.error.split(":");
  // console.log("wwwwww", parts[1].trim());
  // console.log("eeeeeeeee", val.message);
  document.getElementById("login-error-msg").textContent =
    "Login Failed:" + " " + parts[1].trim();
  document.getElementById("login-error-msg").style.color = "white";
  console.log("error", JSON.parse(xmlhttp.responseText));
}

function validate_user_name(user_name) {
  const username_regex = /^(?!\s*$)[\s\S]+$/;
  var user_name_value = user_name.value;
  console.log("user_name", user_name_value);
  if (user_name_value === "") {
    return 1;
  }
  if (username_regex.test(user_name_value)) {
    document.getElementById("username").style.borderColor = "black";
    return 1;
  } else {
    document.getElementById("username").style.borderColor = "red";
    document.getElementById("username").className = "error-field";
    document.getElementById("main-holder").style.backgroundColor = "white";
    document.getElementById("login-error-msg").textContent =
      "Incorrect username";
    // validation_flag = false;
    return 0;
  }
}

function validate_user_email(user_email) {
  email_value = user_email.value;
  var emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  console.log(emailRegex.test(email_value));
  if (emailRegex.test(email_value)) {
    document.getElementById("email").style.borderColor = "black";
    return 1;
  } else {
    document.getElementById("email").style.borderColor = "red";
    document.getElementById("email").className = "error-field";
    document.getElementById("main-holder").style.backgroundColor = "white";
    document.getElementById("login-error-msg").style.color = "red";
    document.getElementById("login-error-msg").textContent =
      "Incorrect Email ID";
    // validation_flag = false;
    return 0;
  }
}

function validate_user_password(user_password) {
  if (user_password === "") {
    document.getElementById("password").style.borderColor = "red";
    document.getElementById("password").className = "error-field";
    // validation_flag = false;
    return 0;
  } else if (user_password != "") {
    document.getElementById("main-holder").style.backgroundColor = "white";
    document.getElementById("password").style.borderColor = "black";
    return 1;
  }
}

function validate_user_confirm_password(user_password, confirm_password) {
  console.log("passsword", user_password, confirm_password);
  if (user_password != confirm_password || confirm_password === "") {
    document.getElementById("confirm-password").style.borderColor = "red";
    document.getElementById("confirm-password").className = "error-field";
    document.getElementById("password").style.borderColor = "red";
    document.getElementById("password").className = "error-field";
    document.getElementById("login-error-msg").textContent =
      "Password Mismatch";
    document.getElementById("login-error-msg").style.color = "red";
    // validation_flag = false;
    return 0;
  } else {
    return 1;
  }
}

function check_create_recipe_link() {
  var create_recipe_link = document.getElementById("createRecipeLink");
  var check_user_login = sessionStorage.getItem("user_email");

  if (check_user_login === "Null" || check_user_login === "") {
    create_recipe_link.classList.add("disabled");
    create_recipe_link.style.pointerEvents = "none";
  } else {
    create_recipe_link.classList.remove("disabled");
    create_recipe_link.style.pointerEvents = "auto";
    create_recipe_link.style.opacity = 1;
  }
}

function url() {
  var user_name = document.getElementById("username");
  var user_password = document.getElementById("password").value;
  var confirm_password = document.getElementById("confirm-password").value;
  var email_input = document.getElementById("email");
  var email_id_value = document.getElementById("email").value;

  var user_flag = validate_user_name(user_name);
  var password_flag = validate_user_password(user_password);
  var confirm_password_flag = validate_user_confirm_password(
    user_password,
    confirm_password
  );
  var email_flag = validate_user_email(email_input);

  if (user_flag && password_flag && confirm_password_flag && email_flag) {
    validation_flag = true;
  } else {
    validation_flag = false;
  }
  if (validation_flag === false) {
    return false;
  }
  document.getElementById("username").className = "login-form-field";
  document.getElementById("password").className = "login-form-field";

  console.log(user_name, user_password);
  var xmlhttp = new XMLHttpRequest();

  const data = {
    email_id: email_id_value,
    username: user_name.value,
    password: user_password,
  };
  xmlhttp.open("POST", "/registration", true);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xmlhttp.onload = function () {
    if (xmlhttp.status === 200) {
      const response = JSON.parse(xmlhttp.responseText);
      if (response.error) {
        display_user_not_found_msg(xmlhttp);
      } else {
        var lbl = document.querySelector(".profile a");
        var username = response;
        console.log("vvv", lbl.textContent, user_name);
        lbl.textContent = username.message;
        check_create_recipe_link();
        sessionStorage.setItem("user", lbl.textContent);
        sessionStorage.setItem("user_email", username.user_email_id);
        sessionStorage.setItem("user_password", username.user_password);
        console.log("vvv", lbl.textContent, user_name.message);
        console.log("session storage username", sessionStorage.getItem("user"));
        console.log(
          "session storage useremail",
          sessionStorage.getItem("user_email")
        );
        var log_txt = document.querySelector(".profile .dropdown a");
        log_txt.style =
          "display : inline-block; pointer-events: auto; opactiy:1";
        log_txt.textContent = "Logout";
        var my_dishes_txt = document.querySelector(
          '.profile .dropdown a[href="#"]'
        );
        my_dishes_txt.style =
          "display : inline-block; pointer-events: auto; opactiy:1";
        my_dishes_txt.textContent = "My Dishes";

        var my_profile_txt = document.querySelector(
          ".profile .dropdown #profile"
        );

        my_profile_txt.style =
          "display : inline-block; pointer-events: auto; opactiy:1";
        my_profile_txt.textContent = "My Profile";
        display_login_success(xmlhttp);
      }
    } else {
      display_response_failure_msg(xmlhttp);
    }
  };
  xmlhttp.send(JSON.stringify(data));
}
