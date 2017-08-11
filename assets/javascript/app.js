// Array of gifs
var gifs = ["China", "Egypt", "Poland"];

// displayGifInfo function re-rinders the HTML to display the appropriate content
function displayGifInfo() {

    var gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gif + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Creating an AJAX call for the specific gif button being clicked
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        // After data comes back from the request
        .done(function(response) {
            console.log(queryURL);

            console.log(response);
            // storing the data from the AJAX request in the results variable
            var results = response.data;

            // Looping through each result item
            for (var i = 0; i < results.length; i++) {

                // Creating and storing a div tag
                var countryDiv = $("<div class=\"countryDiv\">");

                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);

                var still = results[i].images.fixed_height_still.url;
                var animated = results[i].images.fixed_height.url;

                var countryImage = $("<img>");
                countryImage.attr("src", still);
                countryImage.attr("data-still", still);
                countryImage.attr("data-animate", animated);
                countryImage.attr("data-state", "still");
                countryImage.addClass("country-image");
                

                // Appending the paragraph and image tag to the animalDiv
                countryDiv.append(p);
                countryDiv.append(countryImage);

                // Prependng the countryDiv to the HTML page in the "#gifs-appear-here" div
                $("#gifs-appear-here").prepend(countryDiv);
            }
        });
}

// Function for displaying gif data
function renderButtons() {

    // Deleting the gifs prior to adding new gifs
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    //Looping through the array of gifs
    for (var i = 0; i < gifs.length; i++) {

        // Then dynamically generating buttons for each gif in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag.
        // (<button></button>)
        var a = $("<button>");
        // Adding a class of gif to our button
        a.addClass("gif");
        // Adding a data-attribute
        a.attr("data-name", gifs[i]);
        // Providing the initial button text
        a.text(gifs[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

// This function handles where a gif button is clicked
$("#run-search").on("click", function(event) {
    event.preventDefault();
    //This line grabs the input from the textbox
    var gif = $("#search-input").val().trim();

    // Adding gif from the textbox to our array
    gifs.push(gif);

    // Calling renderButtons which handles the processing of our gif array
    renderButtons();
});

// countryImage.attr("src", results[i].images.fixed_height_still.url);
$(document).on("click", ".country-image", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

// Adding a click event listener to all elements with a class of "gif"
$(document).on("click", ".gif", displayGifInfo);

// Calling the renderButtons function to display the initial buttons
renderButtons();