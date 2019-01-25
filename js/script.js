console.log("Welcome to instanews123");
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
$(function(){
    $('#sections').on('change', function(){
        const section=$(this).val(;)
//console.log(section);

// if value is empty then return
// show loader
// clear stories

//make our ajax request
$.ajax({
    method:'GET',
    url: ' https://api.nytimes.com/svc/topstories/v2/'+
    section + 
    '.json?ioTcOVt0KS3240rgA0itgaAjvvXAkWZY ',
    dataType:'json'
}).done(function(response)) {
 // append all the things
}).fail(function() {
    //do stuff here if it doesn't work out
}).always(function(){
    // hide the loader
})
    });
});