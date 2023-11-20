function loadContent(pageName) {
  $.ajax({
    type: "POST",
    url: "/load-content",
    data: { page_name: pageName },
    success: function (data) {
      $("#loaded-content").html(data);
      updateActiveLink(pageName);
      var log_txt = document.querySelector(".profile .dropdown a");
      console.log("aaaaaaaaaaa", log_txt);
    },
    error: function () {
      alert("Error loading content.");
    },
  });
}

function updateActiveLink(activeLink) {
  $(".main-nav a").removeClass("active");
  $(".main-nav a:contains(" + activeLink + ")").addClass("active");
}

function display_user_not_found_msg(xmlhttp) {
  console.error("Request failed with status", xmlhttp.status);

  console.log("error", JSON.parse(xmlhttp.responseText));
}

function display_login_success(xmlhttp) {
  console.log("response=", JSON.parse(xmlhttp.responseText));
}

function display_response_failure_msg(xmlhttp) {
  console.error("Request failed with status", xmlhttp.status);

  val = JSON.parse(xmlhttp.responseText);

  console.log("eeeeeeeee", val.message);

  console.log("error", JSON.parse(xmlhttp.responseText));
}
