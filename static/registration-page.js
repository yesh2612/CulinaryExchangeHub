var form = document.forms.myform;

function url() {
  var validation_flag = true;
  var user_name = document.getElementById("username").value;
  var user_password = document.getElementById("password").value;
  var confirm_password = document.getElementById("confirm-password").value;
  if (user_name === "") {
    document.getElementById("username").style.borderColor = "red";
    document.getElementById("username").className = "error-field";
    validation_flag = false;
  } else if (user_name != "") {
    document.getElementById("username").style.borderColor = "black";
    validation_flag = true;
  }
  if (user_password === "") {
    document.getElementById("password").style.borderColor = "red";
    document.getElementById("password").className = "error-field";
    validation_flag = false;
  } else if (user_password != "") {
    document.getElementById("password").style.borderColor = "black";
    validation_flag = true;
  }
  if (user_password != confirm_password || confirm_password === "") {
    document.getElementById("confirm-password").style.borderColor = "red";
    document.getElementById("confirm-password").className = "error-field";
    document.getElementById("password").style.borderColor = "red";
    document.getElementById("password").className = "error-field";
    document.getElementById("login-error-msg").textContent =
      "Password Mismatch";
    document.getElementById("login-error-msg").style.color = "red";
    validation_flag = false;
  }

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
    xmlhttp.open("POST", "/registration", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xmlhttp.onload = function () {
      if (xmlhttp.status === 200) {
        const response = JSON.parse(xmlhttp.responseText);
        console.log("response=", JSON.parse(xmlhttp.responseText));
        console.log("response", response);
        document.getElementById("main-holder").style.backgroundColor =
          "#00ff99";
        document.getElementById("login-error-msg").style.borderColor = "black";
        document.getElementById("login-error-msg").textContent =
          "User Registered Successfully";
        document.getElementById("login-error-msg").style.color = "white";
      } else {
        console.error("Request failed with status", xmlhttp.status);
        document.getElementById("main-holder").style.backgroundColor = "red";
        document.getElementById("login-error-msg").style.borderColor = "black";
        document.getElementById("login-error-msg").textContent =
          "Registration Failed";
        document.getElementById("login-error-msg").style.color = "white";
      }
    };
    xmlhttp.send(JSON.stringify(data));
  }
}
