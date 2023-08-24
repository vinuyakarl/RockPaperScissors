// To program a rock-paper-scissors game between player vs. computer

function getComputerChoice() {
    /*
        Purpose: To get random choice for computer
        Return:  Random choice between options
    */

    const array = ['rock','paper','scissors'];
    let random = Math.floor((Math.random() * 3));
    return array[random];
}

function getPlayerChoice() {
    /*
        Purpose: To get player's choice
        Returns: player's choice
    */

    return new Promise((resolve) => {
        let buttonRock = document.getElementById("rock");
        let buttonPaper = document.getElementById("paper");
        let buttonScissors = document.getElementById("scissors");

        buttonRock.addEventListener('click', () => {
            resolve("rock");
        });

        buttonPaper.addEventListener('click', () => {
            resolve("paper");
        });

        buttonScissors.addEventListener('click', () => {
            resolve("scissors");
        });
    });
}

function playRound(playerSelection, computerSelection) {
    /*
        Purpose: To play a round between player and computer and see who wins
        Parameters:
            playerSelection (string) = Selection of player
            computerSelection (string) = Selection of computer
        Return: winner of the game
    */

    playerSelection = playerSelection.toLowerCase();
    if (playerSelection == computerSelection) {
        return "None";
    }
    else if ((playerSelection == "rock" && computerSelection == "scissors") ||
        (playerSelection == "paper" && computerSelection == "rock") ||
        (playerSelection == "scissors" && computerSelection == "paper")) {
            return "Player";
        }
    else {
        return "Computer";
    }
}

function displayPicks(player, computer, winner) {
    /*
        Purpose: To display the player and computer's picks
    */

    let declarePicks = document.createElement('ul');
    switch (winner) {
        case "Player":
            declarePicks.innerHTML = `<span>Player = ${player}</span>, <span id="loser">Computer = ${computer}</span>`;
            break;
        
        case "Computer":
            declarePicks.innerHTML = `<span id="loser">Player = ${player}</span>, <span>Computer = ${computer}</span>`;
            break;
        
        default:
            declarePicks.innerHTML = `<span id="loser">Player = ${player}</span>, <span id="loser">Computer = ${computer}</span>`;
    }
    const picksList = document.querySelector('.display-picks');
    picksList.appendChild(declarePicks);
}

function displayWinner(winner) {
    /* 
        Purpose: To display the winner of the game
        Parameters: winner = winner of the game
    */
    
    let declareWinner = document.createElement('h1');
    declareWinner.innerText = `WINNER: ${winner}`;
    const choices = document.querySelector('.choices');
    choices.parentNode.insertBefore(declareWinner, choices);
}

function gameOver() {
    /*
        Purpose: To create a restart button and hide the game buttons
    */

    let choices = document.querySelector('.choices');
    let restartButton = document.createElement('button');
    restartButton.id = "restart";
    restartButton.textContent = "REMATCH";
    choices.parentNode.insertBefore(restartButton, choices);
    choices.setAttribute('id', 'hidden');

    restartButton.addEventListener('click', () => {
        location.reload();
    });
}

async function game() {
    /*
        Purpose: To program a first-to-5 rock-paper scissors game between comp and player
    */
   
    let playerScore = 0, computerScore = 0;
    let player = "scissors";
    while (playerScore < 5 && computerScore < 5) {

        // Waits until user chooses an image (button)
        player = await getPlayerChoice();
        computer = getComputerChoice();
        winner = playRound(player, computer);
        displayPicks(player, computer, winner);

        if (winner == "Player") {
            playerScore++;
        }
        else if (winner == "Computer") {
            computerScore++;
        }
        let displayScore = document.getElementById('display-score');
        displayScore.textContent = `${playerScore} : ${computerScore}`
    }

    // Declares the winner
    displayWinner(winner);
    gameOver();
}

game();