// reversi.js
const rev = {
  repeat:function(value, n){
    console.log("hello");
  const arr = [];
  for(var i = 0; i < n; i++){
    arr.push(value);
  }
  return arr;
},

generateBoard:function (rows, columns, initialCellValue){
  var total = rows * columns;
  return repeat(initialCellValue, total);
},

rowColToIndex: function (board, rowNumber, colNumber){
  var size = Math.sqrt(board.length);
  var index = 0;
  index += size * rowNumber;
  index += colNumber;
  return index;
},

indexToRowCol: function (board, i){
  var size = Math.sqrt(board.length);
  var rowNum = Math.floor(i/size);
  var colNum = i % size;
  var indexObj = {"row": rowNum, "col": colNum};
  return indexObj;
},

setBoardCell: function (board, letter, row, col){
  var index = rowColToIndex(board, row, col);
  return board.splice(index,0,letter);
},

algebraicToRowCol: function(algebraicNotation){
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
},

placeLetter:function (board, letter, algebraicNotation){

},

placeLetters: function (board, letter, algebraicNotation){

},

boardToString: function (board){

},

isBoardFull: function (board){

},

flip:function (board, row, col){

},

flipCells: function (board, cellsToFlip){

},

getCellsToFlip: function (board, lastRow, lastCol){

},

isValidMove: function (board, letter, row, col){

},

isValidMoveAlgebraicNotation: function (board, letter,algebraicNotation){

},

getLetterCounts: function(board){

},

getValidMoves: function (board, letter){

},
}
module.exports = rev;
