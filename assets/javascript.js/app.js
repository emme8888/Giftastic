// array of animals  

var animals = ["Zebra", "Monkey", "Dog", "Cat", "Turtle", "Tiger", "Lizard", "Bird", "Mouse",];
function displayGif() {
    var gif = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=Jqd7QSE3BLeS9lqbzJeMmUkoIbGovfLu&limit=10&rating=pg";


    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function (response) {
        console.log(response);
        $("#animalsView").empty();
        for (var i = 0; i < response.data.length; i++) {

            var rating = response.data[i].rating;
            var imageUrl = response.data[i].images.fixed_height.url;
            var imageStillUrl = response.data[i].images.fixed_height_still.url;

            var image = $("<img>");
            var ratingText = $("<p id ='rating'>" + "Rating: " + rating + "</p>");

            image.attr('src', imageStillUrl);
            image.attr('alt', 'gif');
            image.attr('data-state', 'still');
            image.attr('data-still', imageStillUrl);
            image.attr('data-animate', imageUrl);

            $('#animalsView').prepend(image, ratingText);
            checkState();
        }
    });
}

function renderButtons() {

    $('#buttonsView').empty();

    for (var i = 0; i < animals.length; i++) {
        var newButton = $('<button class="btn btn-danger">')
        newButton.addClass('animal');
        newButton.attr('data-name', animals[i]);
        newButton.text(animals[i]);
        $('#buttonsView').append(newButton);
    }
}

// $('#add').on('click', function (event) { 
//     event.preventDefault()
//     var animal = $('#animal-input').val().trim();
//     animals.push(animal);
//     renderButtons();
//     console.log(animal);

// })

$("form").on('submit', function (event) {
    event.preventDefault()
    var animal = $('#animal-input').val().trim();
    console.log(animal);
    animals.push(animal);
    renderButtons();

})


$(document).on('click', '.animal', displayGif);
renderButtons();

function checkState() {
    $('img').on('click', function () {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');

        }
    });
};
