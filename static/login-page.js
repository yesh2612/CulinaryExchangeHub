var form = document.forms.myform;

var validation_flag = true;

function make_fields_defaut_color(field, color) {
  document.getElementById(field).style.color = color;
  document.getElementById(field).style.borderColor = color;
}
function clear_entries(field) {
  document.getElementById(field).value = "";
}
function clear_error_fields(field) {
  document.getElementById(field).textContent = "";
}
function set_default_class(field) {
  document.getElementById(field).className = "login-form-field";
}
function clear_form() {
  make_fields_defaut_color("main-holder", "black");
  document.getElementById("main-holder").style.backgroundColor = "white";
  make_fields_defaut_color("login-error-msg", "black");
  make_fields_defaut_color("email", "black");
  make_fields_defaut_color("password", "black");
  make_fields_defaut_color("forgot-email", "black");
  make_fields_defaut_color("new-password", "black");
  make_fields_defaut_color("confirm-password", "black");
  clear_error_fields("login-error-msg");
  clear_entries("email");
  clear_entries("password");
  clear_entries("forgot-email");
  clear_entries("new-password");
  clear_entries("confirm-password");
}
function display_user_not_found_msg(xmlhttp) {
  console.error("Request failed with status", xmlhttp.status);
  document.getElementById("main-holder").style.backgroundColor = "white";
  document.getElementById("login-error-msg").style.color = "red";
  document.getElementById("login-error-msg").textContent =
    "Login Failed: Password Mismatch or User not found";
  document.getElementById("login-error-msg").style.color = "red";
  console.log("error", JSON.parse(xmlhttp.responseText));
}

function display_login_success(xmlhttp) {
  console.log("response=", JSON.parse(xmlhttp.responseText));
  document.getElementById("main-holder").style.backgroundColor = "#00ff99";
  document.getElementById("login-error-msg").style.borderColor = "black";
  document.getElementById("login-error-msg").textContent =
    "User Logged in Successfully";
  document.getElementById("login-error-msg").style.color = "black";
}

function display_response_failure_msg(xmlhttp) {
  console.error("Request failed with status", xmlhttp.status);
  document.getElementById("login-error-msg").style.color = "red";

  document.getElementById("login-error-msg").style.color = "black";
  console.log("error", JSON.parse(xmlhttp.responseText));
}

function validate_user_email(user_email) {
  var email_value = user_email.value;
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
    return 0;
  }
}

function validate_user_password(user_password) {
  var user_pwd = user_password.value;
  if (user_pwd === "") {
    user_password.style.borderColor = "red";
    user_password.className = "error-field";
    return 0;
  } else if (user_pwd != "") {
    document.getElementById("main-holder").style.backgroundColor = "white";
    user_password.className = "login-form-field";
    user_password.style.borderColor = "black";
    return 1;
  }
}

function toggleForm(formType) {
  clear_form();
  set_default_class("email");
  set_default_class("password");
  set_default_class("forgot-email");
  set_default_class("new-password");
  set_default_class("confirm-password");
  console.log("wwwwwwwwwwwwwwwwwww", formType);
  var loginForm = document.getElementById("login-form");
  var forgotPasswordForm = document.getElementById("forgot-password-form");

  if (formType === "forgot-password") {
    loginForm.style.display = "none";
    forgotPasswordForm.style.display = "block";
  } else {
    loginForm.style.display = "block";
    forgotPasswordForm.style.display = "none";
  }
}

function validate_user_confirm_password(user_password, confirm_password) {
  console.log("passsword", user_password, confirm_password);
  var user_pwd = user_password.value;
  var confirm_pwd = confirm_password.value;
  if (user_pwd != confirm_pwd || confirm_pwd === "") {
    confirm_password.style.borderColor = "red";
    confirm_password.className = "error-field";
    user_password.style.borderColor = "red";
    user_password.className = "error-field";
    document.getElementById("login-error-msg").textContent =
      "Password Mismatch";
    document.getElementById("login-error-msg").style.color = "red";
    return 0;
  } else {
    confirm_password.className = "login-form-field";
    return 1;
  }
}

function resetPassword() {
  var email_id = document.getElementById("forgot-email");
  var new_password = document.getElementById("new-password");
  var confirm_password = document.getElementById("confirm-password");
  if (validate_user_email(email_id) === 0) {
    return;
  }
  if (validate_user_password(new_password) === 0) {
    // document.getElementById("new-password").style.borderColor = "red";
    // document.getElementById("new-password").className = "error-field";
    return;
  }
  if (validate_user_confirm_password(new_password, confirm_password) === 0) {
    return;
  }
  document.getElementById("login-error-msg").textContent = "";
  document.getElementById("login-error-msg").style.color = "black";
  // if (new_password.value !== confirm_password.value) {
  //   alert("Passwords do not match. Please try again.");
  //   return;
  // }

  var xhr = new XMLHttpRequest();

  xhr.open("POST", "/password_reset", true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      var response = JSON.parse(xhr.responseText);
      console.log(response);

      if (response.success) {
        document.getElementById("main-holder").style.backgroundColor =
          "#00ff99";
        document.getElementById("login-error-msg").style.borderColor = "black";
        document.getElementById("login-error-msg").textContent =
          "New Password set Successfully";
        document.getElementById("login-error-msg").style.color = "black";

        // toggleForm("login");
      } else {
        alert("Failed to reset password. Please try again.");
      }
    } else {
      console.error("Request failed with status " + xhr.status);
      alert("Error resetting password. Please try again.");
    }
  };

  var data = JSON.stringify({
    email_id: email_id.value,
    new_password: new_password.value,
  });

  xhr.send(data);
}

function url() {
  clear_form();
  var user_password = document.getElementById("password");
  var email_input = document.getElementById("email");
  var email_id_value = document.getElementById("email").value;

  var password_flag = validate_user_password(user_password);
  var email_flag = validate_user_email(email_input);

  if (password_flag && email_flag) {
    validation_flag = true;
  } else {
    validation_flag = false;
  }
  if (validation_flag == false) {
    return false;
  }

  document.getElementById("email").className = "login-form-field";
  document.getElementById("password").className = "login-form-field";

  console.log(email_id_value, user_password.value);
  var xmlhttp = new XMLHttpRequest();

  const data = {
    email_id: email_id_value,
    password: user_password.value,
  };
  xmlhttp.open("POST", "/login", true);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xmlhttp.onload = function () {
    if (xmlhttp.status === 200) {
      const response = JSON.parse(xmlhttp.responseText);
      if (response.error) {
        display_user_not_found_msg(xmlhttp);
      } else {
        var lbl = document.querySelector(".profile a");
        var username = response;
        console.log("vvv", lbl.textContent, username);
        lbl.textContent = username.message;
        sessionStorage.setItem("user", lbl.textContent);
        console.log("vvv", lbl.textContent, username.message);
        var log_txt = document.querySelector(
          '.profile .dropdown a[href="/user_logging_process"]'
        );
        log_txt.style =
          "display : inline-block; pointer-events: auto; opactiy:1";
        log_txt.textContent = "Logout";

        var my_dishes_txt = document.querySelector(
          '.profile .dropdown a[href="#"]'
        );
        my_dishes_txt.style =
          "display : inline-block; pointer-events: auto; opactiy:1";
        my_dishes_txt.textContent = "My Dishes";
        display_login_success(xmlhttp);
      }
    } else {
      display_response_failure_msg(xmlhttp);
    }
  };

  xmlhttp.send(JSON.stringify(data));
  console.log("sdsgsgds");
}
