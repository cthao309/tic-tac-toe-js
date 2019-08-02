var gameArray, turnToggle, turnCount, playerWon, hasWon;

var winCombos = [[0,1,2], [3,4,5], [6,7,8],[0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6] ];

var initGame = function(){
  addClickEvents();
  //Several variables are declared above. Initialize these variables with the following values:
  //1. gameArray should be an empty array.
  gameArray=[];
  //2. turnCount starts at zero.
  turnCount =0;
  //3. turnToggle this is a boolean, and does not start as true.
  turnToggle = false;
  //4. invoke the function called 'whoseTurn' (you will also need to implement this function later!)
  whoseTurn();
 // 5. playerWon is not defined at the beginning of the game.
  playerWon();
 
};

var playTurn = function(event){
  var square = document.getElementById(event.target.id);
  square.innerHTML = placeTurn();
  gameArray[event.target.id] = square.innerHTML;
  turnToggle = !turnToggle;
  turnCount++;

  removeClickEvents(square);

  hasWon = checkWins();
  if (turnCount === 9 || hasWon === true){
    declareResult(hasWon);
  }else{
    whoseTurn();  
  }
};

var placeTurn = function(){
  /* This function is a simple 'if' statement that returns a value of X or O depending on the state of the variable 'turnToggle'
  */
  if(!turnToggle )
  {
    return 'X';
  }
  else
  {
    return 'O';
  }
};

var whoseTurn = function(){
  /* This function writes text to the DOM that tells which player's turn it is. It writes this in the element with the id 'whoseTurn'. To implement, set the 'innerHTML' of the 'whoseTurn' element to the value of the current player. 
  * Hint - You should be able to get that value from another function that you have written.
  */
  var display = document.getElementById('whoseTurn');
  display.innerHTML = 'Player ' +placeTurn()+ "'s" + ' turn';
};

var addClickEvents = function(){
  for(var i = 0; i < 9; i++){
    var square = document.getElementById(i);
    square.innerHTML = '-';
    square.addEventListener('click', playTurn);
  }
};
var removeClickEvents = function(el){
  /* When you click a square on the tic-tac-toe board, you place an X or an O, and then you shouldn't be able to change it. 
  Implement this function to remove the click event when a square has been clicked.
  */
  el.removeEventListener('click', playTurn);

};


var checkWins = function(){
  /* This function is called in the 'playTurn' function. Implement this function so that it:
  1. Iterates over the 'winCombos' array.
  2. For each iteration, invoke the 'checkThisCombination' function with that iteration as it's argument.
  3. If 'checkThisCombination' returns true, return true, if not, return false.
  */
  for (var i = 0; i < winCombos.length; i++) {
    // console.log(winCombos[i][0], winCombos[i][1], winCombos[i][2]);
      console.log(winCombos[i][0]);

    var piece1 = gameArray[winCombos[i][0]];
    var piece2 = gameArray[winCombos[i][1]];
    var piece3 = gameArray[winCombos[i][2]];

    //console.log(piece1, piece2, piece3);

    if (piece1 === piece2 && piece1 === piece3 && piece1 !== undefined && piece2 !== undefined && piece3 !== undefined) {
      return true;
    }
  }

  return false;

};
var checkThisCombination = function(combo){
  var index = combo[0];
  var turn = gameArray[index];
  if(turn === undefined){
    return false;
  }
  var tempTurn;
  for(var i = 1; i < combo.length; i++){
    tempTurn = gameArray[combo[i]];
    if(tempTurn !== turn){
      return false;
    }
  } 
  playerWon = turn;
  return true;
};

var declareResult = function(hasWon){
  /* This function displays who, if anyone, has won the game.
  Implement this function withthe following steps:
  1. Invoke the 'removeClickEvents' function
  2. There is a variable that keeps track of which player won. Find that variable and use it to create a message declaring who has won the game.
  3. Display that message on screen, or with an alert box.
  4. What if the game is a draw? Figure out how you will know this, and update your code to say so.
  */
  console.log(gameArray);
  if(hasWon)
  {
    alert('Player ' + playerWon());
  }
  else
    alert('We have a tie.')

};

var playerWon = function(event){
  if (turnToggle)
  {
    return "X";
  } 
  else
  {
    return "O";
  }
};

var restart = document.getElementById('reset');
restart.addEventListener('click', function() {
  window.location.reload();
});