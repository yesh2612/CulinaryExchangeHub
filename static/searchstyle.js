var xhr = new XMLHttpRequest();
var value;
xhr.open("POST", "/searchstyle", true);

xhr.setRequestHeader("Content-Type", "application/json");

xhr.onload = function () {
  if (xhr.status >= 200 && xhr.status < 300) {
    var jsonData = JSON.parse(xhr.responseText);
    value = jsonData;
  } else {
    console.error(
      "Error fetching data. Status:",
      xhr.status,
      "Text:",
      xhr.statusText
    );
  }
};

xhr.onerror = function () {
  console.error("Network error while fetching data.");
};

xhr.send(JSON.stringify({}));

function searchValue(data) {
  var check_dish_exist_flag = false;
  data_array = data.data;
  const searchTerm = document.getElementById("recipeTitle").value.toLowerCase();
  const resultsContainer = document.getElementById("searchResults");
  resultsContainer.innerHTML = "";
  if (searchTerm.length === 0) {
    console.log("null");
    resultsContainer.innerHTML = "<p>No results found</p>";
  } else if (searchTerm.length != 0) {
    console.log("not null");

    for (let i = 0; i < data_array.length; i++) {
      const item = data_array[i];
      if (item[0].toLowerCase().startsWith(searchTerm.toLowerCase())) {
        //if (item[0].toLowerCase() === searchTerm.toLowerCase()) {
        const recipeDiv = document.createElement("div");
        recipeDiv.classList.add("recipe");
        check_dish_exist_flag = true;
        var dishLabel = createLabel("Dish Name: ");
        var dishElement = createElementWithStyle(
          "span",
          "labelElement",
          item[0]
        );

        var authorLabel = createLabel("Author Name: ");
        var authorElement = createElementWithStyle(
          "span",
          "labelElement",
          item[1]
        );

        var ingredientsLabel = createLabel("Ingredients: ");
        var ingredientsElement = createElementWithStyle(
          "span",
          "labelElement",
          item[2]
        );

        var stepsLabel = createLabel("Steps to Prepare: ");
        var stepsElement = createElementWithStyle(
          "span",
          "labelElement",
          item[3]
        );

        recipeDiv.appendChild(dishLabel);
        recipeDiv.appendChild(dishElement);
        recipeDiv.appendChild(document.createElement("br"));

        recipeDiv.appendChild(authorLabel);
        recipeDiv.appendChild(authorElement);
        recipeDiv.appendChild(document.createElement("br"));

        recipeDiv.appendChild(ingredientsLabel);
        recipeDiv.appendChild(ingredientsElement);

        recipeDiv.appendChild(document.createElement("br"));

        recipeDiv.appendChild(stepsLabel);
        recipeDiv.appendChild(stepsElement);
        resultsContainer.appendChild(recipeDiv);
        add_style(recipeDiv);
        // break;
      }
    }
    if (check_dish_exist_flag === false) {
      resultsContainer.innerHTML = "<p>No results found</p>";
    }
  }
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
  element.style.backgroundColor = "#e6f7ff";
  element.style.boxShadow = "0 0 10px rgb(59, 106, 166)";
}
function searchRecipe() {
  searchValue(value);
}
