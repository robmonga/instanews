// Problem: Retrieve content from the NYT Top Stories API and add it our site.
//If we don't get a successful response, let the user know.
// 1 LIsten for the select menu change.(watching value
//1a show a loader and clear out old stories
//2 send a request to the NYT API for data based on the value of the select menu
//3 if successful, parse the data and decide what parts we want to append to our DOM
//4 append that stuff to the DOM.
//5 if unsuccessful, show a helpful error message in the UI.
//6 hide the loader again

//document ready
$(function() {
  $('#loader').hide();
  $("#sections").on("change", function() {
    const section = $(this).val();
    // if value is empty then return

    // show loader
    $("loader").show();
    // clear stories
    $(".articles").empty();
    // make our ajax request
    $.ajax({
      method: "GET",
      url:
        "https://api.nytimes.com/svc/topstories/v2/" +
        section +
        ".json?api-key=ioTcOVt0KS3240rgA0itgaAjvvXAkWZY",
      dataType: "json"
    })
    .done(function(data) { 
      const articles =data.results.filter(function(result){return result.multimedia[4]!==undefined;}).slice(0,12);
      console.log(articles);
      $.each(articles, function(key, value){
          const abstract = value.abstract;
          const media = value.multimedia[4].url;
          const url = value.url;
          $(".articles").append("<a target='_blank' href="+url+" style='background-image:url("+media+")'><p>"+abstract+"</p></a>");
        // append all the things
      })

      //
      .fail(function() {
        $(".articles").append("Sorry, please refresh.")
        //do stuff here if it doesn't work out
      })
      // hide the loader
      .always(function() {
        $('#loader').hide();


        
      });
    });
  });
});
