function loadContent(pageName) {
  $.ajax({
    type: "POST",
    url: "/load-content",
    data: { page_name: pageName },
    success: function (data) {
      $("#loaded-content").html(data);
      updateActiveLink(pageName);
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

$(document).ready(function () {
  loadContent("home-page");
});
