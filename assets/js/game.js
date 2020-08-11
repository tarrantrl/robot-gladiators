// Use camel case for variables, JS can't do hyphens

// The game will prompt the user to name their robot.
var playerName = window.prompt("What is your robot's name?");

// The player's robot will be initialized with the following properties:
    // 100 health points
    // 10 attack points
    // 10 money points
var playerHealth = 100;
var playerAttack = 10;
console.log(playerName, playerAttack, playerHealth);


// The player's opponent, Roborto, will be initialized with the following properties:
    // 50 health points
    // 12 attack points
var enemyName = "Roborto";
var enemyHealth = 50;
var enemyAttack = 12;
console.log(enemyName, enemyAttack, enemyHealth);

// create a function called "fight"
var fight = function() {
    // The game will display "Welcome to Robot Gladiators!"
    //Alert users that they're starting the round.
    window.alert("Welcome to Robot Gladiators!");

    // Subtract the value of playerAttack from the value of enemyHealth, and use that result to update the value in the enemyHealth variable.
    enemyHealth = enemyHealth - playerAttack;

    // Log a resulting message to the console to confirm that it worked.
    console.log(
        playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
    );

    // Subtract the value of enemyAttack from the value of playerHealth, and use that result to update the value in the playerHealth variable.
    playerHealth = playerHealth - enemyAttack;

    // Log a resulting message to the console to confirm that it worked.
    console.log(
        enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
      );
};

fight();









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