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

function boardToString(board){
  var myArr = board.slice();
  var size = Math.sqrt(myArr.length);
  var alphabet = ["A", "B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q",
  "R","S","T","U","V","W","X","Y","Z"];
  var newArr = [];
  var arr = '     ';
  for(var i = 0; i < size; i++){
    newArr[i] = alphabet[i] + '   ';
  }
  arr += newArr.join('');

  var straight = repeat('+---',size);
  straight = straight.join('');
  straight += '+';
  var newArray = [];
  for(var x = 0; x < myArr.length; x++){
    newArray[i] = '| ' + board[i] + ' ';
  }
  var y = 0;
  var o = size;
  var newBoard = arr + '\n';
  for(var i = 0; i < size; i++){
    board += '   ' + straight + '\n' + (i+1) + ' ';
    for(var j = 0; j < o; j++){
      board+= newArray[j];
  }
  board += '|\n';
  y += size;
  o += size;
}
newBoard += '    ' + straight

return newBoard;
}

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
  var index = rowColToIndex(myArr,lastRow,lastCol);
  var size = Math.sqrt(myArr);
  var sepNorth = [];
  var sepSouth = [];
  var sepLeft = [];
  var sepRight = [];
  var sepDDL = [];
  var sepDUL = [];
  var sepDDR = [];
  var sepDUR = [];
  var letter = myArr[index];
  //check north
  var placeN = index - size;
  var moveN = lastRow - 1;
  while(moveN > 0 && myArr[placeN] != " "){
    var northArr = [];
    northArr.push(moveN,lastCol);
    sepNorth.push(northArr);
    if(myArr[placeN] == letter){
      cells.push(sepNorth);
    }
    moveN -= 1;
    placeN -= size;
  }
  // check south
  var placeS = index + size;
  var moveS = lastRow + 1;
  while(moveS < size && myArr[placeS] != " "){
    var southArr = [];
    southArr.push(moveS,lastCol);
    sepSouth.push(southArr);
    if(myArr[placeS] == letter){
      cells.push(sepSouth);
    }
    moveS += 1;
    placeS += size;
  }
  //check left
  var placeL = index - 1;
  var lMove = lastCol - 1;
  while(lMove > 0 && myArr[placeL] != " "){
    var leftArr = [];
    leftArr.push(lastRow,lMove);
    sepLeft.push(leftArr);
    if(myArr[placeL] == letter){
      cells.push(sepLeft);
    }
    lMove -= 1;
    placeL -= 1;
  }
  //check right
  var placeR = index + 1;
  var rMove = lastCol + 1;
  while(rMove < size && myArr[placeR] != " "){
    var rightArr = [];
    rightArr.push(lastRow,rMove);
    sepRight.push(rightArr);
    if(myArr[placeR] == letter){
      cells.push(sepRight);
    }
    rMove += 1;
    placeR += 1;
  }
  //check diag up/right
  var rowUR = lastRow - 1;
  var colUR = lastCol + 1;
  var placeDUR = rowColToIndex(myArr,rowUR,colUR);
  while(rowUR > 0 && colUR < size && myArr[placeDUR] != " "){
    var dURArr = [];
    dURArr.push(rowUR, colUR);
    sepDUR.push(dURArr);
    if(myArr[placeDUR] == letter){
      cells.push(sepDUR);
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
  while(rowDR < size && colDR < size && myArr[placeDDR] != " "){
    var dDRArr = [];
    dDRArr.push(rowDR, colDR);
    sepDDR.push(dDRArr);
    if(myArr[placeDDR] == letter){
      cells.push(sepDDR);
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
  while(rowDL < size && colDL > 0 && myArr[placeDDL] != " "){
    var dDLArr = [];
    dDLArr.push(rowDL, colDl);
    sepDDL.push(dDLArr);
    if(myArr[placeDDL] == letter){
      cells.push(sepDDL);
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
  var letterDUL = myArr[index];
  while(rowUL > 0 && colUL > 0 && myArr[placeDUL] != " "){
    var dULArr = [];
    dULArr.push(rowUL, colUL);
    sepDUL.push(dULArr);
    if(myArr[placeDUL] == letter){
      cells.push(sepDUL);
    }
    rowUL -= 1;
    colUL -= 1;
    placeDDL -= 1;
    placeDDL -= size;
  }
  return cells;
}

function isValidMove(board, letter, row, col){
  var cells = [];
  var myArr = board.slice();
  var index = rowColToIndex(myArr,row,col);
  var size = Math.sqrt(myArr);
  var sepNorth = [];
  var sepSouth = [];
  var sepLeft = [];
  var sepRight = [];
  var sepDDL = [];
  var sepDUL = [];
  var sepDDR = [];
  var sepDUR = [];
  console.log(row,col);

  if(index > myArr.length || index < 0){
    return false;
  }

  //check north
  var northArr = [];
  var placeN = index - size;
  var moveN = row - 1;
  while(moveN > 0 && myArr[placeN] != " "){
    northArr.push(moveN,col);
    sepNorth.push(northArr);
    console.log(sepNorth);
    console.log(myArr[placeN]);
    moveN -= 1;
    placeN -= size;
    console.log(myArr[placeN]);
    if(myArr[placeN] == letter){
      cells.push(sepNorth);
    }
  }
  // check south
  var southArr = [];
  var placeS = index + size;
  var moveS = row + 1;
  while(moveS < size && myArr[placeS] != " "){
    southArr.push(moveS,col);
    sepSouth.push(southArr);
    moveS += 1;
    placeS += size;
    if(myArr[placeS] == letter){
      cells.push(sepSouth);
    }
  }
  //check left
  var leftArr = [];
  var placeL = index - 1;
  var lMove = col - 1;
  while(lMove > 0 && myArr[placeL] != " "){
    leftArr.push(row,lMove);
    sepLeft.push(leftArr);
    lMove -= 1;
    placeL -= 1;
    if(myArr[placeL] == letter){
      cells.push(sepLeft);
    }
  }
  //check right
  var rightArr = [];
  var placeR = index + 1;
  var rMove = col + 1;
  while(rMove < size && myArr[placeR] != " "){
    rightArr.push(row,rMove);
    sepRight.push(rightArr);
    rMove += 1;
    placeR += 1;
    if(myArr[placeR] == letter){
      cells.push(sepRight);
    }
  }
  //check diag up/right
  var dURArr = [];
  var rowUR = row - 1;
  var colUR = col + 1;
  var placeDUR = rowColToIndex(myArr,rowUR,colUR);
  while(rowUR > 0 && colUR < size && myArr[placeDUR] != " "){
    dURArr.push(rowUR, colUR);
    sepDUR.push(dURArr);
    rowUR -= 1;
    colUR += 1;
    placeDUR += 1;
    placeDUR -= size;
    if(myArr[placeDUR] == letter){
      cells.push(sepDUR);
    }
  }
  // check diag down/right
  var dDRArr = [];
  var rowDR = row + 1;
  var colDR = col + 1;
  var placeDDR = rowColToIndex(myArr,rowDR,colDR);
  while(rowDR < size && colDR < size && myArr[placeDDR] != " "){
    dDRArr.push(rowDR, colDR);
    sepDDR.push(dDRArr);
    rowDR += 1;
    colDR += 1;
    placeDDR += 1;
    placeDDR += size;
    if(myArr[placeDDR] == letter){
      cells.push(sepDDR);
    }
  }
  // check diag down/left
  var dDLArr = [];
  var rowDL = row + 1;
  var colDL = col - 1;
  var placeDDL = rowColToIndex(myArr,rowDL,colDL);
  while(rowDL < size && colDL > 0 && myArr[placeDDL] != " "){
    dDLArr.push(rowDL, colDl);
    sepDDL.push(dDLArr);
    rowDL += 1;
    colDL -= 1;
    placeDDL -= 1;
    placeDDL += size;
    if(myArr[placeDDL] == letter){
      cells.push(sepDDL);
    }
  }
  // check diag up/left
  var dULArr = [];
  var rowUL = row - 1;
  var colUL = col - 1;
  var placeDUL = rowColToIndex(myArr,rowUL,colUL);
  var letterDUL = myArr[index];
  while(rowUL > 0 && colUL > 0 && myArr[placeDUL] != " "){
    dULArr.push(rowUL, colUL);
    sepDUL.push(dULArr);
    rowUL -= 1;
    colUL -= 1;
    placeDDL -= 1;
    placeDDL -= size;
    if(myArr[placeDUL] == letter){
      cells.push(sepDUL);
    }
  }
  console.log(cells);
  if(cells.length == 0){
    return false;
  }
  // if(cells.indexOf("X") == -1){
  //   return false;
  // }
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
  if(index < 0){
    return false;
  }
  if(index > newBoard.length){
    return false;
  }
  else{
    return true;
  }
}

function getLetterCounts(board){
  var x = 0;
  var y = 0;
  var myArr = board.slice();
  for(var i = 0; i < myArr.length; i++){
    if(myArr[i] === "X"){
      x += 1;
    }
    if(myArr[i] === "O"){
      y += 1;
    }
  }
  const count = {"X": x, "O": y};
  return count;
}

function getValidMoves(board, letter){
  var twoDArr = [];
  var myArr = board.slice();
  var size = Math.sqrt(myArr);
  for(var i = 0; i < myArr.length; i++){
      var obj = indexToRowCol(i);
      var oneDArr = [];
      oneDArr.push(obj.row,obj.col);
      if(isValidMove(board,letter,obj.row,obj.col)){
        twoDArr.push(oneDArr);
      }
  }
  return twoDArr;
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
