// Use camel case for variables, JS can't do hyphens

// create a function called "fight"
var fight = function(enemy) {
    // repeat and execute as long as the enemy robot is alive and the player is alive
    while(enemy.health > 0 && playerInfo.health > 0) {
        // check if the player wants to fight or skip
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        
        // convert promptFight to uppercase
        promptFight = promptFight.toUpperCase();

        // If player picks "skip," confirm and then stop loop
        if (promptFight === "SKIP" || promptFight === "skip") {
            // confirm that they want to quit.
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            // if yes, subtract money and leave fight
            if (confirmSkip) {
                window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
                // subtract money from playerInfo.money for skipping
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                console.log("player money", playerInfo.money);
                break;
            }
            // If they say "no," execute the fight function to start the fight over again. This will give them the choice to fight or skip, so they can choose "fight" and keep playing.
            // if no, ask question again by running fight() again 
        
        }
        // if the player does not specifically request skip, then default to fight
        // Subtract the value of playerInfo.attack from the value of enemy.health, and use that result to update the value in the enemy.health variable.
        //use Math.max to not let the enemy health go below 0
        //generate random damage based on player's attack power
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
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

        // Subtract the value of enemy.attack from the value of playerInfo.health, and use that result to update the value in the playerInfo.health variable.
        var playerDamage = randomNumber(enemy.attack - 3, enemy.attack);
        //console.log(playerDamage);
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
        
        // If the user did not pick any of the above words, then let the user know that they need to pick a valid option.
        // } else {
        //     window.alert("You need to pick a valid option. Try again!");
        // }
    }   
};

// function to start a new game
var startGame = function(){
    //reset player stats
    playerInfo.reset();
    // Iterate through the enemyInfo array and call fight each time
    for(var i = 0; i < enemyInfo.length; i++){
        if (playerInfo.health > 0){
            //Alert users that they're starting the round.
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
            //debugger;
            // pick an enemy based on the index of enemyInfo
            var pickedEnemyObj = enemyInfo[i];
            // generate a random number between 40 and 60 for enemy.health
            pickedEnemyObj.health = randomNumber(40, 60);
            //enemy.attack = randomNumber(10, 14);
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
        } else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }
    //play again
    endGame();
}

var endGame = function() {
    //if player is alive, they win
    if (playerInfo.health > 0){
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
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

var shop = function() {
    //console.log("entered shop");
    // ask player what they'd like to do
    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.");
    shopOptionPrompt = shopOptionPrompt.toLowerCase();
    // use switch to decide what to do with the shop prompt
    switch (shopOptionPrompt){
        case "refill": // this is what you do instead of || since there is no other declaration, this will fall through to the next case until there is a break
        case "REFILL":
            playerInfo.refillHealth();
            break;
        case "upgrade":
            playerInfo.upgradeAttack();
            break;
        case "leave":
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

//replace player info with an object
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

//replace enemy info with an array of objects
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

//add randomnes
//enemy health between 40 and 60
//enemy attack between 10 and 14
//each enemy attack random with attack value as upper limit

//wrap game logic in startGame() function
//at end of game, call endGame() function which displays score and asks to play again, if yes call startGame()
//at the end of the game after for loop
//window alert player's score
//window confirm if they want to play again
//if true, call the fight function again

//after player defeats or skips robot
//window confirm if they want to visit the shop
//if no, continue as normal
//if yes, call shop() func. 
//window prompt. Options to refill, upgrade, or leave
//if refill, subtract money and increase health
//if upgrade, subtract money and increase attack
//if leave, exit function
//if invalid info, call shop()

// Game States
// WIN - player robot has defeated all enemy robots
//  *Fight all enemy robots
//  * Defeat each enemy robot
// LOSE - player robot's health is zero or less

// The game will prompt the user to either fight the round or skip it.

// If the player chooses to skip:
    // A penalty of 10 money points will be deducted from the player's robot.
    // The game will end.

// If the player chooses to fight:
    // The player's robot will attack Roborto, and the player robot's attack points will be deducted from Roborto's health points.
    // The game will display Roborto's remaining health points.
    // Roborto will attack the player's robot, and Roberto's attack points will be deducted from the player's robot's health points.
    // The game will display the player robot's remaining health points.

// The game will end.