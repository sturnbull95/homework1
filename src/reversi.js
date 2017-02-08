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
  var newBoard = board.slice();
  newBoard[index] = letter;
  return newBoard;
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
  var newArr = board.slice();
  index += size*rowPlace.row;
  index += rowPlace.col;
  newArr[index] = letter;
  return newArr;
}

function placeLetters(board, letter, algebraicNotation){
  var myArr = board.slice();
  var size = Math.sqrt(board.length);
  for(var i = 2; i < arguments.length; i++){
    var index = 0;
    var rowPlace = algebraicToRowCol(arguments[i]);
    index += size*rowPlace.row;
    index += rowPlace.col;
    myArr[index] = letter;
  }
  return myArr;
}

// function boardToString(board){
//
// }
//
function isBoardFull(board){

    if(board.indexOf(" ") == -1){
      return true;
    }
    else{
      return false;
    }
  }

function flip(board, row, col){
  var thisArr = board.slice();
  var index = rowColToIndex(thisArr,row,col);
  if(thisArr[index] == " "){
    return thisArr;
  }
  if(thisArr[index] === "X"){
    thisArr[index] = "O";
  }
  else{
    thisArr[index] = "X";
  }
  return thisArr;
}

function flipCells(board, cellsToFlip){
  var myArr = board.slice();
  for(var i = 0; i < cellsToFlip.length;i++){
    for(var x = 0; x < cellsToFlip[i].length; x++){
      var index = rowColToIndex(myArr,cellsToFlip[i][x][0],cellsToFlip[i][x][1]);
      if(myArr[index] == " "){
        return thisArr;
      }
      if(myArr[index] === "X"){
        myArr[index] = "O";
      }
      else{
        myArr[index] = "X";
      }
    }
  }
  return myArr;
}

function getCellsToFlip(board, lastRow, lastCol){
  var cells = [][];
  var myArr = board.slice();
  var index = rowColToIndex(board,lastRow,lastCol);
  var size = Math.sqrt(myArr);
  var letter = myArr[index];
  //check north
  var placeN = index - size;
  while(placeN > 0 && myArr[placeN] != letter && myArr[placeN] != " "){
    var northArr = [];
    northArr.push(placeN-size,lastCol);
    cells.push(northArr);
    placeN -= size;
  }
  // check south
  var placeS = index + size ;
  while(placeS < myArr.length && myArr[placeS] != letter && myArr[placeS] != " "){
    var southArr = [];
    southArr.push(placeS+size,lastCol);
    cells.push(southArr);
    placeS += size;
  }
  //check left
  var placeL = index - 1;
  var indexOff = index - lastCol;
  while(placeL > indexOff && myArr[placeL] != letter && myArr[placeL] != " "){
    var leftArr = [];
    leftArr.push(lastRow,placeL - 1);
    cells.push(leftArr);
    placeL -= 1;
  }
  //check right
  var placeR = index + 1;
  var rightOff = size - lastCol;
  var indexOff = index + rightOff;
  while(placeR < indexOff && myArr[placeR] != letter && myArr[placeR] != " "){
    var rightArr = [];
    rightArr.push(lastRow,placeR - 1);
    cells.push(rightArr);
    placeR += 1;
  }
  //check diag up/right
  var placeDUR = index - size + 1;
  while(placeDUR > 0 && myArr[placeDUR] != letter && myArr[placeDUR] != " "){
    var dURArr = [];
    dURArr.push(lastRow - size, lastCol + 1);
    cells.push(dURArr);
    placeDUR += 1;
    placeDUR -= size;
  }
  // check diag down/right
  var placeDDR = index + size + 1;
  while(placeDDR < myArr.length && myArr[placeDDR] != letter && myArr[placeDDR] != " "){
    var dDRArr = [];
    dDRArr.push(lastRow + size, lastCol + 1);
    cells.push(dDRArr);
    placeDDR += 1;
    placeDDR += size;
  }
  // check diag down/left
  var placeDDL = index + size - 1;
  while(placeDDL < myArr.length && myArr[placeDDL] != letter && myArr[placeDDL] != " "){
    var dDLArr = [];
    dDLArr.push(lastRow + size, lastCol - 1);
    cells.push(dDLArr);
    placeDDL -= 1;
    placeDDL += size;
  }
  // check diag up/left
  var placeDUL = index - size - 1;
  while(placeDUL > 0 && myArr[placeDUL] != letter && myArr[placeDUL] != " "){
    var dULArr = [];
    dULArr.push(lastRow - size, lastCol - 1);
    cells.push(dULArr);
    placeDDL -= 1;
    placeDDL -= size;
  }
  return cells;
}

// function isValidMove(board, letter, row, col){
//   var count = 0;
//   var index = 0;
//   var size = Math.sqrt(board.length);
//   index += size * row;
//   index += col;
//
//     if (board.charAt(index) !== EMPTY)
//       return count;
//
//     for (var dx = -1; dx <= 1; dx++) {
//       for (var dy = -1; dy <= 1; dy++) {
//         if (dx === 0 && dy === 0)
//           continue;
//         for (var i = 1; i < N; i++) {
//           var nx = x + i * dx;
//           var ny = y + i * dy;
//           if (nx < 0 || N <= nx || ny < 0 || N <= ny)
//             break;
//           var cell = board[ix(nx, ny)];
//           if (cell === player && 2 <= i) {
//             for (var j = 1; j < i; j++)
//               vulnerableCells.push(ix(x + j * dx, y + j * dy));
//             break;
//           }
//           if (cell !== opponent)
//             break;
//         }
//       }
//     }
//
//     return vulnerableCells;
//   }
//
//
//
// function isValidMoveAlgebraicNotation(board, letter,algebraicNotation){
//
// }
//
// function getLetterCounts(board){
//   var x = 0;
//   var y = 0;
//   for(var i = 0; i < board.length; i++){
//     if(board.charAt(i) === "X"){
//       x += 1;
//     }
//     if(board.charAt(i) === "O"){
//       y += 1;
//     }
//   }
//   const count = {"row": x, "col": y};
//   return count;
// }
//
// function getValidMoves(board, letter){
//
// }

module.exports = {
    repeat: repeat,
    generateBoard: generateBoard,
    rowColToIndex: rowColToIndex,
    indexToRowCol: indexToRowCol,
    setBoardCell: setBoardCell,
    algebraicToRowCol: algebraicToRowCol,
    placeLetter: placeLetter,
    placeLetters: placeLetters,
    // boardToString: boardToString,
    isBoardFull: isBoardFull,
    flip: flip,
    flipCells: flipCells,
    // getCellsToFlip: getCellsToFlip,
    // isValidMove: isValidMove,
    // isValidMoveAlgebraicNotation: isValidMoveAlgebraicNotation,
    // getLetterCounts: getLetterCounts,
    // getValidMoves: getValidMoves
}
