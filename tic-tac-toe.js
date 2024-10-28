document.addEventListener("DOMContentLoaded", function(){
    const squares = document.querySelectorAll("#board div"); //Gets all the div within the parent with id of board
    let currentPlayer = "X"; //Starts the game with player X
    const state = Array(9).fill(null); //Initializes the game astate
    const statusUpdate = document.getElementById("status"); //Gets the status div
    const newGameBtn = document.getElementsByClassName("btn")[0]; //Gets the first occurence of the btn class

    //Array of different posibilities in which a player can win
    const winPossibilities = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    //Add square class to each div and set up click and hover events
    squares.forEach(function(square, index){
        square.classList.add("square");

        //Add click event listener for each square
        square.addEventListener("click", function(){
            //Check if the square is already taken
            if (!state[index]){
                //Update the game state
                state[index] = currentPlayer;

                square.innerHTML = currentPlayer;

                //Add the class for styling the letter in each square
                square.classList.add(currentPlayer);

                //Check for a winner
                if (checkWinner(currentPlayer)){
                    statusUpdate.innerHTML = `Congratulations! ${currentPlayer} is the Winner!`;
                    statusUpdate.classList.add("you-won");

                    //Remove further clicks after a player has won
                    squares.forEach(s => s.style.pointerEvents = 'none');
                }else{
                    //Alternate between pplayers depending on the  last play
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                    //Display the player's turn in the status
                    statusUpdate.innerHTML = `Player ${currentPlayer}'s turn`;

                }   
            }
        });
        //Adds styling when the pointer hovers a square
        square.addEventListener("mouseover", function(){
            if (!state[index]){
                square.classList.add("hover");
            }
        });
        //Remmoves styling when the pointer leaves a square
        square.addEventListener("mouseout", function(){
            square.classList.remove("hover");
        });
    });

    //Function to check for a winner
    function checkWinner(player) {
        for (let combination of winPossibilities) {
            let playerWon = true;
            
            //Checks if state matches the winning combinations
            for (let index of combination) {
                if (state[index] !== player) {
                    playerWon = false;
                    break;
                }
            }
            
            if (playerWon) {
                return true; //Player has won
            }
        }
        return false; //No winning combinations found
    }
   
    //Function to reset the game
    function resetGame() {
        //Reset game state
        state.fill(null);
        currentPlayer = "X"; // Reset to player X
        statusUpdate.innerHTML = "Move your mouse over a square and click to play an X or an O."; // Reset status message
        statusUpdate.classList.remove("you-won");//Removes the styling on the winnwr's status message
        
        //Clear all squares
        squares.forEach(square => {
            square.innerHTML = "";
            square.classList.remove("X", "O", "hover"); //Remove any classes
            square.style.pointerEvents = 'auto'; //Re-enable clicks
        });
    }

    //Add click event listener for the New Game button
    newGameBtn.addEventListener("click", resetGame);
});

