function recipe_create() {
  var recipe_name_input = document.querySelector("#recipe-name");
  var recipe_ingredients_input = document.querySelector("#recipe-ingredients");
  var recipe_steps_input = document.querySelector("#recipe-method");
  var recipe_container = document.querySelector("#container");

  var recipe_name = recipe_name_input.value.trim();
  var recipe_ingredients = recipe_ingredients_input.value.trim();
  var recipe_steps = recipe_steps_input.value.trim();

  var isValid = true;

  if (!recipe_name) {
    recipe_name_input.style.backgroundColor = "lightcoral";
    recipe_container.style.backgroundColor = "#333";
    isValid = false;
  } else {
    recipe_name_input.style.backgroundColor = "";
  }

  if (!recipe_ingredients) {
    recipe_ingredients_input.style.backgroundColor = "lightcoral";
    recipe_container.style.backgroundColor = "#333";
    isValid = false;
  } else {
    recipe_ingredients_input.style.backgroundColor = "";
  }

  if (!recipe_steps) {
    recipe_steps_input.style.backgroundColor = "lightcoral";
    recipe_container.style.backgroundColor = "#333";
    isValid = false;
  } else {
    recipe_steps_input.style.backgroundColor = "";
  }

  if (isValid) {
    console.log(
      "cccccccsession storage username",
      sessionStorage.getItem("user_email")
    );
    console.log(
      "ccccccccccccsession storage useremail",
      sessionStorage.getItem("user")
    );
    var user_email_id = sessionStorage.getItem("user_email");

    var xhr = new XMLHttpRequest();

    const data = {
      email_id: user_email_id,
      recipe_name: recipe_name,
      recipe_ingredients: recipe_ingredients,
      recipe_steps: recipe_steps,
    };
    console.log(user_email_id, recipe_name, recipe_ingredients, recipe_steps);

    xhr.open("POST", "/create-recipes", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        var response = JSON.parse(xhr.responseText);
        console.log(response);

        if (response.message) {
          console.log("msg", response.message);
          document.getElementById("container").style.backgroundColor =
            "#00ff99";
          alert("Recipe created successfully!");
          window.location.href = "/success";
        } else {
          alert("Failed to create Recipe. Please Try Again");
        }
      } else {
        console.error("Request failed with status " + xhr.status);
        alert("Error in Creating Dish. Please try again.");
      }
    };

    xhr.send(JSON.stringify(data));
  } else {
    console.log("not valid");
  }
}
