


var characters = [
    {
        name : "Darth Vader",
        id: "Vader",
        imageAlive : "assets/images/Darth_Vader.jpg",
        health : 150,
        baseAttack : 5,
        attack : 5,
        counterAttack : 20
    },
    {
        name : "Stormtrooper",
        id : "Trooper",
        imageAlive : "assets/images/StormTrooperAlive.jpg",
        health : 100,
        baseAttack : 5,
        attack : 5,
        counterAttack : 20
    },
    {
        name : "Sandtrooper",
        id : "Sand",
        imageAlive : "assets/images/Sandtrooper_DICE.png",
        health : 100,
        baseAttack : 5,
        attack : 5,
        counterAttack : 20
    },
    {
        name : "Luke Skywalker",
        id : "Luke",
        imageAlive : "assets/images/Luke-Skywalker.jpg",
        health : 150,
        baseAttack : 5,
        attack : 5,
        counterAttack : 20
    }
]

function mainMenu() {
    $("#play-button").on( "click", function() {
        $("#play-button").hide();
        for (var i = 0; i < characters.length; i++) {
            var characterCard = $("<div id='" + characters[i].id + "' class='card col-md-2 character-card'></div>")
            characterCard.append($("<img height=150 width=150 class='card-img-top' src='" + characters[i].imageAlive + "'>"));
            characterCard.append($("<h5 class='card-title'>" + characters[i].name + "</h5>"));
            characterCard.append($("<p class='card-text'>Health: " + characters[i].health + "</p>"));
            characterCard.appendTo($("#characters"));
        }
        $("#prompt").text("Choose your character");
        $(".character-card").on( "click", function() {
            $("#" + this.id).clone().appendTo($("#fighters"));
            this.remove();
            $("#prompt").text("Click any opponent to fight!");
        });
    });
}

