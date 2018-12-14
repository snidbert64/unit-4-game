
var oppHealth = 100;
var Health = 100;
var isMyTurn = false;
var cpuCounter = 0;
var oppTurns;
var character;
var defeatedEnemies = 0;
var placeholder;

var enemies = {
    "Vader" : {
        name : "Darth Vader",
        id : "Vader",
        imageAlive : "assets/images/Darth_Vader.jpg",
        health : 80,
        attack : 20
    },
    "Trooper" : {
        name : "Stormtrooper",
        id : "Trooper",
        imageAlive : "assets/images/StormTrooperAlive.jpg",
        health : 20,
        attack : 1
    },
    "Sand" : {
        name : "Sandtrooper",
        id : "Sand",
        imageAlive : "assets/images/Sandtrooper_DICE.png",
        health : 20,
        attack : 1
    },
}

var chars = [
    {
        name : "Luke Skywalker",
        id : "Luke",
        imageAlive : "assets/images/Luke-Skywalker.jpg",
        health : 100,
        attack : 20,
        foes : [enemies["Vader"], enemies["Trooper"], enemies["Sand"]]
    }
];

var opponentChars = [];

function mainMenu() {
    $("#play-button").on( "click", function() {
        console.log("play button clicked");
        this.style.display = "none";
        for (var j=0; j < chars.length; j++) {
            var charDiv = $("<div class='card col-md-2'></div>");
            charDiv.append($("<img class='card-img-top' src='" + chars[j].imageAlive + "' height=150px width=150px>"));
            charDiv.append($("<button class='card-title select-char' value='" + j + "'>" + chars[j].name + "</button>"));
            charDiv.appendTo($("#characters"));
        }
        $(".select-char").on( "click", function() {
            character = chars[this.value];
            $("#characters").empty();
            runGame();
        });
    });
}

function runGame() {
    var charDiv = $("<div class='card col-md-2'></div>");
    charDiv.append($("<img class='card-img-top' src='" + character.imageAlive + "' height=150px width=150px>"));
    charDiv.append($("<p class='card-title'><strong>" + character.name + "</strong></p>"));
    charDiv.append($("<p>Health: <span id='human-health'>" + character.health + "</span></p>"));

    charDiv.appendTo($("#characters"));
    opponentChars = character.foes;
    for (var i=0; i < opponentChars.length; i++) {
        var opponentDiv = $("<div class='card col-md-2'></div>");
        opponentDiv.append($("<img class='card-img-top' src='" + opponentChars[i].imageAlive + "' height=150px width=150px>"));
        opponentDiv.append($("<p class='card-title'><strong>" + opponentChars[i].name + "</p>"));
        opponentDiv.append($("<p>Health: <span id='" + opponentChars[i].id + "-health'>" + opponentChars[i].health + "</span></p>"));
        opponentDiv.append($("<button class='attack-button' value='" + i + "'>Attack</button>"));
        opponentDiv.appendTo($("#characters"));
    }

    humanTurn();

    $(".attack-button").on( "click", function() {
        if (isMyTurn) {
            opponentChars[this.value].health += -20;
            if (opponentChars[this.value].health <= 0) {
                $("#" + opponentChars[this.value].id + "-health").html("0");
                this.style.display = "none";
                defeatedEnemies++;
            } else {
                $("#" + opponentChars[this.value].id + "-health").html(opponentChars[this.value].health);
            }
            isMyTurn = false;
            cpuTurn();
        }
    });
}

function humanTurn() {
    if (opponentChars.length === defeatedEnemies) {
        $("#turn").html("You Win! <a href='index.html'>Click Here to play again.</a>");
    } else {
        $(".attack-button").show();
        $("#turn").html("Your Turn");
        isMyTurn = true;
    }
}

function cpuTurn() {
    $(".attack-button").hide();
    if (cpuCounter >= opponentChars.length || Health <= 0) {
        if (Health <= 0) {
            $("#human-health").html("0");
            $("#turn").html("You Lose! <a href='index.html'>Click Here to play again.</a>");
        } else {
            isMyTurn = true;
            humanTurn();
            cpuCounter = 0;
        }
    } else {
        if (cpuCounter === Math.floor(cpuCounter)) {
            console.log(opponentChars[cpuCounter]);
            $("#turn").html(opponentChars[cpuCounter].name + "'s Turn");
            if (cpuCounter + 1 != opponentChars.length) {
                placeholder = true;
                while (placeholder && opponentChars[cpuCounter + 1].health <= 0) {
                    cpuCounter++;
                    placeholder = (cpuCounter + 1 < opponentChars.length);
                }
            }
        } else {
            Health += -opponentChars[cpuCounter - 0.5].attack;
            $("#human-health").html(Health);
        }
        cpuCounter += 0.5;
        setTimeout(cpuTurn, 1000);
    }
}

function cpuAttack() {
    
}