function validateRegistrationForm() {
    var validation_flag = true;
    var user_name = document.getElementById("username").value;
    var user_password = document.getElementById("password").value;
    var confirm_password = document.getElementById("confirm-password").value;
    
    const setErrorStyle = (element) => {
      element.style.borderColor = "red";
      element.className = "error-field";
    };
  
    const setValidStyle = (element) => {
      element.style.borderColor = "black";
      element.className = "login-form-field";
    };
  
    if (user_name === "") {
      setErrorStyle(document.getElementById("username"));
      validation_flag = false;
    } else {
      setValidStyle(document.getElementById("username"));
    }
  
    if (user_password === "") {
      setErrorStyle(document.getElementById("password"));
      validation_flag = false;
    } else {
      setValidStyle(document.getElementById("password"));
    }
  
    if (user_password !== confirm_password || confirm_password === "") {
      setErrorStyle(document.getElementById("confirm-password"));
      setErrorStyle(document.getElementById("password"));
      document.getElementById("login-error-msg").textContent = "Password Mismatch";
      document.getElementById("login-error-msg").style.color = "red";
      validation_flag = false;
    }
  
    return validation_flag;
  }
  
  async function registerUser() {
    const user_name = document.getElementById("username").value;
    const user_password = document.getElementById("password").value;
  
    const data = {
      username: user_name,
      password: user_password,
    };
  
    const response = await fetch("/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(data),
    });
  
    return response.json();
  }
  