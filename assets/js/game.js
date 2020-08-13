// Use camel case for variables, JS can't do hyphens

// The game will prompt the user to name their robot.
var playerName = window.prompt("What is your robot's name?");

// The player's robot will be initialized with the following properties:
    // 100 health points
    // 10 attack points
    // 10 money points
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;
// console.log(playerName, playerAttack, playerHealth, playerMoney);


// Create string of enemy robot names 
var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
    
    // 50 health points
    // 12 attack points
var enemyHealth = 50;
var enemyAttack = 12;

// create a function called "fight"
var fight = function(enemyName) {
    // repeat and execute as long as the enemy robot is alive and the player is alive
    while(enemyHealth > 0 && playerHealth > 0) {
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
                window.alert(playerName + " has decided to skip this fight. Goodbye!");
                // subtract money from playerMoney for skipping
                playerMoney -= 10;
                console.log("playerMoney", playerMoney);
                break;
            }
            // If they say "no," execute the fight function to start the fight over again. This will give them the choice to fight or skip, so they can choose "fight" and keep playing.
            // if no, ask question again by running fight() again 
        
        }
        // if the player does not specifically request skip, then default to fight
        // Subtract the value of playerAttack from the value of enemyHealth, and use that result to update the value in the enemyHealth variable.
        enemyHealth = enemyHealth - playerAttack;

        // Log a resulting message to the console to confirm that it worked.
        console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
        );

        // check enemy's health
        if (enemyHealth <= 0){
            window.alert(enemyName + " has died!");
            //award player money for winning
            playerMoney += 20;
            //leave while loop since enemy is dead
            break;
        }else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }

        // Subtract the value of enemyAttack from the value of playerHealth, and use that result to update the value in the playerHealth variable.
        playerHealth = playerHealth - enemyAttack;

        // Log a resulting message to the console to confirm that it worked.
        console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
        );

        // check player's health
        if (playerHealth <= 0){
            window.alert(playerName + " has died!");
            //if player died, leave while loop    
            break;
        } else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
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
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;
    // Iterate through the enemyNames array and call fight each time
    for(var i = 0; i < enemyNames.length; i++){
        if (playerHealth > 0){
            //Alert users that they're starting the round.
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
            // pick an enemy based on the index of enemyNames
            var pickedEnemyName = enemyNames[i];
            // reset enemyHealth before starting new fight
            enemyHealth = 50;
            // debugger;
            // pass pickedEnemyName to fight function
            fight(pickedEnemyName);
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
    if (playerHealth > 0){
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
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

//start game when the page loads
startGame();

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