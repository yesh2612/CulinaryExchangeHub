var form = document.forms.myform;

var validation_flag = true;

function display_user_not_found_msg(xmlhttp) {
  console.error("Request failed with status", xmlhttp.status);
  document.getElementById("main-holder").style.backgroundColor = "red";
  document.getElementById("login-error-msg").style.borderColor = "black";
  document.getElementById("login-error-msg").textContent =
    "Login Failed: Either Password Mismatch or User not found";
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
  document.getElementById("login-error-msg").style.borderColor = "black";
  val = JSON.parse(xmlhttp.responseText);
  parts = val.error.split(":");
  console.log("wwwwww", parts[1].trim());
  console.log("eeeeeeeee", val.message);
  document.getElementById("login-error-msg").textContent =
    "Login Failed:" + " " + parts[1].trim();
  document.getElementById("login-error-msg").style.color = "white";
  console.log("error", JSON.parse(xmlhttp.responseText));
}

function validate_user_name(user_name) {
  if (user_name === "") {
    document.getElementById("username").style.borderColor = "red";
    document.getElementById("username").className = "error-field";
    validation_flag = false;
    return 0;
  } else {
    document.getElementById("username").style.borderColor = "black";
    validation_flag = true;
    return 1;
  }
}

function validate_user_password(user_password) {
  if (user_password === "") {
    document.getElementById("password").style.borderColor = "red";
    document.getElementById("password").className = "error-field";
    validation_flag = false;
  } else if (user_password != "") {
    document.getElementById("password").style.borderColor = "black";
    validation_flag = true;
  }
}
function url() {
  var user_name = document.getElementById("username").value;
  var user_password = document.getElementById("password").value;

  validate_user_name(user_name);
  validate_user_password(user_password);
  console.log("validation-flag", validation_flag);
  if (validation_flag === false) {
    return false;
  } else {
    document.getElementById("username").className = "login-form-field";
    document.getElementById("password").className = "login-form-field";

    console.log(user_name, user_password);
    var xmlhttp = new XMLHttpRequest();

    const data = {
      username: user_name,
      password: user_password,
    };
    xmlhttp.open("POST", "/login", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xmlhttp.onload = function () {
      if (xmlhttp.status === 200) {
        const response = JSON.parse(xmlhttp.responseText);
        if (response.error) {
          display_user_not_found_msg(xmlhttp);
        } else {
          display_login_success(xmlhttp);
        }
      } else {
        display_response_failure_msg(xmlhttp);
      }
    };

    xmlhttp.send(JSON.stringify(data));
    console.log("sdsgsgds");
  }
}