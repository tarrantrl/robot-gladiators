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
    // The game will display "Welcome to Robot Gladiators!"
    //Alert users that they're starting the round.
    window.alert("Welcome to Robot Gladiators!");

    // check if the player wants to fight or skip
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    console.log(promptFight);
    
    // convert promptFight to uppercase
    promptFight = promptFight.toUpperCase();

    console.log(promptFight);

    // Check if the user picked the word "FIGHT" or "fight".
    // If yes (or "true"), then we'll continue with the battle and our robots will fight.

    if (promptFight === "FIGHT" || promptFight === "fight") {
        // Subtract the value of playerAttack from the value of enemyHealth, and use that result to update the value in the enemyHealth variable.
        enemyHealth = enemyHealth - playerAttack;

        // Log a resulting message to the console to confirm that it worked.
        console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
        );

        // check enemy's health
        if (enemyHealth <= 0){
            window.alert(enemyName + " has died!");
        }
        else {
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
        }
        else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
    // If the user did not pick "FIGHT" or "fight", check if the user picked "SKIP" or "skip" instead.
    // If yes, penalize the player and end the fight function.
    } else if (promptFight === "SKIP" || promptFight === "skip") {
        // Ask the user to confirm that they want to quit.
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // If they answer "yes," subtract 2 from the playerMoney variable and create an alert that lets the user know they're leaving the game.
        if (confirmSkip) {
            window.alert(playerName + " has decided to skip this fight. Goodbye!");
            // subtract money from playerMoney for skipping
            playerMoney -= 2;
            console.log(playerMoney);
        
        // If they say "no," execute the fight function to start the fight over again. This will give them the choice to fight or skip, so they can choose "fight" and keep playing.
        // if no, ask question again by running fight() again 
        } else {
            fight();
        }
    // If the user did not pick any of the above words, then let the user know that they need to pick a valid option.
    } else {
        window.alert("You need to pick a valid option. Try again!");
    }   
};

// Iterate through the enemyNames array and call fight each time
for(var i = 0; i < enemyNames.length; i++){
    fight(enemyNames[i])
}

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