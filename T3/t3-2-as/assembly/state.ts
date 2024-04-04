export class State {
  private turn: i32;
  private board: StaticArray<i32> = new StaticArray<i32>(14);
  constructor(curPlayer: i32, array?: Array<i32>) {
    this.turn = curPlayer;
    this.board = new StaticArray<i32>(14);
    if (array && array.length == 14) {
      for (let i: i32 = 0; i < 14; i++) {
        this.board[i] = array[i];
      }
    } else if (array && array.length != 14) {
      throw new Error("Array must have exactly 14 elements.");
    } else {
      for (let i: i32 = 0; i < 14; i++) {
        this.board[i] = 4;
      }
      this.board[6] = 0;
      this.board[13] = 0;
    }
  }

  public proceed_action(chioce: i32): State {
    let newBoard: Array<i32> = new Array<i32>(14);
    let newTurn: i32 = 0;
    for (let i = 0; i < 14; i++) {
      newBoard[i] = this.board[i];
    }
    let direct = this.turn;
    let hole = chioce % 10;
    hole = direct === 2 ? 7 - hole : hole;
    let piece = newBoard[(direct - 1) * 7 + hole - 1];
    let nextFlag = false;
    newBoard[(direct - 1) * 7 + hole - 1] = 0;
    while (piece > 0) {
      if (direct === 1) {
        for (let j = hole + 1; j <= 6 && piece > 0; j++) {
          newBoard[j - 1]++;
          piece--;
          hole++;
        }
        if (piece === 0) {
          break;
        }
        hole = -1;
        newBoard[6]++;
        piece--;
        if (piece === 0) {
          nextFlag = true; //shouldNext
          break;
        }
        for (let j = 6; j > 0 && piece > 0; j--) {
          newBoard[6 + j]++;
          piece--;
        }
        if (piece === 0) {
          break;
        }
        hole = 0;
      } else if (direct === 2) {
        for (let j = hole - 1; j > 0 && piece > 0; j--) {
          newBoard[6 + j]++;
          piece--;
          hole--;
        }
        if (piece === 0) {
          break;
        }
        hole = -1;
        newBoard[13]++;
        piece--;
        if (piece === 0) {
          nextFlag = true; //shouldNext
          break;
        }
        for (let j = 1; j <= 6 && piece > 0; j++) {
          newBoard[j - 1]++;
          piece--;
        }
        if (piece === 0) {
          break;
        }
        hole = 7;
      }
    }
    if (!nextFlag) {
      newTurn = 3 - direct;
    } else {
      newTurn = direct;
    }
    if (direct === 1) {
      if (hole > 0 && newBoard[hole - 1] === 1 && newBoard[6 + hole] != 0) {
        newBoard[6] += newBoard[hole - 1] + newBoard[6 + hole];
        newBoard[6 + hole] = 0;
        newBoard[hole - 1] = 0;
      }
    } else if (direct === 2) {
      if (hole > 0 && newBoard[6 + hole] === 1 && newBoard[hole - 1] != 0) {
        newBoard[13] += newBoard[hole - 1] + newBoard[6 + hole];
        newBoard[6 + hole] = 0;
        newBoard[hole - 1] = 0;
      }
    }

    let newState = new State(newTurn, newBoard);
    return newState;
  }

  public isFinish(): i32 {
    let side1Empty = this.board.slice(0, 6).every((hole) => hole === 0);
    let side2Empty = this.board.slice(7, 13).every((hole) => hole === 0);
    if (side1Empty) return 1;
    if (side2Empty) return 2;
    return 0;
  }

  public getLegalActions(): Array<i32> {
    let legalActions: Array<i32> = new Array<i32>();
    if (this.turn == 1) {
      for (let i = 0; i < 6; i++) {
        if (this.board[i] != 0) {
          legalActions.push(i + 11);
        }
      }
    } else {
      for (let i = 7; i < 13; i++) {
        if (this.board[i] != 0) {
          legalActions.push(19 - i + 14);
        }
      }
    }

    return legalActions;
  }

  public getTurn(): i32 {
    return this.turn;
  }

  public getArrayValue(index: i32): i32 {
    if (index >= 0 && index < 7) {
      return this.board[index];
    }
    if (index == 13) {
      return this.board[index];
    }
    if (index >= 7 && index <= 12) {
      return this.board[19 - index];
    }

    return -1;
  }
}
