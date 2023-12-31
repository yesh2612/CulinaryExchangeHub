var xhr = new XMLHttpRequest();

xhr.open("POST", "/display_my_dishes", true);

xhr.setRequestHeader("Content-Type", "application/json");

xhr.onload = function () {
  if (xhr.status >= 200 && xhr.status < 300) {
    var jsonData = JSON.parse(xhr.responseText);
    console.log("ssssssssssssssssssss", jsonData);
    display_dishes(jsonData);
  } else {
    console.error(
      "Error fetching data. Status:",
      xhr.status,
      "Text:",
      xhr.statusText
    );
  }
};
xhr.send(JSON.stringify({}));
xhr.onerror = function () {
  console.error("Network error while fetching data.");
};

function display_dishes(data) {
  var check_dish_exist_flag = false;
  data_array = data.data;

  console.log("dataaaaaray", data_array);
  var searchTerm_element = sessionStorage.getItem("user_email");
  if (searchTerm_element) {
    var textContentValue = searchTerm_element;
    console.log("aaaaaaaaa", searchTerm_element.toLowerCase());

    console.log("Text content value:", textContentValue);
  } else {
    console.log("Element not found");
  }
  var searchTerm = searchTerm_element.toLowerCase();

  const resultsContainer = document.getElementById("searchResults");
  resultsContainer.innerHTML = "";
  if (searchTerm.length === 0) {
    console.log("null");
    resultsContainer.innerHTML = "<p>YNo recipes found</p>";
    resultsContainer.style.color = "white";
    resultsContainer.style.fontSize = "50px";
  } else if (searchTerm.length != 0) {
    console.log("not null");

    for (let i = 0; i < data_array.length; i++) {
      const item = data_array[i];
      //console.log("iteeeem", item[0].toLowerCase());
      console.log("id", item[0]);
      console.log("dishname", item[1].toLowerCase());
      console.log("author", item[2].toLowerCase());
      console.log("search", searchTerm.toLowerCase());
      if (item[2].toLowerCase() === searchTerm.toLowerCase()) {
        const recipeDiv = document.createElement("div");
        recipeDiv.classList.add("recipe");
        check_dish_exist_flag = true;
        var recipeid = createLabel("Dish ID: ");
        recipeid.className = "labelheading";

        var recipeidElement = createElementWithStyle(
          "span",
          "recipeID",
          item[0]
        );
        recipeidElement.className = "recipeID";

        var dishLabel = createLabel("Dish Name: ");
        dishLabel.className = "labelheading";
        var dishElement = createElementWithStyle(
          "span",
          "dishlbl labelElement",
          item[1]
        );
        var dishtext = createInputWithStyle("dishElement textElement", item[1]);

        var ingredientsLabel = createLabel("Ingredients: ");
        ingredientsLabel.className = "labelheading";
        var ingredientsElement = createElementWithStyle(
          "span",
          "inglbl labelElement",
          item[3]
        );

        var ingredietnstxt = createInputWithStyle(
          "ingElement textElement",
          item[3]
        );
        var stepsLabel = createLabel("Steps to Prepare: ");
        stepsLabel.className = "labelheading";
        var stepsElement = createElementWithStyle(
          "span",
          "stepslbl labelElement",
          item[4]
        );
        var stepstext = createInputWithStyle(
          "stepsElement textElement",
          item[4]
        );

        recipeDiv.appendChild(recipeid);
        recipeDiv.appendChild(recipeidElement);
        recipeDiv.appendChild(document.createElement("br"));

        recipeDiv.appendChild(dishLabel);
        recipeDiv.appendChild(dishElement);

        recipeDiv.appendChild(dishtext);
        recipeDiv.appendChild(document.createElement("br"));

        recipeDiv.appendChild(ingredientsLabel);
        recipeDiv.appendChild(ingredientsElement);
        recipeDiv.appendChild(ingredietnstxt);

        recipeDiv.appendChild(document.createElement("br"));

        recipeDiv.appendChild(stepsLabel);
        recipeDiv.appendChild(stepsElement);
        recipeDiv.appendChild(stepstext);

        resultsContainer.appendChild(recipeDiv);
        add_style(recipeDiv);

        var textElements = recipeDiv.querySelectorAll(".textElement");
        textElements.forEach((textElement) => {
          textElement.style.opacity = 0;
        });

        var editButton = createButton("Edit", function () {
          toggleEditFields(recipeDiv);
        });

        recipeDiv.appendChild(editButton);
        resultsContainer.appendChild(recipeDiv);
        add_style(recipeDiv);
        var updateButton = createButton("Update", function () {
          updateRecipe(recipeDiv);
        });
        updateButton.classList.add("updateButton");
        recipeDiv.appendChild(updateButton);
        updateButton.style.cursor = "default";
        updateButton.style.opacity = 0;

        var cancelButton = createButton("Cancel", function () {
          cancel_function(recipeDiv);
        });

        cancelButton.classList.add("cancelButton");
        recipeDiv.appendChild(cancelButton);
        cancelButton.style.cursor = "default";
        cancelButton.style.opacity = 0;
      }
    }
    if (check_dish_exist_flag === false) {
      resultsContainer.innerHTML = "<p>No recipes found</p>";
      resultsContainer.style.color = "white";
      resultsContainer.style.fontSize = "50px";
    }
  }
}

function cancel_function(element) {
  var labels = element.querySelectorAll(".labelElement");
  var textElements = element.querySelectorAll(".textElement");
  var inputElements = element.querySelectorAll(".inputElement");
  var editButton = element.querySelector(".editButton");
  var updateButton = element.querySelector(".updateButton");
  var cancelButton = element.querySelector(".cancelButton");

  labels.forEach((label) => {
    label.style.opacity = 1;
  });

  textElements.forEach((textElement) => {
    textElement.style.opacity = 0;
  });

  inputElements.forEach((inputElement) => {
    inputElement.style.opacity = 0;
  });

  editButton.style.opacity = 1;
  updateButton.style.opacity = 0;
  cancelButton.style.opacity = 0;

  editButton.style.cursor = "pointer";
  updateButton.style.cursor = "default";
  cancelButton.style.cursor = "default";
}

function createLabel(text) {
  var label = document.createElement("label");
  label.textContent = text;
  label.style.display = "inline-block";
  label.style.width = "120px";
  label.style.marginBottom = "5px";
  return label;
}

function createElementWithStyle(tag, className, text) {
  var element = document.createElement(tag);
  element.textContent = text;
  element.className = className;
  return element;
}

function add_style(element) {
  element.style.border = "1px solid #ccc";
  element.style.padding = "20px";
  element.style.margin = "20px";
  element.style.height = "auto";
  element.style.borderRadius = "8px";
  // element.style.backgroundColor = "rgb(67, 161, 233)";
  element.style.boxShadow = "0 0 10px rgb(59, 106, 166)";
}

function toggleEditFields(element) {
  var labels = element.querySelectorAll(".labelElement");
  console.log("laaaaaaaaab", labels);
  var textElements = element.querySelectorAll(".textElement");
  console.log("tttt", textElements);
  var inputElements = element.querySelectorAll(".inputElement");
  var editButton = element.querySelector(".editButton");
  var updateButton = element.querySelector(".updateButton");
  var cancelButton = element.querySelector(".cancelButton");

  var isEditing = element.getAttribute("data-editing") === "true";

  labels.forEach((label) => {
    console.log("labelllllllll", label);

    label.style.opacity = 0;
  });

  textElements.forEach((textElement) => {
    textElement.style.opacity = 1;
  });

  inputElements.forEach((inputElement) => {
    inputElement.style.opacity = 1;
  });
  updateButton.style.opacity = 1;
  cancelButton.style.opacity = 1;
  editButton.style.opacity = 0;

  editButton.style.cursor = "default";
  updateButton.style.cursor = "pointer";
  cancelButton.style.cursor = "pointer";
  if (!isEditing) {
    element.setAttribute("data-editing", "true");
  }
}

function createInputWithStyle(className, value) {
  var input = document.createElement("input");
  input.type = "text";
  input.className = className;

  input.value = value || "";

  input.addEventListener("input", function () {
    if (input.value.trim() === "") {
      input.classList.add("empty-input");
    } else {
      input.classList.remove("empty-input");
    }

    updateButtonStatus();
  });

  return input;
}

function updateButtonStatus() {
  var textElements = document.querySelectorAll(".textElement");
  var updateButton = document.querySelector(".updateButton");

  var allValid = true;

  textElements.forEach(function (textElement) {
    if (textElement.value.trim() === "") {
      allValid = false;
    }
  });

  updateButton.disabled = !allValid;
}

function createButton(text, clickHandler) {
  var button = document.createElement("button");
  button.textContent = text;
  button.className = "editButton";
  button.addEventListener("click", clickHandler);
  return button;
}

function updateRecipe(element) {
  var labels = element.querySelectorAll(".labelElement");
  var textElements = element.querySelectorAll(".textElement");
  var inputElements = element.querySelectorAll(".inputElement");
  var editButton = element.querySelector(".editButton");
  var updateButton = element.querySelector(".updateButton");
  var cancelButton = element.querySelector(".cancelButton");

  labels.forEach((label) => {
    label.style.opacity = 1;
  });

  textElements.forEach((textElement) => {
    textElement.style.opacity = 0;
  });

  inputElements.forEach((inputElement) => {
    inputElement.style.opacity = 0;
  });

  editButton.style.opacity = 1;
  updateButton.style.opacity = 0;
  cancelButton.style.opacity = 0;

  editButton.style.cursor = "pointer";
  updateButton.style.cursor = "default";
  cancelButton.style.cursor = "default";

  var recipe_id = element.querySelector(".recipeID").textContent;
  var dishValue = element.querySelector(".dishElement").value;
  console.log("disssss", dishValue);
  var ingredientsValue = element.querySelector(".ingElement").value;
  var stepsValue = element.querySelector(".stepsElement").value;

  element.querySelector(".dishlbl").textContent = dishValue;
  element.querySelector(".inglbl").textContent = ingredientsValue;
  element.querySelector(".stepslbl").textContent = stepsValue;
  console.log("wwwwwwwwwwwwwwwwassup", recipe_id);

  const data = {
    recipe_id: recipe_id,
    dish_name: dishValue,
    ingredients: ingredientsValue,
    steps: stepsValue,
  };

  var xhr2 = new XMLHttpRequest();
  xhr2.open("POST", "/insert_modified_data_into_database", true);

  xhr2.setRequestHeader("Content-Type", "application/json");

  xhr2.onload = function () {
    if (xhr2.status >= 200 && xhr2.status < 300) {
      var jsonData = JSON.parse(xhr2.responseText);
      console.log("completed", jsonData);
    } else {
      console.error(
        "Error fetching data. Status:",
        xhr2.status,
        "Text:",
        xhr2.statusText
      );
    }
  };
  xhr2.send(JSON.stringify(data));
  xhr2.onerror = function () {
    console.error("Network error while fetching data.");
  };
}
