var animals = ["cow", "monkey", "dog", "cat", "turtle", "tiger", "lizard", "bird", "mouse", "moose"];
var animal = $("#gif-input").val();
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&limit=10&api_key=HjPHr51uNnSx1XlRqOGicfiig8RSRicJ";

// displayAnimalfunction re-renders the HTML to display the appropriate content
function displayAnimal() {
  animal = $(this).attr("data-name");
  queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&limit=10&api_key=HjPHr51uNnSx1XlRqOGicfiig8RSRicJ";

  // Creates AJAX call for the specific animal button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) { 
    $("#animals-view").empty();
    console.log(response);
    
    for (var i = 0; i < 10; i++) {
    var activeImage = response.data[i].images.downsized_medium.url;
    var stillImage = response.data[i].images.downsized_still.url;
    var rating = response.data[i].rating;
      
      var gifDiv = $("<div>");
      gifDiv.attr("class", "gifDiv");
      $("#animals-view").append(gifDiv);
      $(gifDiv).append("<p>Rated: " + rating + "</p>");
      $(gifDiv).append("<img class='gif' src='" + stillImage + "' data-animate ='" + activeImage + "' data-still='" + stillImage + "'>");

      $(document).on("click", ".gif", function() {
        var state = $(this).attr("data-state");
        console.log(state);

        // CODE GOES HERE
        if (state == "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        }

        else if (state != "still"){
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });    
    }
  });
  }

// Function for displaying animal gif
function renderButtons() {
  $("#buttons-view").html(" ");
  // Loops the array of animals and creates buttons for those animals
  for (var i = 0; i < animals.length; i++) {
     var button = $("<button>");
    button.addClass("button");
    button.attr("data-name", animals[i]);
    button.text(animals[i]);
    $("#buttons-view").append(button);
      }
}

// add gif button is clicked
$("#add-gif").on("click", function(event) {
  event.preventDefault();
  var gifInput = $("#gif-input").val();
  animals.push(gifInput);

  $("#gif-input").val("");
  renderButtons();
});

$(document).on("click", ".button", displayAnimal);

renderButtons();
  