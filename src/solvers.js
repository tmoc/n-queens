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

window.findNRooksSolution = function(n, startRow, startCol) {
  var board = new Board({n: n});
  var rows = board.rows();

  var pieces = 0;

  if (rows.length === 1) {
    board.togglePiece(0,0);
    console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board.rows()));
    return board.rows();
  }

  //loop through rows
  for (var i = 0; i < n; i++) {
    //loop through cells
    for (var j = 0; j < n; j++) {
      if (pieces === n) {
        console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board.rows()));
        return board.rows();
      }
      //push a piece into the spot
      board.togglePiece(i, j);
      //check if there are any conflicts
      if (board.hasRowConflictAt(i) || board.hasColConflictAt(j)) {
        //if yes, remove the piece from the spot
        board.togglePiece(i, j);
      } else {
        pieces++;
      }
    }
  }
  if (pieces === n) {
    console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board.rows()));
    return board.rows();
  } else {
    return null;
  }

};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var usedCols = {};
  var solutionCount = 0;

  var solutionFinder = function (row) {
    var row = row || 0;

    if (row === n) {
      solutionCount += 1;
    }
    for (var i = 0; i < n; i++) {
      if (!usedCols[i]){
        usedCols[i] = true;
        solutionFinder(row + 1); //call on next row
        usedCols[i] = false;
      }
    }
  };

  solutionFinder();

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  // var board = new Board({n: n});
  // var rows = board.rows();

  // var pieces = 0;

  // if (rows.length === 1) {
  //   board.togglePiece(0,0);
  //   console.log('Single solution for ' + n + ' queens:', JSON.stringify(board.rows()));
  //   return board.rows();
  // }

  // //loop through rows
  // for (var i = 0; i < n; i++) {
  //   //loop through cells
  //   if (i === 0) {
  //     var j = 1;
  //     if (n === 6) {j = 0};
  //   } else {
  //     var j = 0;
  //   }
  //   for (; j < n; j++) {
  //     if (pieces === n) {
  //       console.log('Single solution for ' + n + ' queens:', JSON.stringify(board.rows()));
  //       return board.rows();
  //     }
  //     //push a piece into the spot
  //     board.togglePiece(i, j);
  //     //check if there are any conflicts
  //     if ( board.hasAnyQueenConflictsOn(i, j) ) {
  //       //if yes, remove the piece from the spot
  //       //debugger;
  //       board.togglePiece(i, j);
  //     } else {
  //       pieces++;
  //     }
  //   }
  // }
  // if (pieces === n) {
  //   console.log('Single solution for ' + n + ' queens:', JSON.stringify(board.rows()));
  //   return board.rows();
  // } else {
  //   console.log('Single solution for ' + n + ' queens:', "There aren't any");
  //   return null;
  // }
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var usedCols = {};
  var usedMDs = {};
  var usedmDs = {};
  var solutionCount = 0;

  var solutionFinder = function (row) {
    row = row || 0;

    if (row === n){
      solutionCount += 1;
    }

    //iterate through each column
    for (var col = 0; col < n; col++){
      var indexMD = col - row;
      var indexmD = col + row;
      if (!usedCols[col] && !usedMDs[indexMD] && !usedmDs[indexmD]) {
        usedCols[col] = true;
        usedMDs[indexMD] = true;
        usedmDs[indexmD] = true;

        solutionFinder(row+1);

        usedCols[col] = false;
        usedMDs[indexMD] = false;
        usedmDs[indexmD] = false;
      }
    }
  };

  solutionFinder();

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
