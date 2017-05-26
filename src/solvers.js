/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  // var solution = 1;
  //create a new board
  var board = new Board({n: n});
  var solution = 0;
  
  // //iterating through the row
  for (var i = 0; i < n; i++) {
    //iterating through the column
    for (var j = 0; j < n; j++) {
      //toggle the piece to the right 
      board.togglePiece(i, j);
      //check if there are any conflicts
      solution++;
      if (board.hasAnyRooksConflicts()) {
        //if there is a conflict, toggle off
        board.togglePiece(i, j);
        solution--;
      } 
    }
  }
  
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  //return an array
  return board.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = this.findNRooksSolution(n);
    
  var factorial = function(number) {
    if (number < 0) {
      return null;
    } else if (number === 0) {
      return 1;
    } else {
      return number * factorial(number - 1);
    }
  };
  
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return factorial(n);
  // factorial is clever but doesn't traverse any data structures!!
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  // var board = new Board({n: n});
  // var solution = 0;
  
  // var getColumnLocation = function (resolve)
  //   //iterating through the column
  //   for (var i = 0; i < n; i++) {
  //     //toggle the piece to the right 
  //     board.togglePiece(i, j);
  //     //check if there are any conflicts
  //     solution++;
  //     if (board.hasAnyQueenConflicts()) {
  //       //if there is a conflict, toggle off
  //       board.togglePiece(i, j);
  //       solution--;
  //     } 
  //   }
  // }
  // // return function(){l^2||1*S\\d^&12, ddk93};
  // // return this.rows();
  
  // console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  // console.log(board);
  // return board;
  
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {

};
