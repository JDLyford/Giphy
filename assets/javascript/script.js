//Institute Variables
var animals = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "chipmunk", "sugar glider", "chinchilla", "bunny", "kangaroo", "seal", "fennec", "meerkat", "capybara", "panda", "serval", "penguin", "koala"];

//Functions

function renderButtons() {
    $(".buttons-view").empty();
    for (var i = 0; i < animals.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("animal btn btn-default");
        newButton.attr("data-name", animals[i]);
        newButton.text(animals[i]);
        $(".buttons-view").append(newButton);
    }
};

$("#add-animal").on("click", function (event) {
    event.preventDefault();
    var animal = $("#animal-input").val().toLowerCase().trim();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        if (response.data.length == 0) {
            alert("No Gifs found for animal");
        } else if (animals.indexOf(animal) != -1) {
            alert("Animal already exists");
        } else {
            animals.push(animal);
            renderButtons();
        }

    });
});

function displayGifs() {
    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);

        $(".gifs-view").empty();
        for (var i = 0; i < response.data.length; i++) {
            var gifDiv = $("<div>");
            gifDiv.addClass("gifDiv");
            gifDiv.html("<p>Rating: " + response.data[i].rating.toUpperCase() + "</p>");

            var gifImage = $("<img src='" + response.data[i].images.fixed_height_still.url + "'>");
            gifImage.addClass("gif");

            var imageDiv = $("<div>");
            imageDiv.addClass("play");
            imageDiv.attr("data-state", "still");
            imageDiv.attr("data-name", animal);
            imageDiv.attr("data-still", response.data[i].images.fixed_height_still.url);
            imageDiv.attr("data-animate", response.data[i].images.fixed_height.url)

            $(imageDiv).append(gifImage);
            $(gifDiv).append(imageDiv);
            $(".gifs-view").append(gifDiv);
        }

    });
};

function playGif() {

    if ($(this).attr("data-state") == "still") {
        $(this).html("<img src='" + $(this).attr("data-animate") + "'>");
        $(this).attr("data-state", "animate");
    } else {
        $(this).html("<img src='" + $(this).attr("data-still") + "'>");
        $(this).attr("data-state", "still");
    }

};


$(document).on("click", ".animal", displayGifs);
$(document).on("click", ".play", playGif);

renderButtons();