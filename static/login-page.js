var form = document.forms.myform;

var validation_flag = true;

function display_user_not_found_msg(xmlhttp) {
  console.error("Request failed with status", xmlhttp.status);
  document.getElementById("main-holder").style.backgroundColor = "white";
  document.getElementById("login-error-msg").style.color = "red";
  document.getElementById("login-error-msg").textContent =
    "Login Failed: Either Password Mismatch or User not found";
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
  // val = JSON.parse(xmlhttp.responseText);
  // parts = val.error.split(":");
  // console.log("wwwwww", parts[1].trim());
  // console.log("eeeeeeeee", val.message);
  // document.getElementById("login-error-msg").textContent =
  //   "Login Failed:" + " " + parts[1].trim();
  document.getElementById("login-error-msg").style.color = "black";
  console.log("error", JSON.parse(xmlhttp.responseText));
}

function validate_user_email(user_email) {
  email_value = user_email.value;
  var emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  console.log(emailRegex.test(email_value));
  if (emailRegex.test(email_value)) {
    document.getElementById("email").style.borderColor = "black";
    validation_flag = true;
  } else {
    document.getElementById("email").style.borderColor = "red";
    document.getElementById("email").className = "error-field";
    document.getElementById("main-holder").style.backgroundColor = "white";
    document.getElementById("login-error-msg").style.color = "red";
    document.getElementById("login-error-msg").textContent =
      "Incorrect Email ID";
    validation_flag = false;
  }
}

function validate_user_password(user_password) {
  if (user_password === "") {
    document.getElementById("password").style.borderColor = "red";
    document.getElementById("password").className = "error-field";
    validation_flag = false;
    return 0;
  } else if (user_password != "") {
    document.getElementById("main-holder").style.backgroundColor = "white";
    document.getElementById("password").style.borderColor = "black";
    validation_flag = true;
    return 1;
  }
}

function url() {
  var user_password = document.getElementById("password").value;
  var email_input = document.getElementById("email");
  var email_id_value = document.getElementById("email").value;

  validate_user_password(user_password);
  validate_user_email(email_input);

  if (validation_flag == false) {
    return false;
  }

  document.getElementById("email").className = "login-form-field";
  document.getElementById("password").className = "login-form-field";

  console.log(email_id_value, user_password);
  var xmlhttp = new XMLHttpRequest();

  const data = {
    email_id: email_id_value,
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
        var lbl = document.querySelector(".profile a");
        var username = response;
        console.log("vvv", lbl.textContent, username);
        lbl.textContent = username.message;
        console.log("vvv", lbl.textContent, username.message);
        var log_txt = document.querySelector(".profile .dropdown a");
        log_txt.style =
          "display : inline-block; pointer-events: auto; opactiy:1";
        log_txt.textContent = "Logout";

        display_login_success(xmlhttp);
      }
    } else {
      display_response_failure_msg(xmlhttp);
    }
  };

  xmlhttp.send(JSON.stringify(data));
  console.log("sdsgsgds");
}
