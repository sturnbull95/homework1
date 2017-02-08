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
  var cells = [];
  var myArr = board.slice();
  var index = rowColToIndex(board,lastRow,lastCol);
  var size = Math.sqrt(myArr);
  var sepNorth = [];
  var sepSouth = [];
  var sepLeft = [];
  var sepRight = [];
  var sepDDL = [];
  var sepDUL = [];
  var sepDDR = [];
  var sepDUR = [];
  //check north
  var placeN = index - size;
  var letterN = myArr[placeN];
  var moveN = lastRow - 1;
  while(moveN > 0 && myArr[placeN] != " "){
    var northArr = [];
    northArr.push(moveN,lastCol);
    sepNorth.push(northArr);
    if(myArr[placeN] == letterN){
      cells.push(sepNorth);
      break;
    }
    moveN -= 1;
    placeN -= size;
  }
  // check south
  var placeS = index + size ;
  var letterS = myArr[placeS];
  var moveS = lastRow + 1;
  while(moveS < size && myArr[placeS] != " "){
    var southArr = [];
    southArr.push(moveS,lastCol);
    sepSouth.push(southArr);
    if(myArr[placeS] == letterS){
      cells.push(sepSouth);
      break;
    }
    moveS += 1;
    placeS += size;
  }
  //check left
  var placeL = index - 1;
  var letterL = myArr[placeL];
  var lMove = lastCol - 1;
  while(lMove > 0 && myArr[placeL] != " "){
    var leftArr = [];
    leftArr.push(lastRow,lMove);
    sepLeft.push(leftArr);
    if(myArr[placeL] == letterL){
      cells.push(sepLeft);
      break;
    }
    lMove -= 1;
    placeL -= 1;
  }
  //check right
  var placeR = index + 1;
  var letterR = myArr[placeR];
  var rMove = lastCol + 1;
  while(rMove < size && myArr[placeR] != " "){
    var rightArr = [];
    rightArr.push(lastRow,rMove);
    sepRight.push(rightArr);
    if(myArr[placeR] == letterR){
      cells.push(sepRight);
      break;
    }
    rMove += 1;
    placeR += 1;
  }
  //check diag up/right
  var rowUR = lastRow - 1;
  var colUR = lastCol + 1;
  var placeDUR = rowColToIndex(myArr,rowUR,colUR);
  var letterDUR = myArr[placeDUR];
  while(rowUR > 0 && colUR < size && myArr[placeDUR] != " "){
    var dURArr = [];
    dURArr.push(rowUR, colUR);
    sepDUR.push(dURArr);
    if(myArr[placeDUR] == letterDUR){
      cells.push(sepDUR);
      break;
    }
    rowUR -= 1;
    colUR += 1;
    placeDUR += 1;
    placeDUR -= size;
  }
  // check diag down/right
  var rowDR = lastRow + 1;
  var colDR = lastCol + 1;
  var placeDDR = rowColToIndex(myArr,rowDR,colDR);
  var letterDDR = myArr[placeDDR];
  while(rowDR < size && colDR < size && myArr[placeDDR] != " "){
    var dDRArr = [];
    dDRArr.push(rowDR, colDR);
    sepDDR.push(dDRArr);
    if(myArr[placeDDR] == letterDDR){
      cells.push(sepDDR);
      break;
    }
    rowDR += 1;
    colDR += 1;
    placeDDR += 1;
    placeDDR += size;
  }
  // check diag down/left
  var rowDL = lastRow + 1;
  var colDL = lastCol - 1;
  var placeDDL = rowColToIndex(myArr,rowDL,colDL);
  var letterDDL = myArr[placeDDL];
  while(rowDL < size && colDL > 0 && myArr[placeDDL] != letter && myArr[placeDDL] != " "){
    var dDLArr = [];
    dDLArr.push(rowDL, colDl);
    sepDDL.push(dDLArr);
    if(myArr[placeDDL] == letterDDL){
      cells.push(sepDDL);
      break;
    }
    rowDL += 1;
    colDL -= 1;
    placeDDL -= 1;
    placeDDL += size;
  }
  // check diag up/left
  var rowUL = lastRow - 1;
  var colUL = lastCol - 1;
  var placeDUL = rowColToIndex(myArr,rowUL,colUL);
  var letterDUL = myArr[placeDUL];
  while(rowUL > 0 && colUL > 0 && myArr[placeDUL] != letter && myArr[placeDUL] != " "){
    var dULArr = [];
    dULArr.push(rowUL, colUL);
    sepDUL.push(dULArr);
    if(myArr[placeDUL] == letterDUL){
      cells.push(sepDUL);
      break;
    }
    rowUL -= 1;
    colUL -= 1;
    placeDDL -= 1;
    placeDDL -= size;
  }
  return cells;
}

function isValidMove(board, letter, row, col){
  var newBoard = board.slice();
  var myArr = getCellsToFlip(newBoard,row,col);
  var index = rowColToIndex(board, row, col);
  if(index > newBoard.length || index < 0){
    return false;
  }
  if(myArr.length == 0){
    return false;
  }
  else{
    return true;
  }
  }



function isValidMoveAlgebraicNotation(board, letter,algebraicNotation){
  var obj = algebraicToRowCol(algebraicNotation);
  var newBoard = board.slice();
  var myArr = getCellsToFlip(newBoard, obj.row,obj.col);
  var index = rowColToIndex(newBoard, obj.row, obj.col);
  if(newBoard[index] != " "){
    return false;
  }
  if(myArr.length == 0){
    return false;
  }
  else{
    return true;
  }
}

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
    getCellsToFlip: getCellsToFlip,
    isValidMove: isValidMove,
    isValidMoveAlgebraicNotation: isValidMoveAlgebraicNotation
    // getLetterCounts: getLetterCounts,
    // getValidMoves: getValidMoves
}
