var userData = {
  userEmail: sessionStorage.getItem("user_email"),
  userDisplayName: sessionStorage.getItem("user"),
  userPassword: sessionStorage.getItem("user_password"),
};

var userEmailInput = document.querySelector("#user-email");
var userPasswordInput = document.querySelector("#user-password");
var userDisplayNameInput = document.querySelector("#user-display");
var container = document.querySelector("#container");

userEmailInput.textContent = userData.userEmail;
userPasswordInput.value = userData.userPassword;
userDisplayNameInput.value = userData.userDisplayName;

window.editField = function (fieldId) {
  const field = document.getElementById(fieldId);
  const editSuccessClass = "edit-success";

  field.readOnly = !field.readOnly;

  if (!field.readOnly) {
    field.style.borderColor = "";
    field.classList.add(editSuccessClass);

    setTimeout(() => {
      field.classList.remove(editSuccessClass);
      field.style.borderColor = "";
    }, 2000);
  } else {
    field.classList.toggle("editing");
    field.focus();
  }
};

function updateUserDetails() {
  var userPassword = userPasswordInput.value.trim();

  var isValid = true;

  if (!userPassword) {
    userPasswordInput.style.backgroundColor = "lightcoral";
    container.style.backgroundColor = "#333";
    isValid = false;
  } else {
    userPasswordInput.style.backgroundColor = "";
  }

  if (isValid) {
    var xhr = new XMLHttpRequest();

    const data = {
      email: sessionStorage.getItem("user_email"),
      password: userPasswordInput.value,
      display_name: userDisplayNameInput.value,
    };

    xhr.open("POST", "/my_profile", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        var response = JSON.parse(xhr.responseText);
        console.log("aaaaaaaaaaaaaaa", response);

        if (response.message) {
          console.log("msg", response.message);
          container.style.backgroundColor = "#00ff99";
          sessionStorage.setItem("user", response.username);
          sessionStorage.setItem("user_email", response.email);
          sessionStorage.setItem("user_password", response.password);
          console.log("username", response.username);
          console.log("email", response.email);
          console.log("password", response.password);
          var lbl = document.querySelector(".profile a");
          lbl.textContent = response.username;
        } else {
          alert("Failed to update user details. Please Try Again");
        }
      } else {
        console.error("Request failed with status " + xhr.status);
        alert("Error in updating user details. Please try again.");
      }
    };

    xhr.send(JSON.stringify(data));
  } else {
    console.log("not valid");
  }
}
