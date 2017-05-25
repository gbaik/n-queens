// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // this.rows() gives us a matrix
      
      // return true for conflict exists
      // this.attributes is an object with 4 arrays of 4
      var finalCheck = [];
      
      finalCheck.push(this.attributes[rowIndex].reduce(function (sum, currentValue) {
      // input is an 'nth' element of board
        return sum + currentValue;
        //if one array is greater than 1 return true else return false      
      }) > 1 ? true : false);
      
      // go through final array and check if true
      return finalCheck.includes(true);
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var finalCheck = [];
      //iterate through each attribute
      for (var i = 0; i < this.attributes.n; i++) {
        finalCheck.push(this.attributes[i].reduce(function (sum, currentValue) {
          return sum + currentValue;
        //if one array is greater than 1 return true else return false
        }) > 1 ? true : false);
      }
 
      // go through final array and check if true
      return finalCheck.includes(true);
      
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var finalValue = 0;
      for (var i = 0; i < this.attributes.n; i++) {
        let currentValue = this.attributes[i][colIndex]; // first element of first array
        finalValue += currentValue;
      }
      return finalValue > 1 ? true : false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var finalCheck = [];
      for (var i = 0; i < this.attributes[0].length; i++) {
        let currentValue = this.attributes[0][i]; // first element of first array
        for (var j = 1; j < this.attributes.n; j++) { // start of next array
          currentValue = currentValue + this.attributes[j][i];
        }
        finalCheck.push(currentValue > 1);
      }
      return finalCheck.includes(true);
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var output = [];
      var coordinates = [];
      var matrix = this.rows(); // gives us the matrix
      
      if (majorDiagonalColumnIndexAtFirstRow < 0) {
        coordinates[0] = Math.abs(majorDiagonalColumnIndexAtFirstRow); 
        coordinates[1] = 0;
      } else if (majorDiagonalColumnIndexAtFirstRow > 0 ) {
        coordinates[0] = 0;
        coordinates[1] = majorDiagonalColumnIndexAtFirstRow;
      } else {
        coordinates[0] = 0;
        coordinates[1] = 0;
      }
      
      var iterations = matrix.length - Math.max(...coordinates); 
      var rowIndex = coordinates[0];
      var columnIndex = coordinates[1];
      // we have starting points
        // we have iterations to do based on starting points
      for (var i = 0; i < iterations; i++) {
        output.push(matrix[rowIndex][columnIndex]);
        rowIndex++;
        columnIndex++;
      }
      
      return output.reduce(function (sum, currentValue) {
        return sum + currentValue;
      }) > 1;
      
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var totalDiagonals = (this.attributes.n * 2) - 1;
      let n = this.attributes.n - 1; // = index 3 from length 4
      let row = n; // 3
      let column = 0;
      
      var coordinates = [];
      for (var i = 0; i < totalDiagonals; i++) {
        coordinates[i] = [row, column];
        row = column === n ? row - 1 : n;
        column = column === n ? n : column + 1;
      }
      
      var finalDiagArrays = [];
      var boardMatrix = this.attributes;
      coordinates.forEach(function (coordinate) {
        let coordinateRow = coordinate[0];
        let coordinateColumn = coordinate[1];
        var tempArray = [];
        // (we are in the coordinates array accessing each element or 'coordinate')
          // setting coordinateRow to the index 0 of 'coordinate'
          // setting coordinateColumn to index 1 of 'coordinate'

        for (var i = 0; i < (Math.min(coordinateRow, coordinateColumn) + 1); i++) {
          tempArray.push(boardMatrix[coordinateRow - i][coordinateColumn - i]);
        }
        finalDiagArrays.push(tempArray.reduce(function (sum, currentValue) {
          return sum + currentValue;
        }) > 1);
      });
      
      return finalDiagArrays.includes(true);
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var matrix = this.rows();
      var output = [];
      var coordinates = [];
      
      if (minorDiagonalColumnIndexAtFirstRow <= (matrix.length - 1)) {
        coordinates[0] = 0;
        coordinates[1] = minorDiagonalColumnIndexAtFirstRow;
      } else {
        coordinates[0] = minorDiagonalColumnIndexAtFirstRow - (matrix.length - 1);
        coordinates[1] = matrix.length - 1;
      }
      

      
      // var iterations = matrix.length - Math.max(...coordinates); 
      var rowIndex = coordinates[0];
      var columnIndex = coordinates[1];
      var iterations = minorDiagonalColumnIndexAtFirstRow <= matrix.length - 1 ? ((coordinates[0] + coordinates[1]) + 1) : matrix.length - minorDiagonalColumnIndexAtFirstRow;
      
      console.log(iterations);
      // var diagonal = matrix[coordinates[0]][coordinates[1]];

      for (var i = 0; i < iterations; i++) {
        output.push(matrix[rowIndex][columnIndex]);
        rowIndex++;
        columnIndex--;
      }
      
      console.log(output);

    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
