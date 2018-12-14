
var humanChar;
var opponent;
var defeatedFoes = 0;

var charList = ["Vader", "Trooper", "Sand", "Luke"];
var characters = {
    "Vader" : {
        name : "Darth Vader",
        id: "Vader",
        imageAlive : "assets/images/Darth_Vader.jpg",
        health : 80,
        baseAttack : 10,
        attack : 10,
        counterAttack : 25
    },
    "Trooper" : {
        name : "Stormtrooper",
        id : "Trooper",
        imageAlive : "assets/images/StormTrooperAlive.jpg",
        health : 100,
        baseAttack : 10,
        attack : 10,
        counterAttack : 10
    },
    "Sand" : {
        name : "Sandtrooper",
        id : "Sand",
        imageAlive : "assets/images/Sandtrooper_DICE.png",
        health : 100,
        baseAttack : 10,
        attack : 10,
        counterAttack : 10
    },
    "Luke" : {
        name : "Luke Skywalker",
        id : "Luke",
        imageAlive : "assets/images/Luke-Skywalker.jpg",
        health : 150,
        baseAttack : 5,
        attack : 5,
        counterAttack : 5
    }
}

function mainMenu() {
    $("#play-button").on( "click", function() {
        $("#play-button").hide();
        for (var i = 0; i < charList.length; i++) {
            var characterCard = $("<div id='" + characters[charList[i]].id + "' class='card col-md-2 character-card opponent'></div>")
            characterCard.append($("<img height=150 width=150 class='card-img-top' src='" + characters[charList[i]].imageAlive + "'>"));
            characterCard.append($("<h5 class='card-title'>" + characters[charList[i]].name + "</h5>"));
            characterCard.append($("<p class='card-text'>Health: " + "<span id='" + characters[charList[i]].id + "-health'>" + characters[charList[i]].health + "</span></p>"));
            characterCard.appendTo($("#characters"));
        }
        $("#prompt").text("Choose your character");
        $(".character-card").on( "click", function() {
            $(".character-card").off("click");
            humanChar = this.id;
            $("#" + this.id).removeClass("opponent");
            $("#" + this.id).clone().appendTo($("#fighters"));
            this.remove();
            $("#prompt").text("Click any opponent to fight!");
            game();
        });
    });
}


function game() {
    $("#prompt").text("Click any opponent to fight!");
    $(".opponent").on("click", function() {
        $(".opponent").off("click");
        opponent = this.id;
        $("#" + this.id).clone().appendTo($("#fighters"));
        this.remove();
        $("#prompt").text("Click your chosen opponent to attack");
        $("#" + opponent).on("click", function() {
            characters[opponent].health += -characters[humanChar].attack;
            if (characters[opponent].health <= 0) {
                $("#" + opponent).remove();
                defeatedFoes++;
                if (defeatedFoes === charList.length - 1) {
                    $("#prompt").html("You Win! Click <a href='index.html'>here</a> to restart.");
                } else {
                game();
                }
            } else {
                $("#" + opponent + "-health").text(characters[opponent].health);
                characters[humanChar].attack += characters[humanChar].baseAttack;
                characters[humanChar].health += -characters[opponent].counterAttack;
                if (characters[humanChar].health <= 0) {
                    $("#" + humanChar + "-health").text(0);
                    $("#prompt").html("You Lose! Click <a href='index.html'>here</a> to restart.");
                } else {
                    $("#" + humanChar + "-health").text(characters[humanChar].health);
                }
            }
        });
            
    });
}

