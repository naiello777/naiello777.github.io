// Main function that loads information on the various pages
$(document).on("pageshow", function ()
{
    if ($('.ui-page-active').attr('id') == "pageBoilerInfo")
    {
        loadBoilerForm();
    }
    else if ($('.ui-page-active').attr('id') == "pageBoilerData")
    {
        displayBoilerInfo();
        listDataEntries();
    }
    else if ($('.ui-page-active').attr('id') == "pageRecommendations")
    {
        recommendPage();
        resizeGraph();
    }
    else if ($('.ui-page-active').attr('id') == "pageGraph")
    {
        drawGraph();
        resizeGraph();
    }
});

function resizeGraph() {
    if ($(window).width() < 700) {
      $("#GraphCanvas").css({
        "width": $(window).width() - 50
      });
      $("#RecommendCanvas").css({
        "width": $(window).width() - 50
      });
    }
  }
  
  // Attach event handler for window resizing event
  $(window).resize(function () {
    resizeGraph();
  });