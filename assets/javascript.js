$(document).ready(function() {

    var search = {
        topics: ["Mario", "Zelda", "Pokemon", "Kirby", "Metroid", "Castlevania", "Star fox", "Fire Emblem", "Final Fantasy", "Street Fighter", "Donkey Kong", "Super Smash Bros",
    "Masahiro Sakurai", "Nintendo", "Nintendo Switch"],
       
    defaultButtons: function() {
            for(x = 0; x < search.topics.length; x++) {
            var btn = $('<button>');
            btn.attr("data-search", search.topics[x]);
            btn.addClass("btn");
            btn.addClass("btn-primary");
            btn.addClass("searchbtn");
            btn.text(search.topics[x]);
            $("#topicList").append(btn);
            }
        },

    addTopic: function(event) {
        event.preventDefault();
        var newTopic = $('#submitForm').val();
        for(x = 0; x < search.topics.length; x++) {
            console.log(search.topics[x]);
        }
        if(newTopic.length > 0) {
           search.topics.push(newTopic);
           var btn = $('<button>');
            btn.attr("data-search", newTopic);
            btn.addClass("btn");
            btn.addClass("btn-primary");
            btn.addClass("searchbtn");
            btn.text(newTopic);
            search.topics.push(newTopic);
            $("#topicList").append(btn); 
        }
    },

    gifDisplay: function(event) {
        event.preventDefault();
        $('#display').empty(); 

        
        var userQuery = $(this).data('search');
        var key = "&api_key=ommnVUQWOM61cr1zz1RSis1YJdQyVBkk";
        var limit = "&limit=10"
        var reqUrl = "https://api.giphy.com/v1/gifs/search?q=" + userQuery + limit + key;

            $.ajax({
                url: reqUrl,
                method: "GET"
            }).done(function(response) {
                for(x = 0; x < response.data.length; x++) {
                    
                    var animatedGif = response.data[x].images["fixed_height"].url;
                    var stillGif = response.data[x].images["fixed_height_still"].url;
                    var rating = response.data[x].rating.toUpperCase();

                    var gifCont = $('<div>');
                    gifCont.addClass('gifContainer')
                    
                    var ratingPrint = $('<p>');
                    ratingPrint.text("Rating: " + rating);

                    var gifPrint = $('<img>');
                    gifPrint.attr('src', stillGif);
                    gifPrint.attr('data-animate', animatedGif);
                    gifPrint.attr('data-still', stillGif);
                    gifPrint.attr('data-state', "still");
                    gifPrint.addClass('gif');

                    gifCont.prepend(ratingPrint);
                    gifCont.append(gifPrint);

                    $("#display").append(gifCont);

                }
                $('.gif').on("click", function() {
                    var state = $(this).attr("data-state");
                    if (state === "still") {
                        $(this).attr('src', $(this).data("animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr('src', $(this).data("still"));
                        $(this).attr("data-state", "still");
                    }
                });
                })
    }
}

    $("#submitNew").click(search.addTopic);
    $(document).on('click', '.searchbtn', search.gifDisplay);
    search.defaultButtons();
    
});
