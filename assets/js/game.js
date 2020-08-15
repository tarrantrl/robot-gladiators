// Use camel case for variables, JS can't do hyphens

// fight or skip function
var fightOrSkip = function() {
    // ask user if they want to fight or skip
    var promptFight = window.prompt ("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    //recursive call until a valid answer is provided
    // can use falsy values check here instead of specifying === "" or === null
    if (!promptFight){
        window.alert("You need to provide a valid answer! Please choose 'FIGHT' or 'SKIP.'");
        return fightOrSkip();
    }
    // convert user input to lower case
    promptFight = promptFight.toLowerCase();
    // if the user picks skip, confirm and then stop the loop
    if (promptFight === "skip"){
        // confirm that they want to quit.
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // if yes, subtract money and leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            // subtract money from playerInfo.money for skipping
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            console.log("player money", playerInfo.money);
            //return true is player wants to skip
            return true;
        }
    }
    return false;
}

// create a function called "fight"
var fight = function(enemy) {
    //keep track of who goes first
    var isPlayerTurn = true;
    if (Math.random() > 0.5){
        isPlayerTurn = false;
    }
    //console.log("turn " + isPlayerTurn);

    // repeat and execute as long as the enemy robot is alive and the player is alive
    while(enemy.health > 0 && playerInfo.health > 0) {
        // if player turn
        if (isPlayerTurn){
            // check if the player wants to fight or skip
            if (fightOrSkip()) {
                //if true, leave fight
                break;
            }
            
            //generate random damage based on player's attack power
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

            // remove damage from enemy robot
            enemy.health = Math.max(0, enemy.health - damage);

            // Log a resulting message to the console to confirm that it worked.
            console.log(
                playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
            );

            // check enemy's health
            if (enemy.health <= 0){
                window.alert(enemy.name + " has died!");
                //award player money for winning
                playerInfo.money += 20;
                //leave while loop since enemy is dead
                break;
            }else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }
        // else if it is not player turn
        } else {
            // Subtract the value of enemy.attack from the value of playerInfo.health
            var playerDamage = randomNumber(enemy.attack - 3, enemy.attack);
            // remove damage from player health
            playerInfo.health = Math.max(0, playerInfo.health - playerDamage);

            // Log a resulting message to the console to confirm that it worked.
            console.log(
                enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
            );

            // check player's health
            if (playerInfo.health <= 0){
                window.alert(playerInfo.name + " has died!");
                //if player died, leave while loop    
                break;
            } else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
        }
        //switch turns
        isPlayerTurn = !isPlayerTurn;
    }   
};

// function to start a new game
var startGame = function(){
    //reset player stats
    playerInfo.reset();
    // Iterate through the enemyInfo array and call fight each time
    for(var i = 0; i < enemyInfo.length; i++){
        // check if player has remaining health
        if (playerInfo.health > 0){
            //Alert users that they're starting the round.
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
            //debugger;
            // pick an enemy based on the index of enemyInfo
            var pickedEnemyObj = enemyInfo[i];
            // generate a random number between 40 and 60 for enemy.health
            pickedEnemyObj.health = randomNumber(40, 60);
            // console.log(enemy.health, enemy.attack);
            // debugger;

            // pass pickedEnemyObj to fight function
            fight(pickedEnemyObj);

            // after the fight, if we are not on the last enemy in the array and the player is alive 
            if (playerInfo.health > 0 && i < enemyInfo.length - 1){
                // ask if user wants to use the store before the next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
                //if yes
                if (storeConfirm){
                    //call shop function
                    shop();
                }  
            }
        // else if player has no health left
        } else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }
    // call endGame to play again or stop playing
    endGame();
}

// write function to end the game
var endGame = function() {
    //if player is alive, they win
    if (playerInfo.health > 0){
        // player score is equal to their money
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
        // when the game has ended and we survived
        // retrieve current high score from local storage
        var highScore = localStorage.getItem("highScore");
        // if null, set to 0
        // if (highScore === null) {
        //     highScore = 0;
        // }
        // can use truthy to set highScore to 0 if null shortcut
        highScore = highScore || 0;
        //convert highScore to number since localStorage is all strings
        highScore = parseInt(highScore);
        // compare player score to current high score
        // if player money is higher than current high score
        if (highScore < playerInfo.money){
            // set new high score in localStorage
            localStorage.setItem("highScore", playerInfo.money);
            // set player robot's name in localStorage
            localStorage.setItem("name", playerInfo.name);
            // alert player that they beat the high score
            window.alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
        // else if player score higher
        } else {
            // alert that player did not beat high score
            window.alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
        }
    // else if player has not health left         
    }else {
        window.alert("You've lost your robot in battle.");
    }
    //ask the player if they want to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");
    if (playAgainConfirm){
        //restart game
        startGame();
    }else{
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
}

// write function for shop interactions
var shop = function() {
    //console.log("entered shop");
    // ask player what they'd like to do
    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter 1 for REFILL, 2 for UPGRADE, or 3  for LEAVE to make a choice.");
    // use switch to decide what to do with the shop prompt
    shopOptionPrompt = parseInt(shopOptionPrompt);
    switch (shopOptionPrompt){
        // 1 for refill
        case 1:
            playerInfo.refillHealth();
            break;
        // 2 for upgrade
        case 2:
            playerInfo.upgradeAttack();
            break;
        // 3 for leave
        case 3:
            window.alert("Leaving the store");
            break;
        default:
            window.alert("You did not pick a valid option. Try again.")
            //call shop() again
            shop();
            break;
    }
}

//function to generate random value between two values
var randomNumber = function (min, max){
    var value = Math.floor(Math.random() * (max - min + 1) + min);
    return value;
}

// function to get player name. Do not accept blank or null
var getPlayerName = function (){
    var name = "";
    // use while loop to check if name is null
    while (name === "" || name === null){
        name = prompt("What is your robot's name?");
    }
    console.log("Your robot's name is " + name);
    return name;
}

// player info object
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        };  
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -=7;
        } else {
            window.alert("You don't have enough money!");
        };   
    }
};

// enemy info array of objects, with random attack values between 10 and 14
var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14),
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14),
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14),
    }
];

//start game when the page loads
startGame();