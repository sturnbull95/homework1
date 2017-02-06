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
  return board.splice(index,0,letter);
}

function algebraicToRowCol(algebraicNotation){
  var alphabet = ["A", "B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q",
  "R","S","T","U","V","W","X","Y","Z"];
  if(algebraicNotation.length > 2 || algebraicNotation.length < 2){
    return undefined;
  }
  if(!algebraicNotation.charAt(0).match(/[A-Z]/i)){
    return undefined;
  }
  if(!algebraicNotation.charAt(1).match(/[1-26]/i)){
    return undefined;
  }
  var colNum = algebraicNotation.charAt(0);
  var colVal = alphabet.indexOf("colNum");
  var rowVal = algebraicNotation.charAt(1);
  var algebraicObj = {"row": (rowVal - 1), "col": colVal};
  return algebraicObj;
}

function placeLetter(board, letter, algebraicNotation){

}

function placeLetters(board, letter, algebraicNotation){

}

function boardToString(board){

}

function isBoardFull(board){

}

function flip(board, row, col){

}

function flipCells(board, cellsToFlip){

}

function getCellsToFlip(board, lastRow, lastCol){

}

function isValidMove(board, letter, row, col){

}

function isValidMoveAlgebraicNotation(board, letter,algebraicNotation){

}

function getLetterCounts(board){

}

function getValidMoves(board, letter){

}

module.exports = {
    repeat: repeat,
    generateBoard: generateBoard,
    rowColToIndex: rowColToIndex,
    indexToRowCol: indexToRowCol,
    setBoardCell: setBoardCell,
    algebraicToRowCol: algebraicToRowCol
    // placeLetter: placeLetter,
    // placeLetters: placeLetters,
    // boardToString: boardToString,
    // isBoardFull: isBoardFull,
    // flip: flip,
    // flipCells: flipCells,
    // getCellsToFlip: getCellsToFlip,
    // isValidMove: isValidMove,
    // isValidMoveAlgebraicNotation: isValidMoveAlgebraicNotation,
    // getLetterCounts: getLetterCounts,
    // getValidMoves: getValidMoves
}
