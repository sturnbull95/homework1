function repeat(value, n){
  const arr = [];
  for(var i = 0; i < n; i++){
    arr.push(value);
  }
  return arr;
}

function generateBoard(rows, columns, initialCellValue){
  var total = rows * columns;
  return repeat(initialCellValue, total);
}

function rowColToIndex(board, rowNumber, colNumber){
  var size = Math.sqrt(board.length);
  var index = 0;
  index += size * rowNumber;
  index += colNumber;
  return index;
}

function indexToRowCol(board, i){
  var size = Math.sqrt(board.length);
  var rowNum = Math.floor(i/size);
  var colNum = i % size;
  var indexObj = {"row": rowNum, "col": colNum};
  return indexObj;
}

function setBoardCell(board, letter, row, col){
  var index = rowColToIndex(board, row, col);
  board.splice(index,1,letter);
  board;
}

function algebraicToRowCol(algebraicNotation){
  var alphabet = ["A", "B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q",
  "R","S","T","U","V","W","X","Y","Z"];
  var numbers = ["1", "2","3","4","5","6", "7","8","9","10","11","12","13","14","15",
  "16","17","18","19","20","21","22","23","24","25","26"];
  if(algebraicNotation.length > 2 || algebraicNotation.length < 2){
    return undefined;
  }
  if(alphabet.indexOf(algebraicNotation.charAt(0)) == -1){
    return undefined;
  }
  if(numbers.indexOf(algebraicNotation.charAt(1)) == -1){
    return undefined;
  }

  var colNum = algebraicNotation.charAt(0);
  var colVal = alphabet.indexOf(colNum);
  var rowVal = algebraicNotation.charAt(1);
  var algebraicObj = {"row": (rowVal - 1), "col": colVal};
  return algebraicObj;
}

function placeLetter(board, letter, algebraicNotation){
  var rowPlace = algebraicToRowCol(algebraicNotation);
  var size = Math.sqrt(board.length);
  var index = 0;
  index += size*rowPlace.row;
  index += rowPlace.col;
  board.splice(index,index,letter);
}

function placeLetters(board, letter, algebraicNotation){

}

function boardToString(board){

}

function isBoardFull(board){
  if(board != undefined){
    if(board.indexOf(" ") == -1){
      return true;
    }
    else{
      return false;
    }
  }
  
}

function flip(board, row, col){
  var index = 0;
  var size = Math.sqrt(board.length);
  index += size * row;
  index += col;
  if(board.charAt(index) === " "){
    break;
  }
  if(board.charAt(index) === "X"){
    board.splice(index, 1, 'O');
  }
  if(board.charAt(index) === "O"){
    board.splice(index, 1, 'X');
  }
}

function flipCells(board, cellsToFlip){

}

function getCellsToFlip(board, lastRow, lastCol){

}

function isValidMove(board, letter, row, col){
  var count = 0;
  var index = 0;
  var size = Math.sqrt(board.length);
  index += size * row;
  index += col;

    if (board.charAt(index) !== EMPTY)
      return count;

    for (var dx = -1; dx <= 1; dx++) {
      for (var dy = -1; dy <= 1; dy++) {
        if (dx === 0 && dy === 0)
          continue;
        for (var i = 1; i < N; i++) {
          var nx = x + i * dx;
          var ny = y + i * dy;
          if (nx < 0 || N <= nx || ny < 0 || N <= ny)
            break;
          var cell = board[ix(nx, ny)];
          if (cell === player && 2 <= i) {
            for (var j = 1; j < i; j++)
              vulnerableCells.push(ix(x + j * dx, y + j * dy));
            break;
          }
          if (cell !== opponent)
            break;
        }
      }
    }

    return vulnerableCells;
  }



function isValidMoveAlgebraicNotation(board, letter,algebraicNotation){

}

function getLetterCounts(board){
  var x = 0;
  var y = 0;
  for(var i = 0; i < board.length; i++){
    if(board.charAt(i) === "X"){
      x += 1;
    }
    if(board.charAt(i) === "O"){
      y += 1;
    }
  }
  const count = {"row": x, "col": y};
  return count;
}

function getValidMoves(board, letter){

}

module.exports = {
    repeat: repeat,
    generateBoard: generateBoard,
    rowColToIndex: rowColToIndex,
    indexToRowCol: indexToRowCol,
    setBoardCell: setBoardCell,
    algebraicToRowCol: algebraicToRowCol,
    placeLetter: placeLetter,
    placeLetters: placeLetters,
    boardToString: boardToString,
    isBoardFull: isBoardFull,
    flip: flip,
    flipCells: flipCells,
    getCellsToFlip: getCellsToFlip,
    isValidMove: isValidMove,
    isValidMoveAlgebraicNotation: isValidMoveAlgebraicNotation,
    getLetterCounts: getLetterCounts,
    getValidMoves: getValidMoves
}
