var xhr = new XMLHttpRequest();

xhr.open("POST", "/display", true);

xhr.setRequestHeader("Content-Type", "application/json");

xhr.onload = function () {
  if (xhr.status >= 200 && xhr.status < 300) {
    var jsonData = JSON.parse(xhr.responseText);

    displayData(jsonData);
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

function displayData(data) {
  var container = document.getElementById("dataContainer");
  var mainContainer = document.createElement("div");
  mainContainer.className = "mainContainer center-container";
  data_array = data.data;
  data_array.forEach(function (item) {
    if (Array.isArray(item) && item.length >= 4) {
      var itemContainer = document.createElement("div");
      itemContainer.className = "itemContainer";

      var dishLabel = createLabel("Dish Name: ");
      var dishElement = createElementWithStyle("span", "labelElement", item[0]);

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
      itemContainer.classList.add("slide");
      itemContainer.addEventListener("animationend", function () {
        document.body.style.overflow = "auto";
      });
      itemContainer.appendChild(dishLabel);
      itemContainer.appendChild(dishElement);
      itemContainer.appendChild(document.createElement("br"));

      itemContainer.appendChild(authorLabel);
      itemContainer.appendChild(authorElement);
      itemContainer.appendChild(document.createElement("br"));

      itemContainer.appendChild(ingredientsLabel);
      itemContainer.appendChild(ingredientsElement);

      itemContainer.appendChild(document.createElement("br"));

      itemContainer.appendChild(stepsLabel);
      itemContainer.appendChild(stepsElement);

      mainContainer.appendChild(itemContainer);
    } else {
      console.error(
        "Invalid item format. Expected an array with at least three elements."
      );
    }
  });

  container.appendChild(mainContainer);
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
