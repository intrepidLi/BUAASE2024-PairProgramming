// The entry file of your WebAssembly module.

export function mancalaBoard(
  flag: i32,
  seq: Array<i32>,
  size: i32
): Array<i32> {
  let board = new Array<i32>(15);
  for (let i = 0; i < 14; i++) {
    board[i] = 4;
  }
  board[6] = 0;
  board[13] = 0;
  let nextDirec = seq[0] / 10;
  for (let i = 0; i < size; i++) {
    let direct = seq[i] / 10;
    let hole = seq[i] % 10;
    hole = direct === 2 ? 7 - hole : hole;
    let piece = board[(direct - 1) * 7 + hole - 1];
    if(i === (size - 1) && (direct != nextDirec || piece === 0)){
      if(direct == 1){
        board[14] = 200 + 2 * board[6] - 48;
      }else{
        board[14] = 200 + 48 - 2 * board[13];
      }
      reverseSubarray(board, 7, 12);
      return board;
    }
    let nextFlag = false;
    board[(direct - 1) * 7 + hole - 1] = 0;
    while (piece > 0) {
      if (direct === 1) {
        for (let j = hole + 1; j <= 6 && piece > 0; j++) {
          board[j - 1]++;
          piece--;
          hole++;
        }
        if (piece === 0) {
          break;
        }
        hole = -1;
        board[6]++;
        piece--;
        if (piece === 0) {
          nextFlag = true; //shouldNext
          break;
        }
        for (let j = 6; j > 0 && piece > 0; j--) {
          board[6 + j]++;
          piece--;
        }
        if (piece === 0) {
          break;
        }
        hole = 0;
      } else if (direct === 2) {
        for (let j = hole - 1; j > 0 && piece > 0; j--) {
          board[6 + j]++;
          piece--;
          hole--;
        }
        if (piece === 0) {
          break;
        }
        hole = -1;
        board[13]++;
        piece--;
        if (piece === 0) {
          nextFlag = true; //shouldNext
          break;
        }
        for (let j = 1; j <= 6 && piece > 0; j++) {
          board[j - 1]++;
          piece--;
        }
        if (piece === 0) {
          break;
        }
        hole = 7;
      }
    }
    if (!nextFlag) {
      nextDirec = 3 - direct;
    } else {
      nextDirec = direct;
    }
    if (direct === 1) {
      if (hole > 0 && board[hole - 1] === 1 && board[6 + hole] != 0) {
        board[6] += board[hole - 1] + board[6 + hole];
        board[6 + hole] = 0;
        board[hole - 1] = 0;
      }
    } else if (direct === 2) {
      if (hole > 0 && board[6 + hole] === 1 && board[hole - 1] != 0) {
        board[13] += board[hole - 1] + board[6 + hole];
        board[6 + hole] = 0;
        board[hole - 1] = 0;
      }
    }
  }
  let res = isFinish(board);
  if (res == 0) {
    board[14] = nextDirec;
    reverseSubarray(board, 7, 12);
    return board;
  }
  if (res == 1) {
    for (let j = 7; j <= 12; j++) {
      board[13] += board[j];
      board[j] = 0;
    }
  } else {
    for (let j = 0; j <= 5; j++) {
      board[6] += board[j];
      board[j] = 0;
    }
  }
  board[14] = 200 + (board[6] - board[13]);
  reverseSubarray(board, 7, 12);
  return board;
}

export function isFinish(board:Array<i32>): i32 {
  let side1Empty = board.slice(0,6).every(hole => hole === 0);
  let side2Empty = board.slice(7,13).every(hole => hole === 0);
  if (side1Empty) return 1;
  if (side2Empty) return 2;
  return 0;
}


function reverseSubarray<T>(array: T[], start: i32, end: i32): void {
  if (start < 0) start = 0;
  if (end >= array.length) end = array.length - 1;
  while (start < end) {
    let temp: T = array[start];
    array[start] = array[end];
    array[end] = temp;
    start++;
    end--;
  }
}